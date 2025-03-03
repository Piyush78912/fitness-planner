import express from "express";
import Workout from "../models/Workout.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Workout
router.post("/add", authMiddleware, async (req, res) => {
    try {
        const { name, duration } = req.body;
        const workout = new Workout({ userId: req.user.id, name, duration });
        await workout.save();
        res.json({ message: "Workout added!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get User Workouts
router.get("/", authMiddleware, async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.user.id });
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
