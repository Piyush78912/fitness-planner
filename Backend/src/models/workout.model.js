import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const Workout = mongoose.model("Workout", WorkoutSchema);
export default Workout;
