import React, { useState } from 'react';
import { Bell, Calculator, Activity, Clock, Award, Calendar } from 'lucide-react';

const WorkoutPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const stats = [
    { title: 'Weekly Sessions', value: '8', icon: <Activity className="w-6 h-6 text-blue-500" /> },
    { title: 'Mindful Minutes', value: '180', icon: <Clock className="w-6 h-6 text-green-500" /> },
    { title: 'Practice Days', value: '15', icon: <Award className="w-6 h-6 text-orange-500" /> },
    { title: 'Streak Days', value: '5', icon: <Calendar className="w-6 h-6 text-purple-500" /> }
  ];

  const categories = [
    'All', 'Yoga', 'Meditation', 'Pranayama', 'Asanas'
  ];

  const workouts = [
    // Yoga (20+)
    {
      id: 1,
      title: 'Basic Yoga Flow',
      category: 'Yoga',
      duration: '30 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },
    {
      id: 2,
      title: 'Vinyasa Flow',
      category: 'Yoga',
      duration: '45 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 3,
      title: 'Power Yoga',
      category: 'Yoga',
      duration: '60 min',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg'
    },
    {
      id: 4,
      title: 'Gentle Yoga',
      category: 'Yoga',
      duration: '25 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 5,
      title: 'Yin Yoga',
      category: 'Yoga',
      duration: '45 min',
      level: 'All Levels',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },
    {
      id: 6,
      title: 'Ashtanga Yoga',
      category: 'Yoga',
      duration: '90 min',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg'
    },
    {
      id: 7,
      title: 'Hatha Yoga',
      category: 'Yoga',
      duration: '60 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 8,
      title: 'Restorative Yoga',
      category: 'Yoga',
      duration: '45 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },
    {
      id: 9,
      title: 'Kundalini Yoga',
      category: 'Yoga',
      duration: '60 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg'
    },
    {
      id: 10,
      title: 'Morning Yoga Flow',
      category: 'Yoga',
      duration: '30 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 11,
      title: 'Evening Relaxation Yoga',
      category: 'Yoga',
      duration: '40 min',
      level: 'All Levels',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },
    {
      id: 12,
      title: 'Yoga for Back Pain',
      category: 'Yoga',
      duration: '35 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg'
    },
    {
      id: 13,
      title: 'Yoga for Flexibility',
      category: 'Yoga',
      duration: '50 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 14,
      title: 'Yoga for Stress Relief',
      category: 'Yoga',
      duration: '30 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },
    {
      id: 15,
      title: 'Yoga for Core Strength',
      category: 'Yoga',
      duration: '45 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg'
    },
    {
      id: 16,
      title: 'Yoga for Weight Loss',
      category: 'Yoga',
      duration: '60 min',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 17,
      title: 'Yoga for Beginners',
      category: 'Yoga',
      duration: '25 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },
    {
      id: 18,
      title: 'Yoga for Runners',
      category: 'Yoga',
      duration: '40 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg'
    },
    {
      id: 19,
      title: 'Yoga for Desk Workers',
      category: 'Yoga',
      duration: '30 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 20,
      title: 'Yoga for Seniors',
      category: 'Yoga',
      duration: '35 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },

     // Meditation (20+)
     {
      id: 21,
      title: 'Mindful Meditation',
      category: 'Meditation',
      duration: '15 min',
      level: 'All Levels',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 22,
      title: 'Deep Breathing',
      category: 'Meditation',
      duration: '20 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },
    {
      id: 23,
      title: 'Guided Meditation',
      category: 'Meditation',
      duration: '25 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg'
    },
    {
      id: 24,
      title: 'Body Scan Meditation',
      category: 'Meditation',
      duration: '30 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 25,
      title: 'Loving-Kindness Meditation',
      category: 'Meditation',
      duration: '20 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },
    {
      id: 26,
      title: 'Chakra Meditation',
      category: 'Meditation',
      duration: '45 min',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg'
    },
    {
      id: 27,
      title: 'Zen Meditation',
      category: 'Meditation',
      duration: '30 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 28,
      title: 'Morning Meditation',
      category: 'Meditation',
      duration: '15 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },
    {
      id: 29,
      title: 'Evening Meditation',
      category: 'Meditation',
      duration: '20 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg'
    },
    {
      id: 30,
      title: 'Sleep Meditation',
      category: 'Meditation',
      duration: '25 min',
      level: 'All Levels',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 31,
      title: 'Stress Relief Meditation',
      category: 'Meditation',
      duration: '30 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },
    {
      id: 32,
      title: 'Anxiety Relief Meditation',
      category: 'Meditation',
      duration: '20 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg'
    },
    {
      id: 33,
      title: 'Focus Meditation',
      category: 'Meditation',
      duration: '15 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 34,
      title: 'Gratitude Meditation',
      category: 'Meditation',
      duration: '20 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },
    {
      id: 35,
      title: 'Mindfulness Meditation',
      category: 'Meditation',
      duration: '25 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg'
    },
    {
      id: 36,
      title: 'Breath Awareness Meditation',
      category: 'Meditation',
      duration: '30 min',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 37,
      title: 'Visualization Meditation',
      category: 'Meditation',
      duration: '20 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },
    {
      id: 38,
      title: 'Mantra Meditation',
      category: 'Meditation',
      duration: '25 min',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg'
    },
    {
      id: 39,
      title: 'Walking Meditation',
      category: 'Meditation',
      duration: '30 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 40,
      title: 'Yoga Nidra',
      category: 'Meditation',
      duration: '45 min',
      level: 'All Levels',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },

    //Pranayama(20+)
    {
      id: 41,
      title: 'Basic Pranayama',
      category: 'Pranayama',
      duration: '20 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg'
    },
    {
      id: 42,
      title: 'Advanced Breathing',
      category: 'Pranayama',
      duration: '30 min',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 43,
      title: 'Alternate Nostril Breathing',
      category: 'Pranayama',
      duration: '15 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },
    {
      id: 44,
      title: 'Kapalbhati Pranayama',
      category: 'Pranayama',
      duration: '20 min',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/6551142/pexels-photo-6551142.jpeg'
    },
    {
      id: 45,
      title: 'Bhramari Pranayama',
      category: 'Pranayama',
      duration: '15 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg'
    },
    {
      id: 46,
      title: 'Ujjayi Breathing',
      category: 'Pranayama',
      duration: '20 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/4118214/pexels-photo-4118214.jpeg'
    },
    {
      id: 47,
      title: 'Sheetali Pranayama',
      category: 'Pranayama',
      duration: '15 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/903171/pexels-photo-903171.jpeg'
    },
    {
      id: 48,
      title: 'Sheetkari Pranayama',
      category: 'Pranayama',
      duration: '15 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },
    {
      id: 49,
      title: 'Surya Bhedana',
      category: 'Pranayama',
      duration: '20 min',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg'
    },
    {
      id: 50,
      title: 'Chandra Bhedana',
      category: 'Pranayama',
      duration: '20 min',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 51,
      title: 'Bhastrika Pranayama',
      category: 'Pranayama',
      duration: '25 min',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/6551142/pexels-photo-6551142.jpeg'
    },
    {
      id: 52,
      title: 'Anulom Vilom',
      category: 'Pranayama',
      duration: '20 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg'
    },
    {
      id: 53,
      title: 'Dirga Pranayama',
      category: 'Pranayama',
      duration: '15 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/4118214/pexels-photo-4118214.jpeg'
    },
    {
      id: 54,
      title: 'Nadi Shodhana',
      category: 'Pranayama',
      duration: '20 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/903171/pexels-photo-903171.jpeg'
    },
    {
      id: 55,
      title: 'Sitali Pranayama',
      category: 'Pranayama',
      duration: '15 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },
    {
      id: 56,
      title: 'Ujjayi Pranayama',
      category: 'Pranayama',
      duration: '20 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg'
    },
    {
      id: 57,
      title: 'Morning Pranayama',
      category: 'Pranayama',
      duration: '15 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 58,
      title: 'Evening Pranayama',
      category: 'Pranayama',
      duration: '20 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/6551142/pexels-photo-6551142.jpeg'
    },
    {
      id: 59,
      title: 'Stress Relief Breathing',
      category: 'Pranayama',
      duration: '25 min',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg'
    },
    {
      id: 60,
      title: 'Energy Boost Breathing',
      category: 'Pranayama',
      duration: '15 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/4118214/pexels-photo-4118214.jpeg'
    },
  
    // Asanas (20+)
    {
      id: 61,
      title: 'Sun Salutation',
      category: 'Asanas',
      duration: '20 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/903171/pexels-photo-903171.jpeg'
    },
    {
      id: 62,
      title: 'Standing Poses',
      category: 'Asanas',
      duration: '25 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },
    {
      id: 63,
      title: 'Warrior Series',
      category: 'Asanas',
      duration: '30 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg'
    },
    {
      id: 64,
      title: 'Balancing Poses',
      category: 'Asanas',
      duration: '35 min',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 65,
      title: 'Seated Forward Bends',
      category: 'Asanas',
      duration: '25 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/6551142/pexels-photo-6551142.jpeg'
    },
    {
      id: 66,
      title: 'Backbends',
      category: 'Asanas',
      duration: '40 min',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg'
    },
    {
      id: 67,
      title: 'Inversion Poses',
      category: 'Asanas',
      duration: '30 min',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/4118214/pexels-photo-4118214.jpeg'
    },
    {
      id: 68,
      title: 'Hip Openers',
      category: 'Asanas',
      duration: '35 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/903171/pexels-photo-903171.jpeg'
    },
    {
      id: 69,
      title: 'Core Strengthening',
      category: 'Asanas',
      duration: '25 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },
    {
      id: 70,
      title: 'Restorative Poses',
      category: 'Asanas',
      duration: '45 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg'
    },
    {
      id: 71,
      title: 'Twisting Poses',
      category: 'Asanas',
      duration: '30 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 72,
      title: 'Arm Balances',
      category: 'Asanas',
      duration: '40 min',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/6551142/pexels-photo-6551142.jpeg'
    },
    {
      id: 73,
      title: 'Standing Forward Bends',
      category: 'Asanas',
      duration: '25 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg'
    },
    {
      id: 74,
      title: 'Spinal Twists',
      category: 'Asanas',
      duration: '30 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/4118214/pexels-photo-4118214.jpeg'
    },
    {
      id: 75,
      title: 'Mountain Pose Series',
      category: 'Asanas',
      duration: '20 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/903171/pexels-photo-903171.jpeg'
    },
    {
      id: 76,
      title: 'Chair Pose Variations',
      category: 'Asanas',
      duration: '25 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg'
    },
    {
      id: 77,
      title: 'Camel Pose',
      category: 'Asanas',
      duration: '30 min',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg'
    },
    {
      id: 78,
      title: 'Crow Pose',
      category: 'Asanas',
      duration: '35 min',
      level: 'Advanced',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg'
    },
    {
      id: 79,
      title: 'Tree Pose Variations',
      category: 'Asanas',
      duration: '25 min',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/6551142/pexels-photo-6551142.jpeg'
    },
    {
      id: 80,
      title: 'Downward Dog Flow',
      category: 'Asanas',
      duration: '30 min',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg'
    }

  ];

  const filteredWorkouts = workouts.filter(workout => 
    selectedCategory === 'All' || workout.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
    
     

      {/* Main Content with top padding to account for fixed nav */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                </div>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Workouts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((workout) => (
            <div key={workout.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={workout.image}
                alt={workout.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-green-500 font-medium">{workout.category}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{workout.duration}</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                      {workout.level}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{workout.title}</h3>
                <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                  Start Workout
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPage;