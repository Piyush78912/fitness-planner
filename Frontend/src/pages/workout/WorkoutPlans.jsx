import React, { useState, useEffect } from 'react';

const WorkoutPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Add useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to handle viewing a plan
  const handleViewPlan = (plan) => {
    setSelectedPlan(plan);
    window.scrollTo(0, 0);
  };

  // Function to close plan details
  const handleClosePlan = () => {
    setSelectedPlan(null);
  };

  return (
    <div className="container py-8 px-4">
      {selectedPlan ? (
        // Detailed Plan View
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{selectedPlan.title}</h2>
            <button 
              onClick={handleClosePlan}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors"
            >
              Back to Plans
            </button>
          </div>

          <div className="mb-6">
            <img 
              src={selectedPlan.imageUrl} 
              alt={selectedPlan.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-bold text-gray-700 mb-2">Level</h3>
              <p>{selectedPlan.level}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-bold text-gray-700 mb-2">Duration</h3>
              <p>{selectedPlan.duration}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-bold text-gray-700 mb-2">Category</h3>
              <p>{selectedPlan.category}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Overview</h3>
            <p className="text-gray-600">{selectedPlan.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3 text-gray-800">Workout Schedule</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {selectedPlan.schedule && selectedPlan.schedule.map((day, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <h4 className="font-bold text-gray-700">{day.day}</h4>
                  <p className="text-gray-600">{day.activity}</p>
                </div>
              ))}
              {!selectedPlan.schedule && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-bold text-gray-700">Day 1</h4>
                    <p className="text-gray-600">
                      {selectedPlan.category === "Strength" ? "Upper Body Focus" : 
                       selectedPlan.category === "Cardio" ? "HIIT Session" : 
                       selectedPlan.category === "Flexibility" ? "Flexibility Flow" : 
                       selectedPlan.category === "Running" ? "Speed Work" : 
                       selectedPlan.category === "Core" ? "Core Stability" : "Rest Day"}
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-bold text-gray-700">Day 2</h4>
                    <p className="text-gray-600">
                      {selectedPlan.category === "Strength" ? "Lower Body Focus" : 
                       selectedPlan.category === "Cardio" ? "Steady State Cardio" : 
                       selectedPlan.category === "Flexibility" ? "Deep Stretch" : 
                       selectedPlan.category === "Running" ? "Easy Run" : 
                       selectedPlan.category === "Core" ? "Core Power" : "Active Recovery"}
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-bold text-gray-700">Day 3</h4>
                    <p className="text-gray-600">Rest Day</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-bold text-gray-700">Day 4</h4>
                    <p className="text-gray-600">
                      {selectedPlan.category === "Strength" ? "Full Body Workout" : 
                       selectedPlan.category === "Cardio" ? "Tabata Training" : 
                       selectedPlan.category === "Flexibility" ? "Balance Work" : 
                       selectedPlan.category === "Running" ? "Tempo Run" : 
                       selectedPlan.category === "Core" ? "Core Endurance" : "Skill Practice"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          
        </div>
      ) : (
        // Plan Selection View
        <>
          <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-8 mb-8 text-white">
            <h1 className="text-3xl font-bold mb-4">Workout Plans</h1>
            <p className="text-lg">Find the perfect workout plan tailored to your fitness goals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Workout Plan Cards */}
            {workoutPlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gray-200 relative">
                  {/* Using Unsplash images */}
                  <img
                    src={plan.imageUrl}
                    alt={plan.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                    <div className="font-bold text-lg">{plan.title}</div>
                    <div className="text-sm">{plan.level} • {plan.duration}</div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">{plan.category}</span>
                    </div>
                    <button 
                      onClick={() => handleViewPlan(plan)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                    >
                      View Plan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Enhanced workout plan data with Unsplash images
const workoutPlans = [
  {
    id: 1,
    title: "Beginner Full Body",
    level: "Beginner",
    duration: "4 weeks",
    category: "Strength",
    description: "Perfect for those new to fitness. Full body workouts 3 times per week to build a foundation.",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    schedule: [
      { day: "Monday", activity: "Full Body Workout A - Focus on form and basic movements" },
      { day: "Tuesday", activity: "Rest or Light Cardio (20-30 min walk)" },
      { day: "Wednesday", activity: "Full Body Workout B - Introducing new movements" },
      { day: "Thursday", activity: "Rest or Active Recovery" },
      { day: "Friday", activity: "Full Body Workout A - Increasing weights slightly" },
      { day: "Saturday/Sunday", activity: "Rest, light activity, or outdoor recreation" }
    ]
  },
  {
    id: 2,
    title: "HIIT Fat Burner",
    level: "Intermediate",
    duration: "6 weeks",
    category: "Cardio",
    description: "High-intensity interval training designed to maximize calorie burn and improve cardiovascular health.",
    imageUrl: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    schedule: [
      { day: "Monday", activity: "HIIT Session - 30 sec work, 30 sec rest x 20 minutes" },
      { day: "Tuesday", activity: "Steady State Cardio - 40 minutes at moderate intensity" },
      { day: "Wednesday", activity: "Rest or Yoga" },
      { day: "Thursday", activity: "Tabata Training - 20 sec work, 10 sec rest" },
      { day: "Friday", activity: "HIIT Circuit - Full body movements" },
      { day: "Saturday", activity: "Active Recovery - Light jog or walk" },
      { day: "Sunday", activity: "Rest" }
    ]
  },
  {
    id: 3,
    title: "Advanced Strength",
    level: "Advanced",
    duration: "8 weeks",
    category: "Strength",
    description: "Push your limits with this advanced strength program focusing on progressive overload.",
    imageUrl: "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 4,
    title: "Yoga Flow",
    level: "All Levels",
    duration: "Ongoing",
    category: "Flexibility",
    description: "Improve flexibility, balance and mindfulness with these yoga sequences.",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1220&q=80"
  },
  {
    id: 5,
    title: "5K Training Plan",
    level: "Beginner to Intermediate",
    duration: "8 weeks",
    category: "Running",
    description: "Train to complete your first 5K race with this progressive running plan.",
    imageUrl: "https://images.unsplash.com/photo-1701721714750-76ab564a858e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 6,
    title: "Core Crusher",
    level: "Intermediate",
    duration: "4 weeks",
    category: "Core",
    description: "Focused on strengthening your core muscles for better stability and posture.",
    imageUrl: "https://images.unsplash.com/photo-1579126038374-6064e9370f0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
  }
];

export default WorkoutPlans;