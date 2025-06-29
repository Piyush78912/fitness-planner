import { Activity, Award, Calendar, Edit, LineChart, Save, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import sample from "../assets/sample.png";

function Profile() {
  // State for user profile data
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    memberSince: '',
    profileImage: sample,
    fitnessGoals: '',
    height: '',
    weight: '',
    age: '',
    achievements: [
      { id: 1, title: 'First Workout', date: '2023-01-15', icon: 'trophy' },
      { id: 2, title: '7-Day Streak', date: '2023-01-22', icon: 'fire' },
      { id: 3, title: 'Perfect Month', date: '2023-02-28', icon: 'calendar' },
    ],
    fitnessMetrics: {
      avgWorkoutDuration: '45 minutes',
      weeklyWorkouts: 4,
      favoriteWorkout: 'Upper Body Strength',
      totalWorkouts: 126,
    }
  });

  // State for edit mode
  const [editMode, setEditMode] = useState(false);
  // State for form data during edit
  const [formData, setFormData] = useState({ ...userData });
  // State for loading
  const [isLoading, setIsLoading] = useState(true);
  // State for error
  const [error, setError] = useState(null);

  // Debug function to ensure we can access localStorage
  const checkLocalStorage = () => {
    try {
      // Print all localStorage items for debugging
      console.log('All localStorage items:');
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(`${key}: ${localStorage.getItem(key)}`);
      }
      
      const userData = localStorage.getItem('userData');
      console.log('userData from localStorage:', userData);
      return userData;
    } catch (e) {
      console.error('Error accessing localStorage:', e);
      return null;
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        console.log('Fetching profile data...'); // Debug log

        const response = await fetch('http://localhost:8000/api/users/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }

        const { success, data } = await response.json();
        console.log('Profile data received:', data);

        if (data) {
          const updatedData = {
            ...userData,
            name: data.name || '',
            email: data.email || '',
            age: data.age || '',
            height: data.height || '',
            weight: data.weight || '',
            fitnessGoals: data.fitnessGoals || '',
            profileImage: data.profileImage || sample,
            memberSince: data.memberSince ? new Date(data.memberSince).toLocaleDateString('en-US', {
              month: 'long',
              year: 'numeric'
            }) : ''
          };

          console.log('Updating state with:', updatedData); // Debug log

          setUserData(updatedData);
          setFormData(updatedData);

          // Update localStorage
          localStorage.setItem('userData', JSON.stringify(data));
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Submitting profile update with data:', formData);

      const response = await fetch('http://localhost:8000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          age: formData.age ? parseInt(formData.age) : undefined,
          height: formData.height ? parseInt(formData.height) : undefined,
          weight: formData.weight ? parseInt(formData.weight) : undefined,
          fitnessGoals: formData.fitnessGoals
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const { data } = await response.json();
      console.log('Profile update response:', data);

      if (data) {
        // Update both userData and formData with the response
        const updatedData = {
          ...userData,
          name: data.name || userData.name,
          email: data.email || userData.email,
          age: data.age || '',
          height: data.height || '',
          weight: data.weight || '',
          fitnessGoals: data.fitnessGoals || userData.fitnessGoals,
          profileImage: data.profileImage || userData.profileImage
        };

        console.log('Updating state after profile update:', updatedData); // Debug log

        setUserData(updatedData);
        setFormData(updatedData);
        
        // Update localStorage with new user data
        localStorage.setItem('userData', JSON.stringify(data));
        
        setEditMode(false);
        alert('Profile updated successfully!');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0 flex justify-center items-center h-64">
            <div className="text-xl text-gray-500">Loading profile information...</div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            {!editMode && (
              <button 
                onClick={() => setEditMode(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>

          {/* Profile Content */}
          <div className="bg-white shadow overflow-hidden rounded-lg">
            {/* Profile Header with Image */}
            <div className="px-4 py-5 sm:px-6 bg-gray-50 flex items-center space-x-4">
              <img 
                src={sample} 
                alt="Profile" 
                className="h-24 w-24 rounded-full object-cover border-4 border-red-500"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900">{userData.name || 'User'}</h2>
                <p className="text-sm text-gray-500">Member since {userData.memberSince}</p>
              </div>
            </div>

            {editMode ? (
              // Edit Form
              <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border bg-gray-100"
                    />
                    <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                  </div>
                  
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                    <input
                      type="number"
                      name="age"
                      id="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      min="0"
                      max="120"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height (cm)</label>
                    <input
                      type="number"
                      name="height"
                      id="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      id="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="fitnessGoals" className="block text-sm font-medium text-gray-700">Fitness Goals</label>
                    <textarea
                      name="fitnessGoals"
                      id="fitnessGoals"
                      rows="3"
                      value={formData.fitnessGoals}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 p-2 border"
                    ></textarea>
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <button
                    type="submit"
                    className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({...userData});
                      setEditMode(false);
                    }}
                    className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              // Display Profile
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <User className="h-5 w-5 mr-2 text-gray-400" />
                      Email
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {userData.email || 'Not specified'}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                      Age
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {userData.age ? `${userData.age} years` : 'Not specified'}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-gray-400" />
                      Physical Details
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      Height: {userData.height ? `${userData.height} cm` : 'Not specified'} | Weight: {userData.weight ? `${userData.weight} kg` : 'Not specified'}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <LineChart className="h-5 w-5 mr-2 text-gray-400" />
                      Fitness Goals
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{userData.fitnessGoals || 'Not specified'}</dd>
                  </div>
                </dl>
              </div>
            )}
          </div>

          {/* Fitness Metrics */}
          <div className="mt-8 bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 bg-gray-50">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Fitness Metrics</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Your fitness journey in numbers</p>
            </div>
            <div className="border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-gray-500">Avg. Workout Duration</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{userData.fitnessMetrics.avgWorkoutDuration}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-gray-500">Weekly Workouts</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{userData.fitnessMetrics.weeklyWorkouts}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-gray-500">Total Workouts</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{userData.fitnessMetrics.totalWorkouts}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-gray-500">Favorite Workout</p>
                  <p className="mt-1 text-2xl font-semibold text-gray-900">{userData.fitnessMetrics.favoriteWorkout}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="mt-8 bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Achievements</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Milestones on your fitness journey</p>
              </div>
              <Award className="h-6 w-6 text-red-500" />
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {userData.achievements.map((achievement) => (
                  <li key={achievement.id} className="px-4 py-4 sm:px-6 flex items-center">
                    <div className="min-w-10 mr-4">
                      <span className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                        {achievement.icon === 'trophy' && '🏆'}
                        {achievement.icon === 'fire' && '🔥'}
                        {achievement.icon === 'calendar' && '📅'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                      <p className="text-sm text-gray-500">Achieved on {new Date(achievement.date).toLocaleDateString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;