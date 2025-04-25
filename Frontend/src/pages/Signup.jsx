import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setUserData({
      ...userData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password match
    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate terms agreement
    if (!userData.agreeToTerms) {
      setError('Please agree to the Terms of Service');
      return;
    }
    
    // Clear any existing errors
    setError('');
    setIsLoading(true);
    
    try {
      // First check if user already exists
      const checkUserResponse = await fetch('http://localhost:8000/api/auth/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email
        })
      });

      const checkUserData = await checkUserResponse.json();

      if (checkUserData.exists) {
        setError(
          <div className="flex flex-col space-y-2">
            <span>This email is already registered.</span>
            <div>
              Please{' '}
              <Link to="/login" className="text-red-700 font-semibold hover:text-red-800 underline">
                login here
              </Link>
              {' '}instead.
            </div>
          </div>
        );
        setIsLoading(false);
        return;
      }

      // If user doesn't exist, proceed with registration
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // If registration is successful
      console.log('Registration successful:', data);
      
      // Store the token if your backend returns one
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Show success message and navigate to login
      alert('Registration successful! Please log in with your credentials.');
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      if (err.message.includes('already registered') || err.message.includes('already exists')) {
        setError(
          <div className="flex flex-col space-y-2">
            <span>This email is already registered.</span>
            <div>
              Please{' '}
              <Link to="/login" className="text-red-700 font-semibold hover:text-red-800 underline">
                login here
              </Link>
              {' '}instead.
            </div>
          </div>
        );
      } else {
        setError(err.message || 'Failed to register. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <img 
            className="mx-auto w-24 h-24" 
            src="/logo.png" 
            alt="Fitness Planner Logo" 
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create Your Account</h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-100 rounded-md">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                value={userData.firstName}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                value={userData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              value={userData.email}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              value={userData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          
          <div className="flex items-start">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              required
              className="w-4 h-4 mt-1 text-red-600 border-gray-300 rounded focus:ring-red-500"
              checked={userData.agreeToTerms}
              onChange={handleChange}
            />
            <label htmlFor="agreeToTerms" className="block ml-2 text-sm text-gray-900">
              I agree to the{' '}
              <a href="#" className="font-medium text-red-600 hover:text-red-500">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="font-medium text-red-600 hover:text-red-500">
                Privacy Policy
              </a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-4 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;