import React, { useState, useEffect } from 'react';

const ProgressTracker = () => {
  // Sample data for demonstration
  const [selectedTab, setSelectedTab] = useState('overview');
  
  // Add useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Mock data
  const workoutData = [
    { date: '2025-04-17', type: 'Strength', duration: '45 min', calories: 320 },
    { date: '2025-04-19', type: 'Cardio', duration: '30 min', calories: 280 },
    { date: '2025-04-20', type: 'Flexibility', duration: '25 min', calories: 150 },
    { date: '2025-04-22', type: 'Strength', duration: '50 min', calories: 350 },
    { date: '2025-04-24', type: 'HIIT', duration: '20 min', calories: 220 }
  ];

  const bodyMetrics = {
    weight: [
      { date: '2025-03-24', value: 182 },
      { date: '2025-04-01', value: 180 },
      { date: '2025-04-08', value: 179 },
      { date: '2025-04-15', value: 177 },
      { date: '2025-04-22', value: 176 },
    ],
    bodyFat: [
      { date: '2025-03-24', value: 23 },
      { date: '2025-04-01', value: 22.5 },
      { date: '2025-04-08', value: 22.2 },
      { date: '2025-04-15', value: 21.8 },
      { date: '2025-04-22', value: 21.3 },
    ]
  };

  const benchmarks = [
    { exercise: 'Bench Press', starting: '135 lbs', current: '165 lbs', goal: '200 lbs', progress: 55 },
    { exercise: '5K Run', starting: '32 min', current: '28 min', goal: '25 min', progress: 57 },
    { exercise: 'Pull-ups', starting: '3 reps', current: '7 reps', goal: '12 reps', progress: 44 },
    { exercise: 'Plank', starting: '45 sec', current: '90 sec', goal: '180 sec', progress: 33 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-800 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Progress Tracker</h1>
          <p className="text-green-100">Track, analyze and celebrate your fitness journey</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tabs Navigation */}
        <div className="flex flex-wrap border-b border-gray-200 mb-8">
          <button 
            onClick={() => setSelectedTab('overview')}
            className={`mr-4 py-2 px-4 font-medium text-sm rounded-t-lg ${
              selectedTab === 'overview' 
                ? 'bg-white border-l border-t border-r border-gray-200 text-green-700' 
                : 'text-gray-600 hover:text-green-700'
            }`}
          >
            Overview
          </button>
          <button 
            onClick={() => setSelectedTab('workouts')}
            className={`mr-4 py-2 px-4 font-medium text-sm rounded-t-lg ${
              selectedTab === 'workouts' 
                ? 'bg-white border-l border-t border-r border-gray-200 text-green-700' 
                : 'text-gray-600 hover:text-green-700'
            }`}
          >
            Workouts
          </button>
          <button 
            onClick={() => setSelectedTab('body')}
            className={`mr-4 py-2 px-4 font-medium text-sm rounded-t-lg ${
              selectedTab === 'body' 
                ? 'bg-white border-l border-t border-r border-gray-200 text-green-700' 
                : 'text-gray-600 hover:text-green-700'
            }`}
          >
            Body Metrics
          </button>
          <button 
            onClick={() => setSelectedTab('benchmarks')}
            className={`mr-4 py-2 px-4 font-medium text-sm rounded-t-lg ${
              selectedTab === 'benchmarks' 
                ? 'bg-white border-l border-t border-r border-gray-200 text-green-700' 
                : 'text-gray-600 hover:text-green-700'
            }`}
          >
            Benchmarks
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-green-800">Your Fitness Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-green-700">This Week</h3>
                  <div className="text-3xl font-bold text-green-800 mb-1">3</div>
                  <div className="text-sm text-green-700">Workouts Completed</div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-green-700">Monthly Streak</h3>
                  <div className="text-3xl font-bold text-green-800 mb-1">16</div>
                  <div className="text-sm text-green-700">Days Active</div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-green-700">Recent Achievement</h3>
                  <div className="text-xl font-semibold text-green-800 mb-1">💪 New PR!</div>
                  <div className="text-sm text-green-700">Bench Press: 165 lbs</div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-green-800">Recent Progress</h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Weight</span>
                    <span className="text-green-600">-6 lbs (Last 30 days)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full w-3/4"></div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-800">Coming Up</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-green-700 text-white px-4 py-2">
                    <div className="font-medium">Tomorrow</div>
                  </div>
                  <div className="p-4">
                    <div className="font-medium mb-1">Upper Body Strength</div>
                    <div className="text-sm text-gray-600">45 min • 9:00 AM</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Workouts Tab */}
          {selectedTab === 'workouts' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-green-800">Your Workout History</h2>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                  Log New Workout
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workout Type</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories Burned</th>
                      <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {workoutData.map((workout, idx) => (
                      <tr key={idx}>
                        <td className="py-3 px-4 text-sm text-gray-800">{workout.date}</td>
                        <td className="py-3 px-4 text-sm text-gray-800">{workout.type}</td>
                        <td className="py-3 px-4 text-sm text-gray-800">{workout.duration}</td>
                        <td className="py-3 px-4 text-sm text-gray-800">{workout.calories}</td>
                        <td className="py-3 px-4 text-sm">
                          <button className="text-green-600 hover:text-green-800 mr-3">View</button>
                          <button className="text-gray-600 hover:text-gray-800">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Body Metrics Tab */}
          {selectedTab === 'body' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-green-800">Body Measurements</h2>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                  Add New Measurement
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-green-700">Weight Tracking (lbs)</h3>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 h-64 relative">
                    {/* This would be a chart in a real app */}
                    <div className="absolute bottom-4 left-0 right-0">
                      <div className="h-40 flex items-end justify-around">
                        {bodyMetrics.weight.map((point, idx) => (
                          <div key={idx} className="flex flex-col items-center">
                            <div 
                              className="bg-green-500 w-12 rounded-t" 
                              style={{height: `${(point.value - 170) * 8}px`}}
                            ></div>
                            <div className="text-xs mt-1 text-gray-600">{point.date.split('-')[2]}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-green-700">Body Fat Percentage</h3>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 h-64 relative">
                    {/* This would be a chart in a real app */}
                    <div className="absolute bottom-4 left-0 right-0">
                      <div className="h-40 flex items-end justify-around">
                        {bodyMetrics.bodyFat.map((point, idx) => (
                          <div key={idx} className="flex flex-col items-center">
                            <div 
                              className="bg-blue-500 w-12 rounded-t" 
                              style={{height: `${point.value * 6}px`}}
                            ></div>
                            <div className="text-xs mt-1 text-gray-600">{point.date.split('-')[2]}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-green-700">Other Measurements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Chest</div>
                    <div className="font-semibold">42 in</div>
                    <div className="text-xs text-green-600">-1.5 in</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Waist</div>
                    <div className="font-semibold">34 in</div>
                    <div className="text-xs text-green-600">-2 in</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Hips</div>
                    <div className="font-semibold">38 in</div>
                    <div className="text-xs text-green-600">-1 in</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Benchmarks Tab */}
          {selectedTab === 'benchmarks' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-green-800">Fitness Benchmarks</h2>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                  Add New Benchmark
                </button>
              </div>
              
              <div className="space-y-6">
                {benchmarks.map((benchmark, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-green-800">{benchmark.exercise}</h3>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Starting</div>
                          <div className="font-medium">{benchmark.starting}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Current</div>
                          <div className="font-medium text-green-700">{benchmark.current}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Goal</div>
                          <div className="font-medium">{benchmark.goal}</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{benchmark.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-green-600 h-2.5 rounded-full" 
                            style={{width: `${benchmark.progress}%`}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;