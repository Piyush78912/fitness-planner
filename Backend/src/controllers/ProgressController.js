import Progress from '../models/progress.model.js';

// @desc    Get user progress summary
// @route   GET /api/progress/summary
// @access  Private
export const getProgressSummary = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    // Aggregate weekly progress
    const weeklyProgress = await Progress.aggregate([
      {
        $match: {
          user: req.user.id,
          date: { $gte: startOfWeek }
        }
      },
      {
        $group: {
          _id: null,
          totalSessions: { $sum: "$weeklySessionsCount" },
          totalMindfulMinutes: { $sum: "$mindfulMinutes" },
          yogaMinutes: { $sum: "$yogaMinutes" },
          meditationMinutes: { $sum: "$meditationMinutes" },
          pranayamaMinutes: { $sum: "$pranayamaMinutes" },
          asanasMinutes: { $sum: "$asanasMinutes" }
        }
      }
    ]);

    const totalPracticeDays = await Progress.countDocuments({
      user: req.user.id,
      practiceDays: { $gt: 0 }
    });

    const currentProgress = await Progress.findOne({
      user: req.user.id,
      date: today
    });

    res.status(200).json({
      success: true,
      data: {
        weeklySessions: weeklyProgress[0]?.totalSessions || 0,
        mindfulMinutes: weeklyProgress[0]?.totalMindfulMinutes || 0,
        practiceDays: totalPracticeDays,
        currentStreak: currentProgress?.currentStreak || 0,
        categories: {
          yoga: weeklyProgress[0]?.yogaMinutes || 0,
          meditation: weeklyProgress[0]?.meditationMinutes || 0,
          pranayama: weeklyProgress[0]?.pranayamaMinutes || 0,
          asanas: weeklyProgress[0]?.asanasMinutes || 0
        }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// @desc    Get progress history (daily stats for a date range)
// @route   GET /api/progress/history
// @access  Private
export const getProgressHistory = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ success: false, message: 'Please provide startDate and endDate' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ success: false, message: 'Invalid date format' });
    }

    const progressHistory = await Progress.find({
      user: req.user.id,
      date: { $gte: start, $lte: end }
    }).sort({ date: 1 });

    res.status(200).json({
      success: true,
      count: progressHistory.length,
      data: progressHistory
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
