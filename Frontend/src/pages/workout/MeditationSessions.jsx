import React, { useEffect } from 'react';

const MeditationSessions = () => {
  // Add useEffect to automatically scroll to the top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty dependency array means this runs once when component mounts

  const meditationCategories = [
    {
      title: "Beginner Meditations",
      description: "Start your meditation journey with these simple guided sessions",
      sessions: [
        { name: "Breath Awareness", duration: "5 min", level: "Beginner" },
        { name: "Body Scan", duration: "10 min", level: "Beginner" },
        { name: "Mindful Listening", duration: "7 min", level: "Beginner" }
      ]
    },
    {
      title: "Stress Relief",
      description: "Reduce anxiety and calm your mind with these focused practices",
      sessions: [
        { name: "Tension Release", duration: "12 min", level: "Intermediate" },
        { name: "Worry Diffuser", duration: "15 min", level: "All Levels" },
        { name: "Emergency Calm", duration: "5 min", level: "All Levels" }
      ]
    },
    {
      title: "Sleep & Recovery",
      description: "Improve sleep quality and enhance your physical recovery",
      sessions: [
        { name: "Pre-Sleep Relaxation", duration: "20 min", level: "All Levels" },
        { name: "Deep Rest", duration: "30 min", level: "All Levels" },
        { name: "Muscle Recovery", duration: "15 min", level: "Intermediate" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-indigo-50">
      {/* Header */}
      <header className="bg-indigo-900 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Meditation Sessions</h1>
          <p className="text-indigo-100">Train your mind for focus, calm, and mental wellness</p>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold mb-4">Find Your Inner Balance</h2>
            <p className="text-xl mb-8">
              Meditation isn't just for relaxation—it's a powerful tool that can enhance your 
              fitness journey by improving recovery, focus, and mental resilience.
            </p>
            <button className="bg-white text-indigo-600 hover:bg-indigo-100 font-semibold py-3 px-6 rounded-lg">
              Start Meditating Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center text-indigo-800">Benefits of Meditation for Fitness</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">Enhanced Recovery</h3>
              <p className="text-gray-600">
                Regular meditation activates your parasympathetic nervous system, promoting faster muscle recovery and reducing inflammation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">Improved Focus</h3>
              <p className="text-gray-600">
                Meditation strengthens your mind's ability to concentrate, helping you maintain better form and mind-muscle connection during workouts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">Stress Reduction</h3>
              <p className="text-gray-600">
                Lower cortisol levels from regular meditation practice can lead to better sleep, improved hormone balance, and more consistent energy.
              </p>
            </div>
          </div>
        </section>

        {/* Meditation Categories */}
        <section>
          <h2 className="text-2xl font-semibold mb-8 text-center text-indigo-800">Meditation Library</h2>
          
          {meditationCategories.map((category, index) => (
            <div key={index} className="mb-12">
              <h3 className="text-xl font-semibold mb-3 text-indigo-700">{category.title}</h3>
              <p className="mb-6 text-gray-600">{category.description}</p>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-indigo-100">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-indigo-800">Session</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-indigo-800">Duration</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-indigo-800">Level</th>
                      <th className="py-3 px-4 text-center text-sm font-semibold text-indigo-800">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {category.sessions.map((session, idx) => (
                      <tr key={idx} className="hover:bg-indigo-50">
                        <td className="py-4 px-4 text-gray-700">{session.name}</td>
                        <td className="py-4 px-4 text-gray-700">{session.duration}</td>
                        <td className="py-4 px-4 text-gray-700">{session.level}</td>
                        <td className="py-4 px-4 text-center">
                          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded">
                            Play
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default MeditationSessions;