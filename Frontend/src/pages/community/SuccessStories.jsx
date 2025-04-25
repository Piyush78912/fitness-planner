import React, { useState, useEffect } from 'react';

const SuccessStories = () => {
  const [activeStory, setActiveStory] = useState(null);
  const [category, setCategory] = useState('all');
  const [stories, setStories] = useState([]);

  // Add useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data categories
  const categories = [
    { id: 'all', name: 'All Stories' },
    { id: 'weight-loss', name: 'Weight Loss' },
    { id: 'muscle-gain', name: 'Muscle Gain' },
    { id: 'endurance', name: 'Endurance' },
    { id: 'consistency', name: 'Consistency' },
    { id: 'health', name: 'Health Improvement' }
  ];

  // Fetch stories from API or use mock data
  useEffect(() => {
    // Replace this with actual API call when ready
    const fetchStories = async () => {
      try {
        // Simulating API call with mock data
        const mockStories = [
          // ... your existing stories array ...
        ];
        setStories(mockStories);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);

  const filteredStories = category === 'all' 
    ? stories 
    : stories.filter(story => story.category === category);

  const openStory = (id) => {
    const story = stories.find(s => s.id === id);
    if (story) {
      setActiveStory(story);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const closeStory = () => {
    setActiveStory(null);
  };

  const shareStory = (platform, story) => {
    // Implement sharing functionality
    console.log(`Sharing story to ${platform}:`, story);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-900 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Success Stories</h1>
          <p className="text-purple-200">Real people, real transformations, real results</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {activeStory ? (
          // Story Detail View
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <button 
                onClick={closeStory} 
                className="flex items-center text-gray-700 hover:text-purple-600"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to all stories
              </button>
            </div>

            {/* Story Content */}
            <div className="p-6 md:p-8">
              {/* ... Rest of your story detail view ... */}
            </div>
          </div>
        ) : (
          // Stories List View
          <>
            {/* Category Filters */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Browse Success Stories</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      category === cat.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map(story => (
                <div 
                  key={story.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <img 
                    src={story.image} 
                    alt={story.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{story.title}</h3>
                    <p className="text-purple-600 mb-1">{story.name} • {story.duration}</p>
                    <p className="text-gray-600 mb-4">{story.shortStory}</p>
                    <button 
                      onClick={() => openStory(story.id)} 
                      className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
                    >
                      Read full story
                      <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Share Your Story CTA */}
            <div className="mt-12 bg-purple-50 rounded-xl p-6 md:p-8 border border-purple-100">
              <div className="md:flex items-center justify-between">
                <div className="md:w-2/3 mb-4 md:mb-0">
                  <h3 className="text-xl md:text-2xl font-bold text-purple-900 mb-2">
                    Have a success story to share?
                  </h3>
                  <p className="text-gray-700">
                    We'd love to hear about your fitness journey and how FitPartner helped you reach your goals.
                    Your story could inspire thousands of others!
                  </p>
                </div>
                <div>
                  <button className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold">
                    Share Your Story
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SuccessStories;