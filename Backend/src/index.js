// Load environment variables first
import dotenv from "dotenv";
dotenv.config();

// All other imports
import cors from "cors";
import express from "express";
import connectDB from "./db/index.js";
import authRoutes from "./routes/auth.routes.js";
import bmiRoutes from "./routes/bmi.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import userRoutes from "./routes/user.routes.js";
import workoutRoutes from "./routes/workout.routes.js";

// Connect to MongoDB
connectDB();

const app = express();

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/bmi", bmiRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("🚀 API is up and running!");
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
