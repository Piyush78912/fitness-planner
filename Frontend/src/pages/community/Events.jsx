import React, { useState, useEffect } from 'react';

const Events = () => {
  const [filter, setFilter] = useState('all');
  
  // Add useEffect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Mock data for events with Unsplash image URLs
  const events = [
    {
      id: 1,
      title: 'Summer Fitness Challenge',
      date: 'June 1 - August 31, 2025',
      location: 'Online',
      type: 'challenge',
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Join our 12-week summer challenge to transform your fitness. Weekly workouts, nutrition guidance, and community support.',
      attendees: 245
    },
    {
      id: 2,
      title: 'Nutrition Workshop: Meal Prep 101',
      date: 'May 15, 2025 • 7:00 PM',
      location: 'Virtual Event',
      type: 'workshop',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Learn the essentials of effective meal preparation to save time and maintain your nutrition goals.',
      attendees: 128
    },
    {
      id: 3,
      title: 'Marathon Training Group',
      date: 'Every Saturday • 7:00 AM',
      location: 'Central Park, New York',
      type: 'meetup',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Weekly group runs with experienced coaches to prepare for upcoming marathon events.',
      attendees: 56
    },
    {
      id: 4,
      title: 'Yoga for Athletes Workshop',
      date: 'May 22, 2025 • 6:30 PM',
      location: 'Harmony Studio, Los Angeles',
      type: 'workshop',
      image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Specialized yoga session designed specifically for athletes focusing on recovery and mobility.',
      attendees: 35
    },
    {
      id: 5,
      title: 'Strength Training Seminar',
      date: 'June 5, 2025 • 1:00 PM',
      location: 'PowerLift Gym, Chicago',
      type: 'seminar',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Expert-led seminar on advanced strength training techniques and programming principles.',
      attendees: 89
    },
    {
      id: 6,
      title: 'FitPartner 5K Fun Run',
      date: 'July 4, 2025 • 8:00 AM',
      location: 'Riverside Park, Austin',
      type: 'race',
      image: 'https://images.unsplash.com/photo-1551927336-09d50efd69cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      description: 'Community 5K run/walk for all fitness levels followed by a healthy breakfast social.',
      attendees: 176
    }
  ];
  
  const filters = [
    { id: 'all', name: 'All Events' },
    { id: 'workshop', name: 'Workshops' },
    { id: 'challenge', name: 'Challenges' },
    { id: 'seminar', name: 'Seminars' },
    { id: 'meetup', name: 'Meetups' },
    { id: 'race', name: 'Races' }
  ];
  
  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.type === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-900 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Fitness Events</h1>
          <p className="text-purple-200">Discover events, workshops, and challenges to boost your fitness journey</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {filters.map(option => (
              <button
                key={option.id}
                onClick={() => setFilter(option.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  filter === option.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Featured Event */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl overflow-hidden shadow-lg mb-10">
          <div className="md:flex">
            <div className="md:w-2/5">
              <img 
                src="https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Featured Event" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-3/5 p-6 md:p-8 text-white">
              <div className="mb-2">
                <span className="bg-yellow-500 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full uppercase">Featured Event</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Spring Into Fitness: 30-Day Challenge</h2>
              <p className="mb-4 text-purple-100">
                May 1 - May 30, 2025 • Online Event
              </p>
              <p className="mb-6 text-purple-100">
                Kickstart your summer fitness goals with our community-wide challenge. Daily workouts, nutrition tips, 
                and accountability partners to help you crush your goals and win amazing prizes!
              </p>
              <div className="flex items-center mb-6">
                <div className="flex -space-x-2 mr-4">
                  <div className="w-8 h-8 rounded-full bg-purple-300"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-400"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-500"></div>
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs">+312</div>
                </div>
                <span className="text-sm text-purple-100">315 participants already registered</span>
              </div>
              <button className="bg-white text-purple-700 hover:bg-purple-100 px-6 py-3 rounded-lg font-semibold">
                Join Challenge
              </button>
            </div>
          </div>
        </div>
        
        {/* Events Grid */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                <div className="flex items-center mb-2 text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center mb-4 text-gray-600">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>{event.location}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {event.attendees} attending
                  </div>
                  <button className="bg-purple-100 text-purple-700 hover:bg-purple-200 px-4 py-2 rounded font-medium text-sm">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredEvents.length === 0 && (
          <div className="bg-white rounded-lg p-8 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No events found</h3>
            <p className="text-gray-600 mb-4">There are no events matching your current filter. Try selecting a different category.</p>
            <button 
              onClick={() => setFilter('all')} 
              className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded font-medium"
            >
              View All Events
            </button>
          </div>
        )}
        
        {/* Create Event CTA */}
        <div className="mt-12 bg-purple-50 rounded-xl p-6 md:p-8 border border-purple-100">
          <div className="md:flex items-center justify-between">
            <div className="md:w-2/3 mb-4 md:mb-0">
              <h3 className="text-xl md:text-2xl font-bold text-purple-900 mb-2">Have an event to share?</h3>
              <p className="text-gray-700">
                Create and promote your fitness-related events, workshops, or challenges with our community.
              </p>
            </div>
            <div>
              <button className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold">
                Create an Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;