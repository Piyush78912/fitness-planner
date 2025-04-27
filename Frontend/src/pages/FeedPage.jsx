import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Image as ImageIcon,
  Smile,
  Send,
  X,
  Copy,
  Mail,
  Link as LinkIcon,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  User
} from 'lucide-react';

function FeedPage() {
  const [newPost, setNewPost] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [sharePostId, setSharePostId] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const fileInputRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const emojiButtonRef = useRef(null);
  const shareMenuRef = useRef(null);
  
  // Sample users for direct sharing
  const users = [
    { id: 1, name: 'Jessica Lee', avatar: 'https://i.pravatar.cc/150?img=4', handle: '@jessfit' },
    { id: 2, name: 'Alex Turner', avatar: 'https://i.pravatar.cc/150?img=2', handle: '@alexfit' },
    { id: 3, name: 'Mike Chen', avatar: 'https://i.pravatar.cc/150?img=3', handle: '@mikefit' },
    { id: 4, name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=1', handle: '@sarahfitness' },
    { id: 5, name: 'David Wilson', avatar: 'https://i.pravatar.cc/150?img=6', handle: '@davidfit' }
  ];
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=1',
        handle: '@sarahfitness'
      },
      content: 'Just completed a 5k run in 25 minutes! Personal best! 🏃‍♀️💪 #fitness #running',
      image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=600&h=400&fit=crop',
      likes: 124,
      liked: false,
      comments: [
        {
          id: 1,
          user: {
            name: 'Alex Turner',
            avatar: 'https://i.pravatar.cc/150?img=2',
            handle: '@alexfit'
          },
          content: 'Amazing job! I\'m still trying to break the 30-minute mark.',
          timestamp: '1 hour ago'
        }
      ],
      showComments: false,
      timestamp: '2 hours ago',
      newComment: ''
    },
    {
      id: 2,
      user: {
        name: 'Mike Chen',
        avatar: 'https://i.pravatar.cc/150?img=3',
        handle: '@mikefit'
      },
      content: 'New PR on deadlifts today! Finally hit 300lbs 🎉 Remember to always maintain proper form!',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop',
      likes: 89,
      liked: false,
      comments: [
        {
          id: 1,
          user: {
            name: 'Jessica Lee',
            avatar: 'https://i.pravatar.cc/150?img=4',
            handle: '@jessfit'
          },
          content: 'That\'s impressive! Any tips for improving deadlift form?',
          timestamp: '3 hours ago'
        }
      ],
      showComments: false,
      timestamp: '4 hours ago',
      newComment: ''
    }
  ]);

  // Common emojis for fitness posts
  const commonEmojis = [
    '💪', '🏋️‍♂️', '🏋️‍♀️', '🏃‍♂️', '🏃‍♀️', '🧘‍♂️', '🧘‍♀️', '🚴‍♂️', '🚴‍♀️', 
    '🏊‍♂️', '🏊‍♀️', '⚽', '🏀', '🎯', '🥗', '🍎', '🥦', '💯', '🔥', '👍', 
    '👏', '🎉', '😊', '😄', '🙌', '✅', '⭐', '🌟', '🏆', '🥇'
  ];

  // Add click outside handler to close emoji picker and share menu
  useEffect(() => {
    function handleClickOutside(event) {
      // Close emoji picker if clicking outside
      if (showEmojiPicker && 
          emojiPickerRef.current && 
          !emojiPickerRef.current.contains(event.target) &&
          !emojiButtonRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
      
      // Close share menu if clicking outside
      if (showShareMenu && 
          shareMenuRef.current && 
          !shareMenuRef.current.contains(event.target)) {
        setShowShareMenu(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker, showShareMenu]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim() && !newPostImage) return;

    const newPostObj = {
      id: Date.now(), // Using timestamp for unique ID
      user: {
        name: 'Your Name',
        avatar: 'https://i.pravatar.cc/150?img=5',
        handle: '@yourhandle'
      },
      content: newPost,
      image: newPostImage,
      likes: 0,
      liked: false,
      comments: [],
      showComments: false,
      timestamp: 'Just now',
      newComment: ''
    };

    setPosts([newPostObj, ...posts]);
    setNewPost('');
    setNewPostImage(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        // This will set the actual image data from the user's device
        setNewPostImage(event.target.result);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const removeImage = () => {
    setNewPostImage(null);
  };

  const addEmoji = (emoji) => {
    setNewPost(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const toggleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const toggleComments = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, showComments: !post.showComments }
        : post
    ));
  };

  const handleCommentChange = (postId, value) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, newComment: value }
        : post
    ));
  };

  const addComment = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId && post.newComment.trim()) {
        const newComment = {
          id: Date.now(),
          user: {
            name: 'Your Name',
            avatar: 'https://i.pravatar.cc/150?img=5',
            handle: '@yourhandle'
          },
          content: post.newComment,
          timestamp: 'Just now'
        };
        return {
          ...post,
          comments: [...post.comments, newComment],
          newComment: ''
        };
      }
      return post;
    }));
  };

  // Share functionality
  const handleShareClick = (postId) => {
    setSharePostId(postId);
    setShowShareMenu(true);
  };

  const copyPostLink = () => {
    // In a real app, this would copy a link to the specific post
    const postLink = `https://yourfitnesssocialapp.com/post/${sharePostId}`;
    navigator.clipboard.writeText(postLink).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
    setShowShareMenu(false);
  };

  const openDirectShare = () => {
    setShowShareMenu(false);
    setShareModalOpen(true);
  };

  const handleDirectShare = () => {
    if (selectedUser) {
      // In a real app, this would send the post to the selected user
      alert(`Post shared with ${selectedUser.name} (${selectedUser.handle})!`);
      setShareModalOpen(false);
      setSelectedUser(null);
    }
  };

  const shareToSocialMedia = (platform) => {
    // In a real app, this would open the respective sharing dialog
    alert(`Sharing to ${platform}!`);
    setShowShareMenu(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Create Post */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <form onSubmit={handlePostSubmit}>
          <div className="flex items-start space-x-4">
            <img
              src="https://i.pravatar.cc/150?img=5"
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
              
              {/* Preview selected image */}
              {newPostImage && (
                <div className="relative mt-2">
                  <img 
                    src={newPostImage} 
                    alt="Post preview" 
                    className="w-full rounded-lg max-h-64 object-cover" 
                  />
                  <button 
                    type="button" 
                    className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white rounded-full p-1"
                    onClick={removeImage}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              {/* Hidden file input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
              />
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex space-x-2">
                  <button 
                    type="button" 
                    className="p-2 text-gray-500 hover:text-gray-700"
                    onClick={handleImageClick}
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <div className="relative">
                    <button 
                      type="button" 
                      className="p-2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      ref={emojiButtonRef}
                    >
                      <Smile className="w-5 h-5" />
                    </button>
                    
                    {/* Emoji Picker */}
                    {showEmojiPicker && (
                      <div 
                        ref={emojiPickerRef}
                        className="fixed top-32 right-8 bg-white border rounded-lg shadow-lg p-4 z-50 w-80"
                      >
                        <div className="grid grid-cols-5 gap-3">
                          {commonEmojis.map((emoji, index) => (
                            <button
                              key={index}
                              type="button"
                              className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded text-2xl"
                              onClick={() => addEmoji(emoji)}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  disabled={!newPost.trim() && !newPostImage}
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
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-lg shadow">
            {/* Header */}
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

            {/* Content */}
            <div className="px-4 py-2">
              <p className="text-gray-800">{post.content}</p>
            </div>

            {/* Image */}
            {post.image && (
              <img
                src={post.image}
                alt="Post content"
                className="w-full aspect-video object-cover"
              />
            )}

            {/* Actions */}
            <div className="p-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center space-x-1 ${post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                  >
                    <Heart className="w-5 h-5" fill={post.liked ? 'currentColor' : 'none'} />
                    <span>{post.likes}</span>
                  </button>
                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments.length}</span>
                  </button>
                  <div className="relative">
                    <button 
                      className="flex items-center space-x-1 text-gray-500 hover:text-green-500"
                      onClick={() => handleShareClick(post.id)}
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    
                    {/* Share Menu */}
                    {showShareMenu && sharePostId === post.id && (
                      <div 
                        ref={shareMenuRef}
                        className="absolute bottom-10 left-0 bg-white rounded-lg shadow-lg p-2 z-10 w-64 border border-gray-200"
                      >
                        <div className="text-sm font-semibold px-2 py-1 border-b border-gray-200 mb-1">
                          Share Post
                        </div>
                        <button 
                          className="flex items-center space-x-3 w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                          onClick={copyPostLink}
                        >
                          <Copy className="w-5 h-5" />
                          <span>Copy link</span>
                        </button>
                        <button 
                          className="flex items-center space-x-3 w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                          onClick={openDirectShare}
                        >
                          <User className="w-5 h-5" />
                          <span>Share with user</span>
                        </button>
                        <button 
                          className="flex items-center space-x-3 w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                          onClick={() => shareToSocialMedia('Email')}
                        >
                          <Mail className="w-5 h-5" />
                          <span>Email</span>
                        </button>
                        <button 
                          className="flex items-center space-x-3 w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                          onClick={() => shareToSocialMedia('Facebook')}
                        >
                          <Facebook className="w-5 h-5" />
                          <span>Facebook</span>
                        </button>
                        <button 
                          className="flex items-center space-x-3 w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                          onClick={() => shareToSocialMedia('Twitter')}
                        >
                          <Twitter className="w-5 h-5" />
                          <span>Twitter</span>
                        </button>
                        <button 
                          className="flex items-center space-x-3 w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                          onClick={() => shareToSocialMedia('Instagram Direct')}
                        >
                          <Instagram className="w-5 h-5" />
                          <span>Instagram Direct</span>
                        </button>
                        <button 
                          className="flex items-center space-x-3 w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                          onClick={() => shareToSocialMedia('Messages')}
                        >
                          <MessageSquare className="w-5 h-5" />
                          <span>Messages</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-500">{post.timestamp}</span>
              </div>
            </div>

            {/* Comments */}
            {post.showComments && (
              <div className="border-t p-4">
                <h4 className="font-medium mb-2">Comments</h4>
                <div className="space-y-4">
                  {post.comments.map(comment => (
                    <div key={comment.id} className="flex space-x-3">
                      <img
                        src={comment.user.avatar}
                        alt={comment.user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{comment.user.name}</span>
                            <span className="text-xs text-gray-500">{comment.user.handle}</span>
                          </div>
                          <p className="text-sm mt-1">{comment.content}</p>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{comment.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* New Comment Input */}
                <div className="flex items-center space-x-3 mt-4">
                  <img
                    src="https://i.pravatar.cc/150?img=5"
                    alt="Your avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 flex items-center space-x-2">
                    <input
                      type="text"
                      value={post.newComment}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      className="flex-1 border rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add a comment..."
                    />
                    <button
                      onClick={() => addComment(post.id)}
                      className="text-blue-500 p-2 hover:text-blue-600"
                      disabled={!post.newComment.trim()}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Share with User Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Share with User</h3>
              <button 
                onClick={() => setShareModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-5">
              <div className="text-sm text-gray-600 mb-3">Select a user to share this post with:</div>
              <div className="max-h-60 overflow-y-auto">
                {users.map(user => (
                  <div 
                    key={user.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${selectedUser?.id === user.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
                    onClick={() => setSelectedUser(user)}
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.handle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShareModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDirectShare}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
                disabled={!selectedUser}
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Copy Success Notification */}
      {copySuccess && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span>Link copied to clipboard!</span>
        </div>
      )}
    </div>
  );
}

export default FeedPage;