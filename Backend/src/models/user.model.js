import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false
  },
  height: {
    type: Number,
    min: 0
  },
  weight: {
    type: Number,
    min: 0
  },
  bmi: {
    type: Number,
    min: 0
  },
  bmiCategory: {
    type: String,
    enum: ['Underweight', 'Normal weight', 'Overweight', 'Obesity']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for full name
UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Method to calculate BMI
UserSchema.methods.calculateBMI = function () {
  if (!this.height || !this.weight) return null;
  
  const heightInM = this.height > 3 ? this.height / 100 : this.height;
  const bmi = this.weight / (heightInM * heightInM);
  this.bmi = Math.round(bmi * 10) / 10;

  if (this.bmi < 18.5) {
    this.bmiCategory = 'Underweight';
  } else if (this.bmi < 25) {
    this.bmiCategory = 'Normal weight';
  } else if (this.bmi < 30) {
    this.bmiCategory = 'Overweight';
  } else {
    this.bmiCategory = 'Obesity';
  }
  return this.bmi;
};

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;

