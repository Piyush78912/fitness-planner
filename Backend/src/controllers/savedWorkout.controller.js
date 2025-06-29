import SavedWorkout from '../models/savedWorkout.model.js';

// @desc    Save a workout
// @route   POST /api/saved-workouts
// @access  Private
export const saveWorkout = async (req, res) => {
  try {
    const workoutExists = await SavedWorkout.findOne({
      user: req.user.id,
      workoutId: req.body.workoutId
    });

    if (workoutExists) {
      return res.status(400).json({
        success: false,
        message: 'Workout already saved'
      });
    }

    const savedWorkout = await SavedWorkout.create({
      user: req.user.id,
      ...req.body
    });

    res.status(201).json({
      success: true,
      data: savedWorkout
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user's saved workouts
// @route   GET /api/saved-workouts
// @access  Private
export const getSavedWorkouts = async (req, res) => {
  try {
    const savedWorkouts = await SavedWorkout.find({ user: req.user.id })
      .sort({ savedAt: -1 });

    res.status(200).json({
      success: true,
      count: savedWorkouts.length,
      data: savedWorkouts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete saved workout
// @route   DELETE /api/saved-workouts/:id
// @access  Private
export const deleteSavedWorkout = async (req, res) => {
  try {
    const savedWorkout = await SavedWorkout.findById(req.params.id);

    if (!savedWorkout) {
      return res.status(404).json({
        success: false,
        message: 'Saved workout not found'
      });
    }

    // Check if the saved workout belongs to the user
    if (savedWorkout.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this saved workout'
      });
    }

    await SavedWorkout.deleteOne({ _id: req.params.id });

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