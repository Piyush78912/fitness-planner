import mongoose from 'mongoose';

const SavedWorkoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  workoutId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: String,
  savedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index to prevent duplicate saves
SavedWorkoutSchema.index({ user: 1, workoutId: 1 }, { unique: true });

const SavedWorkout = mongoose.model('SavedWorkout', SavedWorkoutSchema);

export default SavedWorkout; 