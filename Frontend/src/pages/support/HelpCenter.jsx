import React, { useState, useEffect } from 'react';

const HelpCenter = () => {
  const [activeFaqCategory, setActiveFaqCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // FAQ categories and questions
  const faqCategories = [
    { id: 'general', name: 'General Questions' },
    { id: 'account', name: 'Account & Billing' },
    { id: 'workout', name: 'Workout Plans' },
    { id: 'nutrition', name: 'Nutrition Tracking' },
    { id: 'mobile', name: 'Mobile App' },
  ];

  const faqs = {
    general: [
      {
        question: 'What is FitnessPlannerPro?',
        answer: 'FitnessPlannerPro is a comprehensive fitness planning platform that helps you create personalized workout routines, track your nutrition, and monitor your progress all in one place.'
      },
      {
        question: 'How do I get started?',
        answer: 'After signing up, complete your fitness profile with your goals, current fitness level, and preferences. Our system will then recommend personalized workout and nutrition plans.'
      },
      {
        question: 'Is FitnessPlannerPro suitable for beginners?',
        answer: 'Absolutely! We have plans for all fitness levels from complete beginners to advanced athletes. Our beginner plans include detailed instructions and video tutorials.'
      }
    ],
    account: [
      {
        question: 'How do I reset my password?',
        answer: 'Go to the login page, click on "Forgot Password", and follow the instructions sent to your registered email address.'
      },
      {
        question: 'How do I change my subscription plan?',
        answer: 'Navigate to Account Settings > Subscription and select "Change Plan" to view available options.'
      },
      {
        question: 'Can I cancel my subscription anytime?',
        answer: 'Yes, you can cancel your subscription at any time from your Account Settings. You will continue to have access until the end of your current billing period.'
      }
    ],
    workout: [
      {
        question: 'How do I create a custom workout plan?',
        answer: 'Go to the Workouts tab, select "Create Custom Plan", and follow the step-by-step guide. You can choose exercises, set repetitions, and schedule your workouts.'
      },
      {
        question: 'Can I share my workout routines with friends?',
        answer: 'Yes! Click the "Share" button on any of your workout plans to generate a shareable link or invite friends directly via email.'
      },
      {
        question: 'How do I track my workout progress?',
        answer: 'Your progress is automatically tracked as you complete workouts. Visit the Analytics section to view detailed charts and statistics about your performance.'
      }
    ],
    nutrition: [
      {
        question: 'How accurate is the calorie tracking?',
        answer: 'Our nutrition database contains over 1 million foods with detailed nutritional information. You can also scan barcodes for packaged foods to ensure accuracy.'
      },
      {
        question: 'Can I create custom meal plans?',
        answer: 'Yes, you can create custom meal plans based on your dietary preferences, allergies, and fitness goals in the Nutrition section.'
      },
      {
        question: 'Does the app sync with other nutrition apps?',
        answer: 'We integrate with popular apps like MyFitnessPal, Apple Health, and Google Fit to keep your nutrition data synchronized.'
      }
    ],
    mobile: [
      {
        question: 'Is there a mobile app available?',
        answer: 'Yes, we have apps for both iOS and Android. Search for "FitnessPlannerPro" in the App Store or Google Play Store.'
      },
      {
        question: 'Can I use the app offline?',
        answer: 'Yes, most features work offline. Your data will sync automatically when you reconnect to the internet.'
      },
      {
        question: 'How do I track workouts while at the gym?',
        answer: 'Open the mobile app, select your workout for the day, and use the tracking feature to record sets, reps, and weights as you exercise.'
      }
    ]
  };

  // Support resources
  const supportResources = [
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides on how to use all features of FitnessPlannerPro.',
      icon: '📹',
      link: '#tutorials'
    },
    {
      title: 'Knowledge Base',
      description: 'Browse our extensive collection of articles covering every aspect of the platform.',
      icon: '📚',
      link: '#knowledge-base'
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users, share tips, and get advice from our community.',
      icon: '👥',
      link: '#community'
    },
    {
      title: 'Email Support',
      description: 'Contact our support team directly for personalized assistance.',
      icon: '✉️',
      link: '/contact'
    }
  ];

  // Filter FAQs based on search query
  const filterFaqs = () => {
    if (!searchQuery.trim()) return null;
    
    const filteredResults = [];
    Object.keys(faqs).forEach(category => {
      const matchingFaqs = faqs[category].filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (matchingFaqs.length > 0) {
        const categoryName = faqCategories.find(cat => cat.id === category).name;
        filteredResults.push({
          category: categoryName,
          faqs: matchingFaqs
        });
      }
    });
    
    return filteredResults;
  };

  const searchResults = filterFaqs();

  // FAQ Component
  const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="border-b border-gray-200 py-4">
        <button
          className="flex justify-between items-center w-full text-left font-medium text-gray-900 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{question}</span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        {isOpen && <p className="mt-2 text-gray-600">{answer}</p>}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions about our fitness planner platform.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for help..."
            className="w-full px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search Results */}
      {searchQuery.trim() && searchResults && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Search Results for "{searchQuery}"</h2>
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <div key={index} className="mb-8">
                <h3 className="text-xl font-medium mb-4">{result.category}</h3>
                <div className="bg-white rounded-lg shadow-sm">
                  {result.faqs.map((faq, faqIndex) => (
                    <FaqItem key={faqIndex} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No results found. Please try a different search term.</p>
          )}
        </div>
      )}

      {/* Main Content */}
      {!searchQuery.trim() && (
        <>
          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-8">Frequently Asked Questions</h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* FAQ Categories */}
              <div className="md:w-1/4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-4">Categories</h3>
                  <nav className="space-y-2">
                    {faqCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveFaqCategory(category.id)}
                        className={`block w-full text-left px-3 py-2 rounded ${
                          activeFaqCategory === category.id
                            ? 'bg-blue-100 text-blue-800'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
              
              {/* FAQ Content */}
              <div className="md:w-3/4">
                <div className="bg-white rounded-lg shadow-sm">
                  {faqs[activeFaqCategory].map((faq, index) => (
                    <FaqItem key={index} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Support Resources */}
          <div>
            <h2 className="text-2xl font-semibold mb-8">Additional Support Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportResources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.link}
                  className="block bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="text-4xl mb-4">{resource.icon}</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600">{resource.description}</p>
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Contact CTA */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Still need help?</h2>
        <p className="text-gray-600 mb-6">Our support team is ready to assist you with any questions or issues.</p>
        <a
          href="/support/contact"
          className="inline-block text-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md shadow-sm px-6 py-3"
          role="button"
          aria-label="Contact Us"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default HelpCenter;