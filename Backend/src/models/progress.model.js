import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  weeklySessionsCount: {
    type: Number,
    default: 0
  },
  mindfulMinutes: {
    type: Number,
    default: 0
  },
  practiceDays: {
    type: Number,
    default: 0
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  longestStreak: {
    type: Number,
    default: 0
  },
  yogaMinutes: {
    type: Number,
    default: 0
  },
  meditationMinutes: {
    type: Number,
    default: 0
  },
  pranayamaMinutes: {
    type: Number,
    default: 0
  },
  asanasMinutes: {
    type: Number,
    default: 0
  }
});

const Progress = mongoose.model('Progress', ProgressSchema);

export default Progress;
