import BMI from '../models/BMI.js';

export const saveBMI = async (req, res) => {
  try {
    const { bmi } = req.body;
    const userId = req.user.id; // Assuming `authMiddleware` adds this

    const newEntry = new BMI({ user: userId, bmi });
    await newEntry.save();

    res.status(200).json({ message: "BMI saved successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error saving BMI", error: err.message });
  }
};

export const getBMIHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const entries = await BMI.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: "Error fetching BMI history", error: err.message });
  }
};
