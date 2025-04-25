import React, { useState } from 'react';
import { Search, BookOpen, Dumbbell, Apple, Video, Battery, Clock, ChevronRight, X, ExternalLink } from 'lucide-react';

function HandbookPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Category configuration
  const categories = [
    { id: 'all', name: 'All Guides', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'workouts', name: 'Workouts', icon: <Dumbbell className="w-4 h-4" /> },
    { id: 'nutrition', name: 'Nutrition', icon: <Apple className="w-4 h-4" /> },
    { id: 'techniques', name: 'Techniques', icon: <Video className="w-4 h-4" /> },
    { id: 'recovery', name: 'Recovery', icon: <Battery className="w-4 h-4" /> }
  ];

  // Image component to ensure visibility
  const GuideImage = ({ category, title }) => {
    // Color based on category
    const bgColorMap = {
      'techniques': 'bg-blue-600',
      'nutrition': 'bg-green-600',
      'workouts': 'bg-yellow-500',
      'recovery': 'bg-orange-500'
    };
    
    const bgColor = bgColorMap[category] || 'bg-purple-600';
    
    return (
      <div className={`w-full h-full ${bgColor} flex items-center justify-center p-4`}>
        <div className="text-center">
          <div className="text-white font-bold text-xl mb-2">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
          <div className="text-white text-sm">
            {title}
          </div>
        </div>
      </div>
    );
  };

  const guides = [
    {
      id: 1,
      title: 'Complete Guide to Proper Squats',
      description: 'Master the fundamental technique of squats with this comprehensive guide. Learn proper form, common mistakes to avoid, and progression techniques.',
      category: 'techniques',
      readTime: '15 min',
      author: 'Mike Johnson',
      date: '2024-01-15',
      difficulty: 'Intermediate',
      detailedInfo: [
        'Start with feet slightly wider than shoulder-width apart',
        'Keep your chest up and back straight throughout the movement',
        'Lower until thighs are parallel to the ground',
        'Drive through your heels to return to standing position',
        'Common mistakes include knees caving inward and rounding the back'
      ],
      websiteLink: 'https://www.strongerbyscience.com/how-to-squat/'
    },
    {
      id: 2,
      title: 'Nutrition Basics for Muscle Gain',
      description: 'Learn about the essential nutrients and meal timing for muscle growth. Includes sample meal plans and supplement recommendations.',
      category: 'nutrition',
      readTime: '20 min',
      author: 'Sarah Wilson',
      date: '2024-01-14',
      difficulty: 'Beginner',
      detailedInfo: [
        'Aim for 1.6-2.2g of protein per kg of bodyweight',
        'Consume 3-5g of carbohydrates per kg for energy and recovery',
        'Include healthy fats at 0.5-1.5g per kg',
        'Eat 4-6 smaller meals throughout the day',
        'Prioritize whole, unprocessed foods for better nutrient absorption'
      ],
      websiteLink: 'https://examine.com/guides/protein-intake/'
    },
    {
      id: 3,
      title: 'Deadlift Masterclass',
      description: 'Step-by-step breakdown of conventional and sumo deadlift techniques.',
      category: 'techniques',
      readTime: '30 min',
      author: 'John Doe',
      date: '2024-01-13',
      difficulty: 'Advanced',
      detailedInfo: [
        'Position the bar over mid-foot before beginning',
        'Keep your arms straight and outside your knees',
        'Engage your lats to keep the bar close to your body',
        'Drive through the floor and extend your hips and knees simultaneously',
        'Maintain a neutral spine position throughout the lift'
      ],
      websiteLink: 'https://www.strongerbyscience.com/how-to-deadlift/'
    },
    {
      id: 4,
      title: 'HIIT Workout Plans',
      description: '4-week high intensity interval training program with modifications.',
      category: 'workouts',
      readTime: '20 min',
      author: 'Emily Davis',
      date: '2024-01-12',
      difficulty: 'Beginner',
      detailedInfo: [
        'Start with a 1:2 work-to-rest ratio (e.g., 30 seconds work, 60 seconds rest)',
        'Gradually progress to 1:1 and then 2:1 ratios as fitness improves',
        'Include both bodyweight and weighted exercises',
        'Aim for 20-30 minutes total workout time including warm-up',
        'Perform 2-3 HIIT sessions per week with recovery days in between'
      ],
      websiteLink: 'https://www.acefitness.org/education-and-resources/lifestyle/blog/6752/8-reasons-hiit-workouts-are-so-effective/'
    },
    {
      id: 5,
      title: 'Home Dumbbell Routine',
      description: 'Full-body workout using minimal equipment.',
      category: 'workouts',
      readTime: '35 min',
      author: 'Chris Brown',
      date: '2024-01-11',
      difficulty: 'All Levels',
      detailedInfo: [
        'Perform 3 full-body workouts per week with at least one rest day between sessions',
        'Focus on compound movements like squats, presses, rows and lunges',
        'Use a rep range of 8-12 for muscle growth',
        'Progressive overload by increasing weight or reps each week',
        'Include unilateral exercises to address muscle imbalances'
      ],
      websiteLink: 'https://www.muscleandstrength.com/workouts/dumbbell-only-home-workout'
    },
    {
      id: 6,
      title: 'Marathon Training Guide',
      description: '16-week plan for first-time marathon runners.',
      category: 'workouts',
      readTime: '40 min',
      author: 'Laura Smith',
      date: '2024-01-10',
      difficulty: 'Intermediate',
      detailedInfo: [
        'Build base mileage gradually before beginning specific marathon training',
        'Include one long run per week, increasing distance by 1-2 miles each week',
        'Incorporate speed work once per week to improve running economy',
        'Taper training volume 2-3 weeks before race day',
        'Practice race nutrition strategies during long training runs'
      ],
      websiteLink: 'https://www.runnersworld.com/training/a20781512/the-beginners-guide-to-the-half-marathon/'
    },
    {
      id: 7,
      title: 'Muscle Gain Meal Planning',
      description: 'Macro calculations and sample meal plans for bulking.',
      category: 'nutrition',
      readTime: '20 min',
      author: 'Sarah Wilson',
      date: '2024-01-09',
      difficulty: 'Beginner',
      detailedInfo: [
        'Calculate your maintenance calories and add 300-500 calories for muscle gain',
        'Set protein intake at 1.6-2.2g per kg of bodyweight',
        'Fill remaining calories with carbohydrates and healthy fats',
        'Plan meals around your training schedule for optimal nutrient timing',
        'Track progress and adjust calories every 2-3 weeks based on results'
      ],
      websiteLink: 'https://www.healthline.com/nutrition/bulking-diet-meal-plan'
    },
    {
      id: 8,
      title: 'Bench Press Form Guide',
      description: 'Learn how to master the bench press technique for chest development.',
      category: 'techniques',
      readTime: '25 min',
      author: 'Mark Williams',
      date: '2024-01-08',
      difficulty: 'Intermediate',
      detailedInfo: [
        'Set up with feet flat on the floor and shoulders firmly on the bench',
        'Grip the bar slightly wider than shoulder-width',
        'Lower the bar to mid-chest level while keeping elbows at about 45 degrees',
        'Drive the bar up in a slight arc back toward the rack position',
        'Maintain scapular retraction throughout the movement for shoulder health'
      ],
      websiteLink: 'https://www.strongerbyscience.com/how-to-bench/'
    },
    {
      id: 9,
      title: 'Full Body Recovery Protocols',
      description: 'Evidence-based recovery techniques to maximize performance and minimize soreness.',
      category: 'recovery',
      readTime: '30 min',
      author: 'Jessica Miller',
      date: '2024-01-07',
      difficulty: 'All Levels',
      detailedInfo: [
        'Prioritize 7-9 hours of quality sleep per night for hormonal recovery',
        'Implement active recovery sessions between intense workout days',
        'Use foam rolling and stretching to address tissue quality',
        'Apply proper hydration strategies before, during, and after workouts',
        'Consider contrast therapy (alternating hot and cold exposure) for circulation'
      ],
      websiteLink: 'https://www.healthline.com/health/fitness-exercise/workout-recovery'
    },
    {
      id: 10,
      title: 'Beginner\'s Guide to Meal Prepping',
      description: 'Learn how to save time and stay consistent with your nutrition through efficient meal preparation.',
      category: 'nutrition',
      readTime: '25 min',
      author: 'Alex Thompson',
      date: '2024-01-06',
      difficulty: 'Beginner',
      detailedInfo: [
        'Start with a weekly meal plan based on your nutritional goals',
        'Choose 2-3 protein sources, 3-4 vegetables, and 2-3 carb sources for variety',
        'Invest in quality food storage containers for different meal components',
        'Batch cook proteins and grains to save time',
        'Use different spices and marinades to prevent flavor fatigue'
      ],
      websiteLink: 'https://www.healthline.com/nutrition/meal-prep-tips'
    },
    {
      id: 11,
      title: 'Proper Pull-Up Progression',
      description: 'Step-by-step guide to achieving your first pull-up or increasing your pull-up numbers.',
      category: 'techniques',
      readTime: '20 min',
      author: 'David Chen',
      date: '2024-01-05',
      difficulty: 'All Levels',
      detailedInfo: [
        'Start with scapular pulls to develop proper engagement',
        'Progress to negative pull-ups (jumping up and lowering slowly)',
        'Incorporate band-assisted pull-ups to build strength through full range of motion',
        'Use active hangs to build grip strength and shoulder stability',
        'Implement specific programming with progressive overload for consistent improvement'
      ],
      websiteLink: 'https://www.nerdfitness.com/blog/do-a-pull-up/'
    },
    {
      id: 12,
      title: 'Intermittent Fasting Guide',
      description: 'Everything you need to know about different intermittent fasting protocols and their benefits.',
      category: 'nutrition',
      readTime: '35 min',
      author: 'Emma Roberts',
      date: '2024-01-04',
      difficulty: 'Intermediate',
      detailedInfo: [
        'Understand the different protocols (16:8, 20:4, 5:2, etc.)',
        'Learn about metabolic adaptations during fasting periods',
        'Implement proper hydration and electrolyte strategies',
        'Structure workouts appropriately around fasting windows',
        'Monitor biomarkers to assess effectiveness for your specific goals'
      ],
      websiteLink: 'https://www.healthline.com/nutrition/intermittent-fasting-guide'
    },
    {
      id: 13,
      title: 'Mobility Routine for Athletes',
      description: 'Comprehensive mobility program to improve performance and prevent injuries.',
      category: 'recovery',
      readTime: '25 min',
      author: 'Ryan Peters',
      date: '2024-01-03',
      difficulty: 'All Levels',
      detailedInfo: [
        'Begin with a dynamic warm-up to increase blood flow to muscles and joints',
        'Focus on key problem areas including hips, shoulders, and thoracic spine',
        'Hold each stretch for 30-60 seconds to achieve optimal tissue adaptation',
        'Incorporate loaded stretching techniques for enhanced mobility gains',
        'Implement daily 10-minute minimum mobility routine for maintenance'
      ],
      websiteLink: 'https://www.health.harvard.edu/staying-healthy/the-importance-of-stretching'
    },
    {
      id: 14,
      title: 'Bodyweight Training System',
      description: 'Build strength and muscle using only your bodyweight with this progressive program.',
      category: 'workouts',
      readTime: '30 min',
      author: 'Jason Rodriguez',
      date: '2024-01-02',
      difficulty: 'All Levels',
      detailedInfo: [
        'Master fundamental movement patterns before progressing to advanced variations',
        'Use tempo manipulation to increase difficulty without adding weight',
        'Implement progressive overload through leverage changes and reduced stability',
        'Train in the 5-12 rep range for strength and hypertrophy adaptations',
        'Include unilateral work to address imbalances and increase coordination'
      ],
      websiteLink: 'https://gmb.io/bodyweight-training/'
    },
    {
      id: 15,
      title: 'Sleep Optimization for Recovery',
      description: 'Scientific strategies to maximize sleep quality for better recovery and performance.',
      category: 'recovery',
      readTime: '35 min',
      author: 'Dr. Lisa Johnson',
      date: '2023-12-28',
      difficulty: 'Beginner',
      detailedInfo: [
        'Maintain consistent sleep and wake times to regulate your circadian rhythm',
        'Optimize your sleep environment with cool temperatures (65-68°F/18-20°C)',
        'Limit blue light exposure 2-3 hours before bedtime for better melatonin production',
        'Use strategic pre-sleep nutrition to enhance recovery hormones',
        'Implement stress-reduction techniques like meditation for deeper sleep'
      ],
      websiteLink: 'https://www.sleepfoundation.org/physical-activity/athletic-performance-and-sleep'
    },
    {
      id: 16,
      title: 'Kettlebell Fundamentals',
      description: 'Master the basic kettlebell movements to transform your conditioning and strength.',
      category: 'techniques',
      readTime: '40 min',
      author: 'Pavel Ivanov',
      date: '2023-12-25',
      difficulty: 'Intermediate',
      detailedInfo: [
        'Develop proper hip hinge mechanics before attempting swings',
        'Master the rack position for efficient cleans and presses',
        'Engage your lats during swings to protect your lower back',
        'Use double-breathing technique for Turkish get-ups and heavy presses',
        'Progress from two-handed to one-handed exercises for increased core engagement'
      ],
      websiteLink: 'https://www.strongfirst.com/kettlebell-exercises/'
    },
    {
      id: 17,
      title: 'Anti-Inflammatory Diet Plan',
      description: 'Reduce inflammation, enhance recovery, and improve long-term health with these nutrition strategies.',
      category: 'nutrition',
      readTime: '45 min',
      author: 'Dr. Michelle Kim',
      date: '2023-12-22',
      difficulty: 'Intermediate',
      detailedInfo: [
        'Emphasize omega-3 rich foods like fatty fish, flaxseeds and walnuts',
        'Incorporate colorful fruits and vegetables to increase antioxidant intake',
        'Minimize processed foods, refined sugars and industrial seed oils',
        'Include fermented foods for gut health and reduced systemic inflammation',
        'Use specific spices like turmeric, ginger and cinnamon for their anti-inflammatory properties'
      ],
      websiteLink: 'https://www.healthline.com/nutrition/anti-inflammatory-diet-101'
    },
    {
      id: 18,
      title: 'Breathing Techniques for Performance',
      description: 'Optimize your breathing patterns to enhance recovery, reduce stress, and improve athletic output.',
      category: 'recovery',
      readTime: '30 min',
      author: 'James Thompson',
      date: '2023-12-20',
      difficulty: 'All Levels',
      detailedInfo: [
        'Learn diaphragmatic breathing to activate your parasympathetic nervous system',
        'Practice box breathing (4-4-4-4) for pre-workout focus and post-workout recovery',
        'Implement 4-7-8 breathing before bed to improve sleep quality',
        'Use breath holds to improve CO2 tolerance and cardiovascular efficiency',
        'Sync breathing with movement patterns during exercise for optimal performance'
      ],
      websiteLink: 'https://www.health.harvard.edu/staying-healthy/breathing-techniques-for-better-health'
    },
    {
      id: 19,
      title: 'Olympic Weightlifting for Beginners',
      description: 'Learn the clean and jerk and snatch for explosive power development.',
      category: 'techniques',
      readTime: '50 min',
      author: 'Maria Gonzalez',
      date: '2023-12-18',
      difficulty: 'Advanced',
      detailedInfo: [
        'Master the front squat and overhead squat before progressing to full lifts',
        'Develop proper ankle, hip, and shoulder mobility for safe lift execution',
        'Break down the snatch and clean into component parts using the progression method',
        'Implement technique-focused sessions with light weights before adding intensity',
        'Use video analysis to identify and correct form errors'
      ],
      websiteLink: 'https://www.catalystathletics.com/article/131/Olympic-Weightlifting-Skill-Learning/'
    },
    {
      id: 20,
      title: 'Strength Training for Endurance Athletes',
      description: 'Optimize your strength training to enhance running, cycling, and swimming performance.',
      category: 'workouts',
      readTime: '35 min',
      author: 'Tom Martinez',
      date: '2023-12-15',
      difficulty: 'Intermediate',
      detailedInfo: [
        'Implement 1-2 strength sessions weekly focusing on multi-joint movements',
        'Periodize strength work to complement endurance training cycles',
        'Focus on rate of force development over maximum strength for performance carryover',
        'Address common weak links including posterior chain, core stability, and single-leg strength',
        'Program specific injury prevention exercises based on sport demands'
      ],
      websiteLink: 'https://www.trainingpeaks.com/blog/strength-training-for-endurance-athletes/'
    }
  ];

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openGuideDetails = (guide) => {
    setSelectedGuide(guide);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Fitness Handbook</h1>
          <p className="text-gray-600 text-lg">Comprehensive guides and tutorials for your fitness journey</p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search guides..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Tabs */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <div key={guide.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48">
                <GuideImage category={guide.category} title={guide.title} />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-500 font-medium">
                    {guide.category.charAt(0).toUpperCase() + guide.category.slice(1)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="flex items-center text-gray-500 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {guide.readTime}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                      {guide.difficulty}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{guide.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{guide.author}</span>
                  <button 
                    onClick={() => openGuideDetails(guide)}
                    className="flex items-center text-blue-500 hover:text-blue-600"
                  >
                    Read More
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No guides found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Modal for Guide Details */}
      {showModal && selectedGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-screen overflow-auto">
            {/* Modal Header */}
            <div className="relative">
              <div className="h-64">
                <GuideImage category={selectedGuide.category} title={selectedGuide.title} />
              </div>
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <span className="inline-block px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full mb-2">
                  {selectedGuide.category.charAt(0).toUpperCase() + selectedGuide.category.slice(1)}
                </span>
                <h2 className="text-2xl font-bold text-white">{selectedGuide.title}</h2>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    {selectedGuide.author.split(' ')[0][0]}{selectedGuide.author.split(' ')[1][0]}
                  </div>
                  <div>
                    <p className="font-medium">{selectedGuide.author}</p>
                    <p className="text-sm text-gray-500">{selectedGuide.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {selectedGuide.readTime}
                  </span>
                  <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600">
                    {selectedGuide.difficulty}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-8">{selectedGuide.description}</p>
              
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Key Points</h3>
                <ul className="space-y-3">
                  {selectedGuide.detailedInfo.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <a 
                  href={selectedGuide.websiteLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <span className="mr-2">Read Full Guide</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HandbookPage;