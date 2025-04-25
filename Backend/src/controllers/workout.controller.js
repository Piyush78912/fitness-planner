import Workout from '../models/workout.model.js';
import Progress from '../models/progress.model.js';

// @desc    Create new workout
// @route   POST /api/workouts
// @access  Private
export const createWorkout = async (req, res) => {
  try {
    req.body.user = req.user.id;
    const workout = await Workout.create(req.body);

    res.status(201).json({
      success: true,
      data: workout
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all workouts for user
// @route   GET /api/workouts
// @access  Private
export const getWorkouts = async (req, res) => {
  try {
    let query = { user: req.user.id };

    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.completed) {
      query.completed = req.query.completed === 'true';
    }

    const workouts = await Workout.find(query).sort({ scheduledFor: -1 });

    res.status(200).json({
      success: true,
      count: workouts.length,
      data: workouts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single workout
// @route   GET /api/workouts/:id
// @access  Private
export const getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }

    if (workout.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this workout'
      });
    }

    res.status(200).json({
      success: true,
      data: workout
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update workout
// @route   PUT /api/workouts/:id
// @access  Private
export const updateWorkout = async (req, res) => {
  try {
    let workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }

    if (workout.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this workout'
      });
    }

    const wasCompleted = workout.completed;
    const isNowCompleted = req.body.completed === true && !wasCompleted;

    workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (isNowCompleted) {
      workout.completedAt = new Date();
      await workout.save();
      await updateProgressOnCompletion(req.user.id, workout);
    }

    res.status(200).json({
      success: true,
      data: workout
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete workout
// @route   DELETE /api/workouts/:id
// @access  Private
export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found'
      });
    }

    if (workout.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this workout'
      });
    }

    await workout.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// You can leave these as placeholders or implement them as needed:
export const getWorkoutStats = async (req, res) => {
  // placeholder
  res.json({ success: true, stats: {} });
};

export const getWorkoutCategories = async (req, res) => {
  // placeholder
  res.json({ success: true, categories: [] });
};

// Helper function to update progress
const updateProgressOnCompletion = async (userId, workout) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let progress = await Progress.findOne({
      user: userId,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (!progress) {
      progress = await Progress.create({
        user: userId,
        date: today
      });
    }

    const minutes = workout.duration;
    progress.mindfulMinutes += minutes;

    switch (workout.category) {
      case 'Yoga':
        progress.yogaMinutes += minutes;
        break;
      case 'Meditation':
        progress.meditationMinutes += minutes;
        break;
      case 'Pranayama':
        progress.pranayamaMinutes += minutes;
        break;
      case 'Asanas':
        progress.asanasMinutes += minutes;
        break;
    }

    progress.weeklySessionsCount += 1;

    if (progress.practiceDays === 0) {
      progress.practiceDays = 1;
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayProgress = await Progress.findOne({
      user: userId,
      date: {
        $gte: yesterday,
        $lt: today
      }
    });

    if (yesterdayProgress && yesterdayProgress.practiceDays > 0) {
      progress.currentStreak += 1;
    } else {
      progress.currentStreak = 1;
    }

    if (progress.currentStreak > progress.longestStreak) {
      progress.longestStreak = progress.currentStreak;
    }

    await progress.save();
  } catch (err) {
    console.error('Error updating progress:', err);
  }
};
