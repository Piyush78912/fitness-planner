import mongoose from "mongoose";

const bmiSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bmi: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
});

export default mongoose.model("BMI", bmiSchema);
