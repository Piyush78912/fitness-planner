import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// @desc    Register user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    console.log('Registration attempt with data:', { firstName, lastName, email });

    if (!firstName || !lastName || !email || !password) {
      console.log('Missing required fields:', { 
        firstName: !firstName, 
        lastName: !lastName, 
        email: !email, 
        password: !password 
      });
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: firstName, lastName, email, password'
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists with email:', email);
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password
    });
    
    console.log('User created successfully with ID:', user._id);

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Return user data (without password)
    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      height: user.height,
      weight: user.weight,
      bmi: user.bmi,
      bmiCategory: user.bmiCategory
    };

    res.status(201).json({
      success: true,
      token,
      data: userData
    });
  } catch (err) {
    console.error('Registration error details:', err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // Return user data
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      height: user.height,
      weight: user.weight,
      bmi: user.bmi,
      bmiCategory: user.bmiCategory
    };

    res.status(200).json({
      success: true,
      token,
      data: userData
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      height: req.body.height,
      weight: req.body.weight
    };
    
    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(
      key => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );
    
    // Find and update user
    let user = await User.findById(req.user.id);
    
    // Update user fields
    Object.assign(user, fieldsToUpdate);
    
    // Calculate BMI if height and weight are provided
    if (fieldsToUpdate.height || fieldsToUpdate.weight) {
      user.calculateBMI();
    }
    
    await user.save();
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Calculate BMI
// @route   POST /api/users/calculate-bmi
// @access  Private
export const calculateBMI = async (req, res) => {
  try {
    const { height, weight } = req.body;
    
    if (!height || !weight) {
      return res.status(400).json({
        success: false,
        message: 'Please provide height and weight'
      });
    }
    
    // Update user
    const user = await User.findById(req.user.id);
    user.height = height;
    user.weight = weight;
    
    // Calculate BMI
    const bmi = user.calculateBMI();
    await user.save();
    
    res.status(200).json({
      success: true,
      data: {
        bmi,
        category: user.bmiCategory,
        height,
        weight
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};