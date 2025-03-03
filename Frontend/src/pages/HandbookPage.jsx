import React, { useState } from 'react';
import { Search, Bell, Calculator, BookOpen, Dumbbell, Apple, Video, Battery, Clock, ChevronRight } from 'lucide-react';

function HandbookPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Guides', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'workouts', name: 'Workouts', icon: <Dumbbell className="w-4 h-4" /> },
    { id: 'nutrition', name: 'Nutrition', icon: <Apple className="w-4 h-4" /> },
    { id: 'techniques', name: 'Techniques', icon: <Video className="w-4 h-4" /> },
    { id: 'recovery', name: 'Recovery', icon: <Battery className="w-4 h-4" /> }
  ];

  const guides = [
    {
      id: 1,
      title: 'Complete Guide to Proper Squats',
      description: 'Master the fundamental technique of squats with this comprehensive guide. Learn proper form, common mistakes to avoid, and progression techniques.',
      category: 'techniques',
      readTime: '15 min',
      image: 'https://images.pexels.com/photos/703016/pexels-photo-703016.jpeg',
      author: 'Mike Johnson',
      date: '2024-01-15',
      difficulty: 'Intermediate'
    },
    {
      id: 2,
      title: 'Nutrition Basics for Muscle Gain',
      description: 'Learn about the essential nutrients and meal timing for muscle growth. Includes sample meal plans and supplement recommendations.',
      category: 'nutrition',
      readTime: '20 min',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      author: 'Sarah Wilson',
      date: '2024-01-14',
      difficulty: 'Beginner'
    },
    {
      id: 3,
      title: 'Deadlift Masterclass',
      description: 'Step-by-step breakdown of conventional and sumo deadlift techniques.',
      category: 'techniques',
      readTime: '30 min',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
      author: 'John Doe',
      date: '2024-01-13',
      difficulty: 'Advanced'
    },
    {
      id: 4,
      title: 'HIIT Workout Plans',
      description: '4-week high intensity interval training program with modifications.',
      category: 'workouts',
      readTime: '20 min',
      image: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg',
      author: 'Emily Davis',
      date: '2024-01-12',
      difficulty: 'Beginner'
    },
    {
      id: 5,
      title: 'Home Dumbbell Routine',
      description: 'Full-body workout using minimal equipment.',
      category: 'workouts',
      readTime: '35 min',
      image: 'https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg',
      author: 'Chris Brown',
      date: '2024-01-11',
      difficulty: 'All Levels'
    },
    {
      id: 6,
      title: 'Marathon Training Guide',
      description: '16-week plan for first-time marathon runners.',
      category: 'workouts',
      readTime: '40 min',
      image: 'https://images.pexels.com/photos/235922/pexels-photo-235922.jpeg',
      author: 'Laura Smith',
      date: '2024-01-10',
      difficulty: 'Intermediate'
    },
    {
      id: 7,
      title: 'Muscle Gain Meal Planning',
      description: 'Macro calculations and sample meal plans for bulking.',
      category: 'nutrition',
      readTime: '20 min',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      author: 'Sarah Wilson',
      date: '2024-01-09',
      difficulty: 'Beginner'
    },
    {
      id: 8,
      title: 'Intermittent Fasting Guide',
      description: 'Different fasting protocols and their benefits.',
      category: 'nutrition',
      readTime: '15 min',
      image: 'https://images.pexels.com/photos/1289363/pexels-photo-1289363.jpeg',
      author: 'Mike Johnson',
      date: '2024-01-08',
      difficulty: 'Intermediate'
    },
    {
      id: 9,
      title: 'Vegetarian Muscle Building',
      description: 'Plant-based protein sources and meal ideas.',
      category: 'nutrition',
      readTime: '25 min',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
      author: 'Emily Davis',
      date: '2024-01-07',
      difficulty: 'Intermediate'
    },
    {
      id: 10,
      title: 'Supplement Stack Guide',
      description: 'Evidence-based supplement recommendations.',
      category: 'nutrition',
      readTime: '18 min',
      image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg',
      author: 'John Doe',
      date: '2024-01-06',
      difficulty: 'Advanced'
    },
    {
      id: 11,
      title: 'Post-Workout Nutrition',
      description: 'Optimal recovery meal timing and composition.',
      category: 'nutrition',
      readTime: '12 min',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      author: 'Sarah Wilson',
      date: '2024-01-05',
      difficulty: 'Beginner'
    },
    {
      id: 12,
      title: 'Perfect Push-Up Form',
      description: 'Progressions from wall pushups to full ROM pushups.',
      category: 'techniques',
      readTime: '15 min',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg',
      author: 'Chris Brown',
      date: '2024-01-04',
      difficulty: 'Beginner'
    },
    {
      id: 13,
      title: 'Olympic Lifting Basics',
      description: 'Clean & jerk technique breakdown.',
      category: 'techniques',
      readTime: '30 min',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
      author: 'John Doe',
      date: '2024-01-03',
      difficulty: 'Advanced'
    },
    {
      id: 14,
      title: 'Mobility Drills',
      description: 'Daily routine for improved joint mobility.',
      category: 'techniques',
      readTime: '20 min',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg',
      author: 'Laura Smith',
      date: '2024-01-02',
      difficulty: 'All Levels'
    },
    {
      id: 15,
      title: 'Breathing Techniques',
      description: 'Diaphragmatic breathing for better performance.',
      category: 'techniques',
      readTime: '10 min',
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg',
      author: 'Emily Davis',
      date: '2024-01-01',
      difficulty: 'Beginner'
    },
    {
      id: 16,
      title: 'Kettlebell Swing Guide',
      description: 'Russian vs American swing techniques.',
      category: 'techniques',
      readTime: '18 min',
      image: 'https://images.pexels.com/photos/841131/pexels-photo-841131.jpeg',
      author: 'Chris Brown',
      date: '2023-12-31',
      difficulty: 'Intermediate'
    },
    {
      id: 17,
      title: 'Foam Rolling Routine',
      description: 'Myofascial release techniques for all muscle groups.',
      category: 'recovery',
      readTime: '15 min',
      image: 'https://cdn-ami-drupal.heartyhosting.com/sites/muscleandfitness.com/files/media/foam-rolling-roller-1109_0.jpg',
      author: 'Laura Smith',
      date: '2023-12-30',
      difficulty: 'Beginner'
    },
    {
      id: 18,
      title: 'Sleep Optimization Guide',
      description: 'Evidence-based sleep hygiene practices.',
      category: 'recovery',
      readTime: '20 min',
      image: 'https://mindbodygreen-res.cloudinary.com/image/upload/c_crop,x_0,y_0,w_1500,h_1000/c_fill,g_auto,w_440,h_296,q_auto,f_auto,fl_lossy/org/1g84vw9aojx1z4ywy.jpg',
      author: 'Mike Johnson',
      date: '2023-12-29',
      difficulty: 'Intermediate'
    },
    {
      id: 19,
      title: 'Active Recovery Workouts',
      description: 'Low-intensity movement protocols.',
      category: 'recovery',
      readTime: '25 min',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg',
      author: 'Emily Davis',
      date: '2023-12-28',
      difficulty: 'All Levels'
    },
    {
      id: 20,
      title: 'Injury Prevention Guide',
      description: 'Common weightlifting injuries and prevention.',
      category: 'recovery',
      readTime: '30 min',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
      author: 'John Doe',
      date: '2023-12-27',
      difficulty: 'Advanced'
    },
    {
      id: 21,
      title: 'Yoga for Lifters',
      description: 'Targeted sequences for mobility and recovery.',
      category: 'recovery',
      readTime: '20 min',
      image: 'https://fitnessvolt.com/wp-content/uploads/2024/11/recovery-yoga-for-lifters.jpg',
      author: 'Sarah Wilson',
      date: '2023-12-26',
      difficulty: 'Intermediate'
    },
    {
      id: 22,
      title: 'Advanced Calisthenics Routine',
      description: 'Master bodyweight exercises like muscle-ups, planches, and handstand push-ups.',
      category: 'workouts',
      readTime: '30 min',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg',
      author: 'Chris Brown',
      date: '2024-01-25',
      difficulty: 'Advanced'
    },
    {
      id: 23,
      title: 'Keto Diet Explained',
      description: 'A comprehensive guide to the ketogenic diet, including meal plans and benefits.',
      category: 'nutrition',
      readTime: '25 min',
      image: 'https://images.pexels.com/photos/5949884/pexels-photo-5949884.jpeg',
      author: 'Sarah Wilson',
      date: '2024-01-24',
      difficulty: 'Intermediate'
    },
    {
      id: 24,
      title: 'Pilates for Core Strength',
      description: 'Improve your core stability and posture with these Pilates exercises.',
      category: 'techniques',
      readTime: '20 min',
      image: 'https://images.pexels.com/photos/903171/pexels-photo-903171.jpeg',
      author: 'Emily Davis',
      date: '2024-01-23',
      difficulty: 'Beginner'
    },
    {
      id: 25,
      title: 'Cold Therapy Benefits',
      description: 'Learn how cold showers and ice baths can improve recovery and performance.',
      category: 'recovery',
      readTime: '15 min',
      image: 'https://www.sacksythyme.com/cdn/shop/articles/AdobeStock_159012813_1a338be1-c1ee-48a2-a596-0f92b15748d8.jpg?v=1688642181',
      author: 'John Doe',
      date: '2024-01-22',
      difficulty: 'Intermediate'
    },
    {
      id: 26,
      title: 'Strength Training for Women',
      description: 'A guide to building strength and confidence in the gym.',
      category: 'workouts',
      readTime: '25 min',
      image: 'https://thorpesphysiotherapy.com/wp-content/uploads/2020/05/foam-roller-back-stretch.jpg',
      author: 'Laura Smith',
      date: '2024-01-21',
      difficulty: 'Beginner'
    },
    {
      id: 27,
      title: 'Meal Prep for Busy Professionals',
      description: 'Save time and eat healthy with these meal prep tips and recipes.',
      category: 'nutrition',
      readTime: '20 min',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      author: 'Sarah Wilson',
      date: '2024-01-20',
      difficulty: 'Beginner'
    },
    {
      id: 28,
      title: 'Boxing Basics',
      description: 'Learn the fundamentals of boxing, including footwork and punching techniques.',
      category: 'techniques',
      readTime: '18 min',
      image: 'https://images.pexels.com/photos/4761353/pexels-photo-4761353.jpeg',
      author: 'Mike Johnson',
      date: '2024-01-19',
      difficulty: 'Intermediate'
    },
    {
      id: 29,
      title: 'Yoga for Stress Relief',
      description: 'Relax and unwind with these calming yoga sequences.',
      category: 'recovery',
      readTime: '15 min',
      image: 'https://images.pexels.com/photos/1812964/pexels-photo-1812964.jpeg',
      author: 'Emily Davis',
      date: '2024-01-18',
      difficulty: 'Beginner'
    },
    {
      id: 30,
      title: 'CrossFit Fundamentals',
      description: 'Get started with CrossFit workouts and learn the basic movements.',
      category: 'workouts',
      readTime: '30 min',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
      author: 'John Doe',
      date: '2024-01-17',
      difficulty: 'Intermediate'
    },
    {
      id: 31,
      title: 'Vegan Protein Sources',
      description: 'Discover plant-based protein options for muscle building.',
      category: 'nutrition',
      readTime: '20 min',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
      author: 'Sarah Wilson',
      date: '2024-01-16',
      difficulty: 'Beginner'
    },
    {
      id: 32,
      title: 'Running Form Tips',
      description: 'Improve your running efficiency and reduce injury risk.',
      category: 'techniques',
      readTime: '15 min',
      image: 'https://images.pexels.com/photos/235922/pexels-photo-235922.jpeg',
      author: 'Laura Smith',
      date: '2024-01-15',
      difficulty: 'Intermediate'
    },
    {
      id: 33,
      title: 'Foam Rolling Techniques',
      description: 'Relieve muscle tension and improve flexibility with foam rolling.',
      category: 'recovery',
      readTime: '12 min',
      image: 'https://cdn.prod.openfit.com/uploads/2021/02/19143934/openfit-foam-rolling-classes-head-960x480.png',
      author: 'Emily Davis',
      date: '2024-01-14',
      difficulty: 'Beginner'
    },
    {
      id: 34,
      title: 'Bodyweight Circuit Training',
      description: 'A full-body workout you can do anywhere, no equipment needed.',
      category: 'workouts',
      readTime: '25 min',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg',
      author: 'Chris Brown',
      date: '2024-01-13',
      difficulty: 'Intermediate'
    },
    {
      id: 35,
      title: 'Healthy Snack Ideas',
      description: 'Quick and nutritious snacks to fuel your day.',
      category: 'nutrition',
      readTime: '10 min',
      image: 'https://images.pexels.com/photos/793759/pexels-photo-793759.jpeg',
      author: 'Sarah Wilson',
      date: '2024-01-12',
      difficulty: 'Beginner'
    },
    {
      id: 36,
      title: 'Advanced Stretching Techniques',
      description: 'Improve flexibility and prevent injuries with these stretches.',
      category: 'techniques',
      readTime: '20 min',
      image: 'https://images.pexels.com/photos/903171/pexels-photo-903171.jpeg',
      author: 'Emily Davis',
      date: '2024-01-11',
      difficulty: 'Advanced'
    },
    {
      id: 37,
      title: 'Sleep Hygiene Tips',
      description: 'Optimize your sleep for better recovery and performance.',
      category: 'recovery',
      readTime: '15 min',
      image: 'https://drstevenlazarus.com/wp-content/uploads/2017/08/OROGOLD-Good-Sleep-Hygiene.jpg',
      author: 'John Doe',
      date: '2024-01-10',
      difficulty: 'Beginner'
    },
    {
      id: 38,
      title: 'Powerlifting 101',
      description: 'Learn the basics of powerlifting: squat, bench, and deadlift.',
      category: 'workouts',
      readTime: '30 min',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
      author: 'John Doe',
      date: '2024-01-09',
      difficulty: 'Intermediate'
    },
    {
      id: 39,
      title: 'Meal Timing for Athletes',
      description: 'When and what to eat for optimal performance.',
      category: 'nutrition',
      readTime: '20 min',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
      author: 'Sarah Wilson',
      date: '2024-01-08',
      difficulty: 'Intermediate'
    },
    {
      id: 40,
      title: 'Advanced Breathing Techniques',
      description: 'Enhance your performance with advanced breathing methods.',
      category: 'techniques',
      readTime: '15 min',
      image: 'https://stylesatlife.com/wp-content/uploads/2019/05/Yoga-Breathing-Exercises-For-The-Body-Steps-Benefits.jpg',
      author: 'Emily Davis',
      date: '2024-01-07',
      difficulty: 'Advanced'
    },
    {
      id: 41,
      title: 'Massage Therapy Benefits',
      description: 'How massage can improve recovery and reduce soreness.',
      category: 'recovery',
      readTime: '18 min',
      image: 'https://backtohealthwoodbury.com/wp-content/uploads/2012/07/massage-photo-for-site.jpg',
      author: 'John Doe',
      date: '2024-01-06',
      difficulty: 'Intermediate'
    },
    {
      id: 42,
      title: 'Functional Fitness Training',
      description: 'Improve everyday movements with functional exercises.',
      category: 'workouts',
      readTime: '25 min',
      image: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg',
      author: 'Chris Brown',
      date: '2024-01-05',
      difficulty: 'Intermediate'
    },
    {
      id: 43,
      title: 'Hydration for Athletes',
      description: 'Stay hydrated for peak performance and recovery.',
      category: 'nutrition',
      readTime: '12 min',
      image: 'https://maxmuscle.com/cdn/shop/articles/healthy-hydration-for-summer-exercise-957888.jpg?v=1660177241',
      author: 'Sarah Wilson',
      date: '2024-01-04',
      difficulty: 'Beginner'
    },
    {
      id: 44,
      title: 'Advanced Yoga Poses',
      description: 'Take your yoga practice to the next level with these challenging poses.',
      category: 'techniques',
      readTime: '20 min',
      image: 'https://i.pinimg.com/originals/ef/9d/44/ef9d4461b2b00612105e38c0124333f2.jpg',
      author: 'Emily Davis',
      date: '2024-01-03',
      difficulty: 'Advanced'
    },
    {
      id: 45,
      title: 'Active Recovery Techniques',
      description: 'Low-intensity exercises to speed up recovery.',
      category: 'recovery',
      readTime: '15 min',
      image: 'https://blog.nasm.org/hubfs/active-recovery-days.jpg',
      author: 'John Doe',
      date: '2024-01-02',
      difficulty: 'Beginner'
    },
    {
      id: 46,
      title: 'Bodybuilding Split Routine',
      description: 'A 5-day split for muscle hypertrophy and strength.',
      category: 'workouts',
      readTime: '30 min',
      image: 'https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg',
      author: 'John Doe',
      date: '2024-01-01',
      difficulty: 'Advanced'
    },
    {
      id: 47,
      title: 'Pre-Workout Nutrition',
      description: 'What to eat before your workout for maximum energy.',
      category: 'nutrition',
      readTime: '10 min',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      author: 'Sarah Wilson',
      date: '2023-12-31',
      difficulty: 'Beginner'
    },
    {
      id: 48,
      title: 'Injury Recovery Guide',
      description: 'Rehab exercises and tips for common fitness injuries.',
      category: 'recovery',
      readTime: '25 min',
      image: 'https://www.sportsmomsurvivalguide.com/wp-content/uploads/2018/04/Injury-Recovery.jpg',
      author: 'John Doe',
      date: '2023-12-30',
      difficulty: 'Intermediate'
    }
  ];

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      
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
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400"
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
              <img
                src={guide.image}
                alt={guide.title}
                className="w-full h-48 object-cover"
              />
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
                  <button className="flex items-center text-blue-500 hover:text-blue-600">
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
    </div>
  );
}

export default HandbookPage;