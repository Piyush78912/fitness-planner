import React, { useState, useEffect } from 'react';

function FindPartnerPage() {
  const [location, setLocation] = useState('');
  const [activityType, setActivityType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  
  // Add useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Finding partner with:', { location, activityType, experienceLevel });
  };
  
  // Mock data with Unsplash images that work consistently
  const partners = [
    { 
      id: 1, 
      name: 'Alex Johnson', 
      age: 28, 
      location: 'New York', 
      activities: ['Running', 'Yoga'], 
      level: 'Intermediate', 
      image: '/api/placeholder/60/60' // Placeholder fallback
    },
    { 
      id: 2, 
      name: 'Taylor Smith', 
      age: 32, 
      location: 'Los Angeles', 
      activities: ['Weight Training', 'HIIT'], 
      level: 'Advanced', 
      image: '/api/placeholder/60/60' // Placeholder fallback
    },
    { 
      id: 3, 
      name: 'Jordan Lee', 
      age: 25, 
      location: 'Chicago', 
      activities: ['Swimming', 'Cycling'], 
      level: 'Beginner', 
      image: '/api/placeholder/60/60' // Placeholder fallback 
    },
    { 
      id: 4, 
      name: 'Morgan Chen', 
      age: 30, 
      location: 'Seattle', 
      activities: ['CrossFit', 'Boxing'], 
      level: 'Intermediate', 
      image: '/api/placeholder/60/60' // Placeholder fallback
    },
    { 
      id: 5, 
      name: 'Casey Rivera', 
      age: 27, 
      location: 'Miami', 
      activities: ['Pilates', 'Barre'], 
      level: 'Beginner', 
      image: '/api/placeholder/60/60' // Placeholder fallback
    },
  ];
  
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Navigation Bar */}
      <nav className="bg-slate-800 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="/" className="text-red-400 text-2xl font-bold">FitPartner</a>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white">Workout Plans</a>
            <a href="#" className="text-gray-300 hover:text-white">Nutrition Guide</a>
            <a href="#" className="text-gray-300 hover:text-white">Meditation Sessions</a>
            <a href="#" className="text-gray-300 hover:text-white">Progress Tracker</a>
            <a href="#" className="text-red-400 hover:text-red-300">Find a Partner</a>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Find Your Perfect Workout Partner</h1>
        
        {/* Search Form */}
        <div className="max-w-4xl mx-auto bg-slate-800 rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Search for Partners</h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city"
                className="w-full p-2 rounded bg-slate-700 text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Activity Type</label>
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                className="w-full p-2 rounded bg-slate-700 text-white"
              >
                <option value="">Select activity</option>
                <option value="running">Running</option>
                <option value="yoga">Yoga</option>
                <option value="weight_training">Weight Training</option>
                <option value="cycling">Cycling</option>
                <option value="swimming">Swimming</option>
                <option value="hiit">HIIT</option>
                <option value="pilates">Pilates</option>
                <option value="crossfit">CrossFit</option>
                <option value="boxing">Boxing</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full p-2 rounded bg-slate-700 text-white"
              >
                <option value="">Any level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded font-medium">
                Search
              </button>
            </div>
          </form>
        </div>
        
        {/* Partner Results */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Available Partners</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {partners.map(partner => (
              <div key={partner.id} className="bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="p-4 flex items-start">
                  {/* Using placeholder API for consistent, reliable images */}
                  <img src={`/api/placeholder/60/60`} alt={partner.name} className="rounded-full w-12 h-12 mr-4" />
                  <div>
                    <h3 className="font-bold text-lg">{partner.name}</h3>
                    <p className="text-gray-400">{partner.age}, {partner.location}</p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {partner.activities.map(activity => (
                        <span key={activity} className="bg-slate-700 text-xs px-2 py-1 rounded">
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <p className="mb-2 text-sm">
                    <span className="text-gray-400">Experience:</span> {partner.level}
                  </p>
                  <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded font-medium">
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner Benefits */}
        <div className="bg-slate-800 rounded-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Benefits of Finding a Workout Partner</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Increased Motivation</h3>
              <p className="text-gray-300">Partners provide accountability and encourage you to show up consistently.</p>
            </div>
            <div className="text-center p-4">
              <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Better Performance</h3>
              <p className="text-gray-300">Friendly competition can push you to achieve more than working out alone.</p>
            </div>
            <div className="text-center p-4">
              <div className="bg-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Social Connection</h3>
              <p className="text-gray-300">Form meaningful friendships while working toward your fitness goals.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-gray-400 text-center">
          <p>© 2025 FitPartner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default FindPartnerPage;