import User from '../models/user.model.js';

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user profile'
    });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    console.log('Received update request with body:', req.body); // Debug log

    const allowedUpdates = ['name', 'age', 'height', 'weight', 'fitnessGoals'];
    const updates = {};

    // Only include fields that are present in the request and allowed
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined && req.body[field] !== '') {
        if (['age', 'height', 'weight'].includes(field)) {
          const value = Number(req.body[field]);
          if (!isNaN(value)) {
            updates[field] = value;
          }
        } else {
          updates[field] = req.body[field];
        }
      }
    });

    console.log('Processed updates:', updates); // Debug log

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Calculate BMI if height and weight are provided
    if (user.height && user.weight) {
      user.calculateBMI();
    }

    console.log('Updated user:', user); // Debug log

    res.json({
      success: true,
      data: user,
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating profile'
    });
  }
}; 