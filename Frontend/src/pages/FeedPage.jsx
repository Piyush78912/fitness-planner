import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreVertical, Image, Smile, Send } from 'lucide-react';

function FeedPage() {
  const [newPost, setNewPost] = useState('');
  
  const posts = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: '/api/placeholder/40/40',
        handle: '@sarahfitness'
      },
      content: 'Just completed a 5k run in 25 minutes! Personal best! 🏃‍♀️💪 #fitness #running',
      image: '/api/placeholder/600/400',
      likes: 124,
      comments: 18,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      user: {
        name: 'Mike Chen',
        avatar: '/api/placeholder/40/40',
        handle: '@mikefit'
      },
      content: 'New PR on deadlifts today! Finally hit 300lbs 🎉 Remember to always maintain proper form!',
      image: '/api/placeholder/600/400',
      likes: 89,
      comments: 12,
      timestamp: '4 hours ago'
    }
  ];

  const handlePostSubmit = (e) => {
    e.preventDefault();
    // Handle post submission
    setNewPost('');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Create Post */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <form onSubmit={handlePostSubmit}>
          <div className="flex items-start space-x-4">
            <img 
              src="/api/placeholder/40/40" 
              alt="Your avatar" 
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="w-full border rounded-lg p-2 min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Share your fitness journey..."
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex space-x-2">
                  <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
                    <Image className="w-5 h-5" />
                  </button>
                  <button type="button" className="p-2 text-gray-500 hover:text-gray-700">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow">
            {/* Post Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{post.user.name}</h3>
                  <p className="text-sm text-gray-500">{post.user.handle}</p>
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Post Content */}
            <div className="px-4 py-2">
              <p className="text-gray-800">{post.content}</p>
            </div>

            {/* Post Image */}
            <img
              src={post.image}
              alt="Post content"
              className="w-full aspect-video object-cover"
            />

            {/* Post Actions */}
            <div className="p-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
                    <Heart className="w-5 h-5" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">{post.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedPage;