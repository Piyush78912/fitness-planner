import { Activity, Award, BookmarkPlus, Calendar, Clock, Play, Share2, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const WorkoutPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showVideoView, setShowVideoView] = useState(false);
  const [userAge, setUserAge] = useState(null);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingAge, setIsLoadingAge] = useState(true);
  
  // Create ref for modal content
  const modalRef = useRef(null);

  // Function to update age from localStorage or fetch from API if needed
  const updateUserAge = async () => {
    setIsLoadingAge(true);
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      if (parsedData.age) {
        setUserAge(parsedData.age);
        setIsLoadingAge(false);
        return;
      }
    }
    // If no data in localStorage, fetch from API
    await fetchUserProfile();
    setIsLoadingAge(false);
  };

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoadingAge(false);
        throw new Error('No authentication token found');
      }

      const response = await fetch('http://localhost:8000/api/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        setIsLoadingAge(false);
        throw new Error(`Failed to fetch profile: ${response.status}`);
      }

      const { success, data } = await response.json();
      if (data && data.age) {
        setUserAge(data.age);
        // Update localStorage with new data
        localStorage.setItem('userData', JSON.stringify(data));
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      toast.error('Failed to fetch user profile');
    } finally {
      setIsLoadingAge(false);
    }
  };

  // Update age when component mounts and when localStorage changes
  useEffect(() => {
    updateUserAge();

    // Listen for localStorage changes
    const handleStorageChange = (e) => {
      if (e.key === 'userData') {
        updateUserAge();
      }
    };

    // Set up periodic check every 30 seconds
    const intervalId = setInterval(() => {
      updateUserAge();
    }, 30000);

    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup listener and interval
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(intervalId);
    };
  }, []);

  // Handle click outside of modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    // Add event listener when modal is shown
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  // Fetch saved workouts on component mount
  useEffect(() => {
    fetchSavedWorkouts();
  }, []);

  // Function to fetch saved workouts
  const fetchSavedWorkouts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await fetch('http://localhost:8000/api/saved-workouts', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch saved workouts');
      }

      const data = await response.json();
      if (data.success) {
        setSavedWorkouts(data.data);
      }
    } catch (error) {
      console.error('Error fetching saved workouts:', error);
      toast.error(error.message || 'Failed to fetch saved workouts');
    }
  };

  // Function to save workout
  const handleSaveWorkout = async (workout) => {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please log in to save workouts');
        return;
      }

      const response = await fetch('http://localhost:8000/api/saved-workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          workoutId: workout.id,
          title: workout.title,
          category: workout.category,
          duration: workout.duration,
          level: workout.level,
          image: workout.image,
          description: workout.description
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save workout');
      }

      const data = await response.json();
      if (data.success) {
        toast.success('Workout saved successfully!');
        fetchSavedWorkouts(); // Refresh saved workouts list
      } else {
        throw new Error(data.message || 'Failed to save workout');
      }
    } catch (error) {
      console.error('Error saving workout:', error);
      toast.error(error.message || 'Failed to save workout');
    } finally {
      setIsSaving(false);
    }
  };

  // Function to check if workout is saved
  const isWorkoutSaved = (workoutId) => {
    return savedWorkouts.some(saved => saved.workoutId === workoutId);
  };

  const stats = [
    { title: 'Weekly Sessions', value: '8', icon: <Activity className="w-6 h-6 text-blue-500" /> },
    { title: 'Mindful Minutes', value: '180', icon: <Clock className="w-6 h-6 text-green-500" /> },
    { title: 'Practice Days', value: '15', icon: <Award className="w-6 h-6 text-orange-500" /> },
    { title: 'Streak Days', value: '5', icon: <Calendar className="w-6 h-6 text-purple-500" /> }
  ];

  const categories = [
    'All', 'Recommended for You', 'Saved Workouts', 'Yoga', 'Meditation', 'Pranayama', 'Asanas'
  ];

  const workouts = [
    // Yoga
    {
      id: 1,
      title: 'Basic Yoga Flow',
      category: 'Yoga',
      duration: '30 min',
      level: 'Beginner',
      recommendedAgeRanges: [{ min: 16, max: 80 }], // Suitable for most age groups
      image: '/images/basicYogaFlow.jpg',
      description: 'A gentle introduction to basic yoga poses and breathing techniques. Perfect for beginners.',
      videoUrl: '/videos/basicyogaflow.mp4',
      detailedInstructions: [
        'Start in a comfortable seated position',
        'Begin with deep breathing exercises',
        'Move through sun salutations',
        'Practice standing poses for balance and strength',
        'End with a relaxing savasana'
      ],
      benefits: 'Improves flexibility, builds strength, reduces stress, and enhances mind-body connection.'
    },
    {
      id: 2,
      title: 'Vinyasa Flow',
      category: 'Yoga',
      duration: '45 min',
      level: 'Intermediate',
      recommendedAgeRanges: [{ min: 18, max: 55 }], // More suitable for younger to middle-aged adults
      image: '/images/vinyasaflow.jpg',
      description: 'Synchronize movement with breath in this flowing sequence of yoga poses.',
      videoUrl: '/videos/yogaforstrength.mp4',
      detailedInstructions: [
        'Begin in mountain pose with intentional breathing',
        'Flow through sun salutations A and B',
        'Practice warrior sequences and balancing poses',
        'Include core strengthening exercises',
        'End with seated forward folds and final relaxation'
      ],
      benefits: 'Builds cardiovascular endurance, improves strength and flexibility, enhances breath control and mental focus.'
        },
        {
      id: 3,
      title: 'Power Yoga',
      category: 'Yoga',
      duration: '60 min',
      level: 'Advanced',
      recommendedAgeRanges: [{ min: 20, max: 45 }], // More intense, better for younger adults
      image: '/images/poweryoga.jpg',
      description: 'Build strength and endurance in this challenging yoga sequence.',
      videoUrl: '/videos/poweryogabreak.mp4',
      detailedInstructions: [
        'Begin with energizing breathing techniques',
        'Practice advanced sun salutations with jump-throughs',
        'Hold challenging poses like crow pose and side plank',
        'Include core strength sequences',
        'End with inversions and deep stretches'
      ],
      benefits: 'Develops muscular strength, improves cardiovascular health, builds mental resilience, and increases energy levels.'
    },
    {
      id: 4,
      title: 'Hatha Yoga',
      category: 'Yoga',
      duration: '50 min',
      level: 'Beginner',
      recommendedAgeRanges: [{ min: 16, max: 85 }], // Great for all ages including seniors
      image: '/images/hathayoga.jpg',
      description: 'Focus on foundational poses and proper alignment in this traditional yoga practice.',
      videoUrl: '/videos/hathayoga.mp4',
      detailedInstructions: [
        'Begin with centering and breathing awareness',
        'Practice gentle warm-ups for the spine and joints',
        'Move through fundamental standing and seated poses',
        'Focus on proper alignment and holding poses',
        'Close with gentle stretches and relaxation'
      ],
      benefits: 'Improves posture, increases body awareness, reduces stress, and establishes a solid foundation for yoga practice.'
    },
    {
      id: 5,
      title: 'Yin Yoga',
      category: 'Yoga',
      duration: '60 min',
      level: 'All Levels',
      recommendedAgeRanges: [{ min: 30, max: 90 }], // Great for middle-aged and older adults
      image: '/images/yinyoga.jpg',
      description: 'Deep stretching practice targeting connective tissues and joints with long-held passive poses.',
      videoUrl: '/videos/yinyoga.mp4',
      detailedInstructions: [
        'Begin with mindful breathing and setting intentions',
        'Move into passive poses held for 3-5 minutes each',
        'Focus on relaxing muscles and softening into poses',
        'Target hips, pelvis, and lower spine',
        'End with gentle transition to seated meditation'
      ],
      benefits: 'Increases flexibility, improves joint mobility, reduces stress, enhances meridian flow, and promotes deep relaxation.'
    },
    // Meditation
    {
      id: 6,
      title: 'Mindfulness Meditation',
      category: 'Meditation',
      duration: '20 min',
      level: 'Beginner',
      recommendedAgeRanges: [{ min: 10, max: 100 }], // Beneficial for all ages
      image: '/images/mindfulnessMeditation.jpg',
      description: 'Learn to be present and cultivate awareness through guided mindfulness meditation.',
      videoUrl: '/videos/mindfulnessMeditation.mp4',
      detailedInstructions: [
        'Find a comfortable seated position',
        'Focus on your natural breath without changing it',
        'Notice physical sensations in your body',
        'Observe thoughts without judgment',
        'Gently return focus to breath when mind wanders'
      ],
      benefits: 'Reduces stress and anxiety, improves focus and attention, promotes emotional regulation, and enhances overall wellbeing.'
    },
    {
      id: 7,
      title: 'Loving-Kindness Meditation',
      category: 'Meditation',
      duration: '15 min',
      level: 'All Levels',
      recommendedAgeRanges: [{ min: 12, max: 100 }], // Great for all ages
      image: '/images/lovingkindness.jpg',
      description: 'Cultivate compassion and goodwill toward yourself and others through this heart-centered practice.',
      videoUrl: '/videos/lovingkindnessMeditation.mp4',
      detailedInstructions: [
        'Sit comfortably with eyes closed',
        'Begin by directing loving phrases toward yourself',
        'Extend these wishes to a loved one',
        'Gradually include neutral people and difficult relationships',
        'Finally extend loving-kindness to all beings'
      ],
      benefits: 'Increases positive emotions, develops empathy and compassion, improves relationships, and reduces negative feelings.'
    },
    {
      id: 8,
      title: 'Body Scan Meditation',
      category: 'Meditation',
      duration: '25 min',
      level: 'Beginner',
      recommendedAgeRanges: [{ min: 16, max: 90 }], // Good for most age groups
      image: '/images/bodyscanmeditation.jpg',
      description: 'Develop body awareness and release tension through this guided progressive relaxation practice.',
      videoUrl: '/videos/bodyscanmeditation.mp4',
      detailedInstructions: [
        'Lie down in a comfortable position',
        'Bring awareness to your breath',
        'Systematically move attention through each part of the body',
        'Notice sensations without judgment',
        'Release tension with each exhale'
      ],
      benefits: 'Reduces physical tension, improves body awareness, helps with insomnia, reduces stress, and promotes deep relaxation.'
    },
    // Pranayama
    {
      id: 9,
      title: 'Alternate Nostril Breathing',
      category: 'Pranayama',
      duration: '10 min',
      level: 'All Levels',
      recommendedAgeRanges: [{ min: 14, max: 85 }], // Suitable for most age groups
      image: '/images/nostrilBreathing.jpg',
      description: 'Balance energy channels and calm the mind with this traditional breathing technique.',
      videoUrl: '/videos/nostrilBreathing.mp4',
      detailedInstructions: [
        'Sit in a comfortable meditation posture',
        'Use right thumb to close right nostril',
        'Inhale through left nostril',
        'Close left nostril with ring finger and exhale through right',
        'Continue alternating sides with smooth transitions'
      ],
      benefits: 'Balances the nervous system, improves focus, reduces stress and anxiety, and promotes mental clarity.'
    },
    {
      id: 10,
      title: 'Ujjayi Breath',
      category: 'Pranayama',
      duration: '15 min',
      level: 'Intermediate',
      recommendedAgeRanges: [{ min: 16, max: 75 }], // Better for adults
      image: '/images/ujjaiBreathing.jpg',
      description: 'The "Victorious Breath" - learn this powerful technique used during yoga practice.',
      videoUrl: '/videos/UjjaiBreathing.mp4',
      detailedInstructions: [
        'Sit tall with a straight spine',
        'Inhale deeply through the nose',
        'Slightly constrict the back of the throat',
        'Create an ocean-like sound on both inhale and exhale',
        'Maintain smooth, controlled breathing'
      ],
      benefits: 'Builds internal heat, enhances oxygen uptake, improves concentration, and calms the nervous system.'
    },
    {
      id: 11,
      title: 'Breath of Fire',
      category: 'Pranayama',
      duration: '10 min',
      level: 'Advanced',
      recommendedAgeRanges: [{ min: 18, max: 55 }], // More intense, better for younger to middle-aged adults
      image: '/images/breathoffire.jpg',
      description: 'Energizing breathing technique to stimulate the solar plexus and increase vitality.',
      videoUrl: '/videos/BreathOfFire.mp4',
      detailedInstructions: [
        'Sit in an upright position',
        'Begin with deep breaths to prepare',
        'Inhale briefly through the nose',
        'Exhale forcefully through the nose by contracting abdominal muscles',
        'Maintain a rapid, rhythmic pace'
      ],
      benefits: 'Increases energy, strengthens the nervous system, improves digestion, clears toxins, and enhances mental clarity.'
    },
    // Asanas
    {
      id: 12,
      title: 'Sun Salutation Series',
      category: 'Asanas',
      duration: '20 min',
      level: 'All Levels',
      recommendedAgeRanges: [{ min: 16, max: 70 }], // Good for most adults
      image: '/images/sunsalutation.jpg',
      description: 'Traditional sequence of poses performed as a flowing practice to honor the sun.',
      videoUrl: '/videos/sunSalutation.mp4',
      detailedInstructions: [
        'Begin in Mountain Pose (Tadasana)',
        'Flow through the classic 12-position sequence',
        'Coordinate movement with breath',
        'Modify poses as needed for your level',
        'Focus on smooth transitions between poses'
      ],
      benefits: 'Warms the body, builds strength and flexibility, improves circulation, and energizes the entire system.'
    },
    {
      id: 13,
      title: 'Standing Poses Practice',
      category: 'Asanas',
      duration: '30 min',
      level: 'Intermediate',
      recommendedAgeRanges: [{ min: 18, max: 65 }], // Better for younger to middle-aged adults
      image: '/images/standingpose.jpg',
      description: 'Build strength and stability through a series of powerful standing poses.',
      videoUrl: '/videos/standingYoga.mp4',
      detailedInstructions: [
        'Begin with grounding and centering',
        'Practice various warrior poses and their variations',
        'Include triangle poses and standing balances',
        'Focus on proper alignment and engagement',
        'End with cooling poses to balance the practice'
      ],
      benefits: 'Builds leg strength, improves posture, enhances balance, increases stamina, and creates overall body stability.'
    },
    {
      id: 14,
      title: 'Restorative Yoga Poses',
      category: 'Asanas',
      duration: '45 min',
      level: 'Beginner',
      recommendedAgeRanges: [{ min: 30, max: 100 }], // Great for middle-aged and older adults
      image: '/images/restorativeyoga.jpg',
      description: 'Deeply relaxing practice using props to support the body in gentle poses.',
      videoUrl: '/videos/RestorativeYoga.mp4',
      detailedInstructions: [
        'Gather props like blankets, blocks, and bolsters',
        'Set up each pose with careful attention to comfort',
        'Hold supported poses for 5-10 minutes each',
        'Focus on complete relaxation and surrender',
        'Practice gentle transitions between poses'
      ],
      benefits: 'Reduces stress and anxiety, promotes deep relaxation, balances the nervous system, and supports healing.'
    },
    {
      id: 15,
      title: 'Core Strengthening Sequence',
      category: 'Asanas',
      duration: '25 min',
      level: 'Intermediate',
      recommendedAgeRanges: [{ min: 18, max: 60 }], // Better for adults with good core strength
      image: '/images/corestrength.jpg',
      description: 'Build core strength and stability through targeted yoga poses and movements.',
      videoUrl: '/videos/coreStrengthning.mp4',
      detailedInstructions: [
        'Begin with gentle warm-up movements',
        'Progress through plank variations',
        'Practice boat pose and its modifications',
        'Include twisting movements for obliques',
        'End with stretches to release the core muscles'
      ],
      benefits: 'Strengthens the entire core, improves posture, supports spinal health, enhances stability, and builds functional strength.'
    },
    // Additional age-specific workouts
    {
      id: 16,
      title: 'Gentle Yoga for Seniors',
      category: 'Yoga',
      duration: '30 min',
      level: 'Beginner',
      recommendedAgeRanges: [{ min: 60, max: 100 }], // Specially designed for seniors
      image: '/images/gentleYoga.jpg',
      description: 'Gentle movements and poses designed specifically for older adults to improve mobility and balance.',
      videoUrl: '/videos/yogaForSeniors.mp4',
      detailedInstructions: [
        'Begin with seated warm-ups',
        'Practice gentle standing poses with chair support',
        'Focus on balance and stability',
        'Include gentle joint mobility exercises',
        'End with seated relaxation'
      ],
      benefits: 'Improves mobility, enhances balance, reduces joint pain, builds confidence, and promotes overall wellbeing in seniors.'
    },
    {
      id: 17,
      title: 'Youth Meditation',
      category: 'Meditation',
      duration: '15 min',
      level: 'Beginner',
      recommendedAgeRanges: [{ min: 10, max: 18 }], // Specifically for youth
      image: '/images/youthmeditation.jpg',
      description: 'Kid-friendly meditation techniques to help young people manage stress and build focus.',
      videoUrl: '/videos/youthMeditation.mp4',
      detailedInstructions: [
        'Find a comfortable position',
        'Use age-appropriate visualization techniques',
        'Practice brief periods of focused attention',
        'Include playful mindfulness activities',
        'End with positive affirmations'
      ],
      benefits: 'Improves focus and concentration, reduces stress and anxiety, builds emotional regulation skills, and enhances self-awareness.'
    }
  ];

  // Function to get workouts recommended for the user's age
  const getRecommendedWorkouts = () => {
    return workouts.filter(workout => {
      // Check if user's age falls within any of the recommended age ranges for this workout
      return workout.recommendedAgeRanges && workout.recommendedAgeRanges.some(range => 
        userAge >= range.min && userAge <= range.max
      );
    });
  };

  // Function to handle starting a workout (either regular or saved)
  const handleStartWorkout = (workout) => {
    // Find the full workout details if it's a saved workout
    if (workout._id) { // If it has _id, it's a saved workout
      const originalWorkout = workouts.find(w => w.id === workout.workoutId);
      if (originalWorkout) {
        setSelectedWorkout({
          ...workout,
          videoUrl: originalWorkout.videoUrl,
          detailedInstructions: originalWorkout.detailedInstructions,
          benefits: originalWorkout.benefits,
          recommendedAgeRanges: originalWorkout.recommendedAgeRanges
        });
      } else {
        setSelectedWorkout(workout);
      }
    } else {
      setSelectedWorkout(workout);
    }
    setShowModal(true);
  };

  const startSession = () => {
    setShowVideoView(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowVideoView(false);
    setSelectedWorkout(null);
  };

  // Function to close only the video view but keep modal open
  const closeVideoView = () => {
    setShowVideoView(false);
  };

  // Function to get filtered workouts
  const getFilteredWorkouts = () => {
    if (selectedCategory === 'Saved Workouts') {
      return savedWorkouts.map(saved => {
        // Find the original workout to get additional details
        const originalWorkout = workouts.find(w => w.id === saved.workoutId);
        return {
          ...saved,
          videoUrl: originalWorkout?.videoUrl,
          detailedInstructions: originalWorkout?.detailedInstructions,
          benefits: originalWorkout?.benefits,
          recommendedAgeRanges: originalWorkout?.recommendedAgeRanges
        };
      });
    }
    
    if (selectedCategory === 'Recommended for You') {
      return getRecommendedWorkouts();
    }
    
    return selectedCategory === 'All' 
      ? workouts 
      : workouts.filter(workout => workout.category === selectedCategory);
  };

  // Update the age section JSX
  const renderAgeSection = () => {
    if (isLoadingAge) {
      return (
        <div className="bg-white rounded-lg p-6 shadow-md mb-8">
          <div className="flex items-center">
            <div>
              <p className="text-gray-600 text-sm mb-1">Your Age</p>
              <h3 className="text-2xl font-bold text-gray-400">Loading...</h3>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg p-6 shadow-md mb-8">
        <div className="flex items-center">
          <div>
            <p className="text-gray-600 text-sm mb-1">Your Age</p>
            <h3 className="text-2xl font-bold">{userAge ? `${userAge} years` : 'Age not set'}</h3>
          </div>
        </div>
      </div>
    );
  };

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

        {/* Age section */}
        {renderAgeSection()}

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
          {getFilteredWorkouts().length > 0 ? (
            getFilteredWorkouts().map((workout) => (
              <div key={workout.id || workout._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
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
                  <p className="text-gray-600 mb-4 line-clamp-2">{workout.description}</p>
                  <button 
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                    onClick={() => handleStartWorkout(workout)}
                  >
                    Start Workout
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <h3 className="text-xl font-bold mb-2 text-gray-700">No workouts found</h3>
              <p className="text-gray-500">
                {selectedCategory === 'Saved Workouts' 
                  ? 'You haven\'t saved any workouts yet. Save workouts to see them here!'
                  : 'Try adjusting your age or selecting a different category'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Workout Details Modal */}
      {showModal && selectedWorkout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            ref={modalRef} 
            className="bg-white rounded-lg max-w-md w-full overflow-hidden"
          >
            {!showVideoView ? (
              <>
                {/* Modal Header with Image */}
                <div className="relative">
                  <img 
                    src={selectedWorkout.image} 
                    alt={selectedWorkout.title} 
                    className="w-full h-48 object-cover"
                  />
                  <button 
                    onClick={closeModal}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Modal Content */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-green-500 font-medium">{selectedWorkout.category}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{selectedWorkout.duration}</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                        {selectedWorkout.level}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{selectedWorkout.title}</h3>
                  <p className="text-gray-600 mb-6">{selectedWorkout.description}</p>
                  
                  {/* Age Recommendation Info */}
                  {selectedWorkout.recommendedAgeRanges && (
                    <div className="bg-blue-50 p-3 rounded-lg mb-6">
                      <p className="text-blue-800 text-sm">
                        {selectedWorkout.recommendedAgeRanges.map((range, index) => (
                          <span key={index}>
                            {index > 0 && ' or '}
                            Recommended for ages {range.min}-{range.max}
                          </span>
                        ))}
                      </p>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-4 mb-4">
                    <button 
                      className={`flex-1 flex items-center justify-center ${
                        isWorkoutSaved(selectedWorkout.id || selectedWorkout.workoutId)
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      } py-2 rounded-lg hover:bg-gray-200 transition-colors`}
                      onClick={() => handleSaveWorkout(selectedWorkout)}
                      disabled={isSaving}
                    >
                      <BookmarkPlus className="w-4 h-4 mr-2" />
                      {isWorkoutSaved(selectedWorkout.id || selectedWorkout.workoutId) ? 'Saved' : 'Save'}
                    </button>
                    <button 
                      className="flex-1 flex items-center justify-center bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                      onClick={() => alert('Sharing options!')}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </button>
                  </div>
                  
                  {/* Start Button */}
                  <button 
                    className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                    onClick={startSession}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Begin Workout
                  </button>
                </div>
              </>
            ) : (
              /* Video View */
              <div className="relative">
                {/* Back button to return to workout info */}
                <div className="absolute top-4 left-4 z-10 flex space-x-2">
                  <button 
                    onClick={closeVideoView}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                    aria-label="Back to workout details"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                </div>
                
                {/* Close button */}
                <button 
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
                
                {/* Video */}
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    className="w-full h-64"
                    src={selectedWorkout.videoUrl} 
                    title={`${selectedWorkout.title} Video`}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
                
                {/* Workout Details */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">{selectedWorkout.title}</h3>
                  
                  {selectedWorkout.detailedInstructions && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold mb-2">Instructions</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedWorkout.detailedInstructions.map((step, index) => (
                          <li key={index} className="text-gray-700">{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {selectedWorkout.benefits && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold mb-2">Benefits</h4>
                      <p className="text-gray-700">{selectedWorkout.benefits}</p>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">{selectedWorkout.category}</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{selectedWorkout.level}</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">{selectedWorkout.duration}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutPage;