import React, { useState, useEffect } from 'react';

const Forums = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Add useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Mock data
  const categories = [
    { id: 'all', name: 'All Forums', count: 36 },
    { id: 'general', name: 'General Discussion', count: 12 },
    { id: 'nutrition', name: 'Nutrition & Diet', count: 8 },
    { id: 'cardio', name: 'Cardio & Running', count: 5 },
    { id: 'strength', name: 'Strength Training', count: 7 },
    { id: 'recovery', name: 'Recovery & Wellness', count: 4 }
  ];
  
  const threads = [
    {
      id: 1,
      category: 'nutrition',
      title: 'Best pre-workout meals for morning sessions?',
      author: 'FitnessFreak23',
      replies: 18,
      views: 324,
      lastActivity: '2 hours ago',
      isPinned: true
    },
    {
      id: 2,
      category: 'strength',
      title: 'Form check: Am I doing squats correctly?',
      author: 'NewLiftBro',
      replies: 7,
      views: 112,
      lastActivity: '5 hours ago',
      isPinned: false
    },
    {
      id: 3,
      category: 'general',
      title: 'How to stay motivated during plateau phases',
      author: 'ConsistencyQueen',
      replies: 24,
      views: 531,
      lastActivity: '1 day ago',
      isPinned: false
    },
    {
      id: 4,
      category: 'recovery',
      title: 'Foam rolling techniques for lower back pain',
      author: 'FlexibilityNinja',
      replies: 15,
      views: 267,
      lastActivity: '1 day ago',
      isPinned: false
    },
    {
      id: 5,
      category: 'cardio',
      title: 'Zone 2 training: experiences and results',
      author: 'MarathonMaster',
      replies: 32,
      views: 614,
      lastActivity: '2 days ago',
      isPinned: false
    },
    {
      id: 6,
      category: 'nutrition',
      title: 'Protein intake: how much is too much?',
      author: 'ScienceBuff',
      replies: 41,
      views: 829,
      lastActivity: '3 days ago',
      isPinned: false
    },
    {
      id: 7,
      category: 'general',
      title: 'Official FitPartner App Feedback Thread',
      author: 'ModTeam',
      replies: 76,
      views: 1243,
      lastActivity: '3 days ago',
      isPinned: true
    }
  ];
  
  const filteredThreads = selectedCategory === 'all' 
    ? threads 
    : threads.filter(thread => thread.category === selectedCategory);
  
  const sortedThreads = [...filteredThreads].sort((a, b) => {
    // Show pinned threads first
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-900 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Community Forums</h1>
          <p className="text-purple-200">Connect, share, and learn with fellow fitness enthusiasts</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Forum Categories</h3>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category.id}>
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center ${
                        selectedCategory === category.id
                          ? 'bg-purple-100 text-purple-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className="bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1">
                        {category.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Forum Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Threads:</span>
                  <span className="font-medium">458</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Posts:</span>
                  <span className="font-medium">5,241</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Members:</span>
                  <span className="font-medium">1,287</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Newest Member:</span>
                  <span className="font-medium text-purple-600">GymNewbie35</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Forum Content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Forum Header/Controls */}
              <div className="flex justify-between items-center bg-gray-50 p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">
                  {categories.find(c => c.id === selectedCategory)?.name || 'All Forums'}
                </h2>
                <div className="flex space-x-2">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm">
                    New Thread
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Thread List */}
              <div className="divide-y divide-gray-200">
                {sortedThreads.length > 0 ? (
                  sortedThreads.map(thread => (
                    <div key={thread.id} className={`p-4 hover:bg-gray-50 ${thread.isPinned ? 'bg-purple-50' : ''}`}>
                      <div className="flex items-start mb-2">
                        {thread.isPinned && (
                          <span className="mr-2 mt-1 bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded">
                            Pinned
                          </span>
                        )}
                        <h3 className="text-lg font-medium text-purple-900">
                          {thread.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap justify-between text-sm text-gray-600">
                        <div className="flex items-center mb-2 md:mb-0">
                          <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                          <span className="mr-4">{thread.author}</span>
                          
                          <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                          </svg>
                          <span className="mr-4">{thread.replies} replies</span>
                          
                          <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                          <span>{thread.views} views</span>
                        </div>
                        <div className="text-purple-600">
                          Last activity: {thread.lastActivity}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-gray-500">
                    No threads found in this category.
                  </div>
                )}
              </div>
              
              {/* Pagination */}
              <div className="bg-gray-50 py-3 px-4 border-t border-gray-200 flex items-center justify-between">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedThreads.length}</span> of <span className="font-medium">{sortedThreads.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Previous
                      </a>
                      <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-purple-50 text-sm font-medium text-purple-600 hover:bg-purple-100">
                        1
                      </a>
                      <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        2
                      </a>
                      <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        3
                      </a>
                      <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        Next
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forums;