import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  // Profile information
  age: {
    type: Number,
    min: 0,
    max: 120
  },
  height: {
    type: Number,
    min: 0
  },
  weight: {
    type: Number,
    min: 0
  },
  fitnessGoals: {
    type: String
  },
  profileImage: {
    type: String,
    default: 'https://i.pravatar.cc/150?img=5'
  },
  memberSince: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Virtual for full name
UserSchema.virtual('fullName').get(function() {
  return `${this.name}`;
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
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Method to compare password for login
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;

