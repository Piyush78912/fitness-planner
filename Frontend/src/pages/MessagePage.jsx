import { Info, Phone, Search, Send, Video } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState([
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
        online: true
      },
      lastMessage: 'That\'s awesome! What\'s your target for next week?',
      timestamp: '10:33 AM',
      unread: 2
    },
    {
      id: 2,
      user: {
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces',
        online: false
      },
      lastMessage: 'Ready for our HIIT session tomorrow?',
      timestamp: '9:25 AM',
      unread: 3
    },
    {
      id: 3,
      user: {
        name: 'Emma Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
        online: true
      },
      lastMessage: 'It\'s great for post-workout recovery. Shall we practice it in our next session?',
      timestamp: '2:10 PM',
      unread: 1
    },
    {
      id: 4,
      user: {
        name: 'Alex Thompson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
        online: true
      },
      lastMessage: 'Don\'t forget to track your macros! How\'s the meal prep going?',
      timestamp: '11:20 AM',
      unread: 4
    },
    {
      id: 5,
      user: {
        name: 'Lisa Kumar',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces',
        online: false
      },
      lastMessage: 'That\'s great to hear! Meditation and fitness go hand in hand 🧘‍♀️',
      timestamp: '4:15 PM',
      unread: 2
    },
    {
      id: 6,
      user: {
        name: 'David Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
        online: true
      },
      lastMessage: 'Your strength gains are impressive! Keep it up! 💪',
      timestamp: '3:45 PM',
      unread: 1
    },
    {
      id: 7,
      user: {
        name: 'Maria Garcia',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces',
        online: true
      },
      lastMessage: 'Let\'s review your cardio progress next session',
      timestamp: '5:20 PM',
      unread: 3
    }
  ]);

  const [allMessages, setAllMessages] = useState({
    1: [
      {
        id: 1,
        sender: 'Sarah Johnson',
        content: 'Hey! How was your workout today?',
        timestamp: '10:30 AM',
        isSender: false
      },
      {
        id: 2,
        sender: 'You',
        content: 'It was great! Hit a new PR on squats 💪',
        timestamp: '10:32 AM',
        isSender: true
      },
      {
        id: 3,
        sender: 'Sarah Johnson',
        content: 'That\'s awesome! What\'s your target for next week?',
        timestamp: '10:33 AM',
        isSender: false
      }
    ],
    2: [
      {
        id: 1,
        sender: 'Mike Chen',
        content: 'Your form during today\'s training session was perfect!',
        timestamp: '9:15 AM',
        isSender: false
      },
      {
        id: 2,
        sender: 'You',
        content: 'Thanks Mike! Those technique tips really helped.',
        timestamp: '9:20 AM',
        isSender: true
      },
      {
        id: 3,
        sender: 'Mike Chen',
        content: 'Ready for our HIIT session tomorrow?',
        timestamp: '9:25 AM',
        isSender: false
      }
    ],
    3: [
      {
        id: 1,
        sender: 'Emma Rodriguez',
        content: 'The new yoga sequence I mentioned...',
        timestamp: '2:00 PM',
        isSender: false
      },
      {
        id: 2,
        sender: 'You',
        content: 'Perfect timing! I was just looking for some flexibility work',
        timestamp: '2:05 PM',
        isSender: true
      },
      {
        id: 3,
        sender: 'Emma Rodriguez',
        content: 'It\'s great for post-workout recovery. Shall we practice it in our next session?',
        timestamp: '2:10 PM',
        isSender: false
      }
    ],
    4: [
      {
        id: 1,
        sender: 'Alex Thompson',
        content: 'Here\'s your personalized meal plan for the week 📋',
        timestamp: '11:00 AM',
        isSender: false
      },
      {
        id: 2,
        sender: 'You',
        content: 'Thanks Alex! The protein smoothie recipe looks delicious',
        timestamp: '11:15 AM',
        isSender: true
      },
      {
        id: 3,
        sender: 'Alex Thompson',
        content: 'Don\'t forget to track your macros! How\'s the meal prep going?',
        timestamp: '11:20 AM',
        isSender: false
      }
    ],
    5: [
      {
        id: 1,
        sender: 'Lisa Kumar',
        content: 'Remember to practice those breathing exercises we discussed',
        timestamp: '4:00 PM',
        isSender: false
      },
      {
        id: 2,
        sender: 'You',
        content: 'The mindfulness techniques are really helping with my stress levels',
        timestamp: '4:10 PM',
        isSender: true
      },
      {
        id: 3,
        sender: 'Lisa Kumar',
        content: 'That\'s great to hear! Meditation and fitness go hand in hand 🧘‍♀️',
        timestamp: '4:15 PM',
        isSender: false
      }
    ],
    6: [
      {
        id: 1,
        sender: 'David Wilson',
        content: 'Just reviewed your progress charts - excellent work!',
        timestamp: '3:30 PM',
        isSender: false
      },
      {
        id: 2,
        sender: 'You',
        content: 'Thanks! Been really focusing on proper form',
        timestamp: '3:40 PM',
        isSender: true
      },
      {
        id: 3,
        sender: 'David Wilson',
        content: 'Your strength gains are impressive! Keep it up! 💪',
        timestamp: '3:45 PM',
        isSender: false
      }
    ],
    7: [
      {
        id: 1,
        sender: 'Maria Garcia',
        content: 'Your heart rate zones are looking much better',
        timestamp: '5:10 PM',
        isSender: false
      },
      {
        id: 2,
        sender: 'You',
        content: 'The interval training really helped!',
        timestamp: '5:15 PM',
        isSender: true
      },
      {
        id: 3,
        sender: 'Maria Garcia',
        content: 'Let\'s review your cardio progress next session',
        timestamp: '5:20 PM',
        isSender: false
      }
    ]
  });

  useEffect(() => {
    // Initialize Dialogflow messenger
    const dfMessenger = document.querySelector('df-messenger');
    if (dfMessenger) {
      dfMessenger.addEventListener('df-messenger-loaded', () => {
        console.log('Chatbot loaded successfully');
      });
    }
  }, []);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    // Clear unread count when selecting a chat
    setConversations(prevConversations => 
      prevConversations.map(conv => 
        conv.id === chat.id ? { ...conv, unread: 0 } : conv
      )
    );
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newMessageObj = {
      id: Date.now(),
      sender: 'You',
      content: newMessage,
      timestamp: currentTime,
      isSender: true
    };

    // Add new message to chat history
    setAllMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...prev[selectedChat.id], newMessageObj]
    }));

    // Update the conversation preview with the new message
    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedChat.id) {
        return {
          ...conv,
          lastMessage: newMessage,
          timestamp: 'Just now'
        };
      }
      return conv;
    });
  
    setNewMessage('');
  };

  // Get messages for selected chat
  const currentMessages = selectedChat ? allMessages[selectedChat.id] : [];

  return (
    <>
      <Helmet>
        <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
      </Helmet>
      
      <div className="flex h-[calc(100vh-64px)] relative">
        {/* Conversations Sidebar */}
        <div className="w-80 border-r bg-white flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="overflow-y-auto flex-1">
            {conversations.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
                className={`p-4 flex items-center space-x-3 hover:bg-gray-50 cursor-pointer ${
                  selectedChat?.id === chat.id ? 'bg-gray-50' : ''
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={chat.user.avatar}
                    alt={chat.user.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/40x40';
                    }}
                  />
                  {chat.user.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold truncate">{chat.user.name}</h3>
                    <span className="text-sm text-gray-500">{chat.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                    {chat.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedChat ? (
          <div className="flex-1 flex flex-col bg-gray-50">
            {/* Chat Header */}
            <div className="p-4 border-b bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={selectedChat.user.avatar}
                    alt={selectedChat.user.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/40x40';
                    }}
                  />
                  {selectedChat.user.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedChat.user.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedChat.user.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-700">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <Video className="w-5 h-5" />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                  <Info className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isSender ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.isSender
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-800'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.isSender ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">Select a conversation to start messaging</p>
          </div>
        )}

        {/* Dialogflow Chatbot */}
        <df-messenger
          intent="WELCOME"
          chat-title="FitGuide"
          agent-id="e657062c-505d-49ed-a665-4d05053ee8cf"
          language-code="en"
          chat-icon="https://cdn-icons-png.flaticon.com/512/8649/8649595.png"
          wait-open="true"
          expand="true"
        ></df-messenger>

        {/* Add custom styles for the chatbot */}
        <style>
          {`
            df-messenger {
              z-index: 999;
              position: fixed;
              bottom: 20px;
              right: 20px;
            }

            df-messenger-chat {
              width: 350px !important;
              height: 450px !important;
            }
          `}
        </style>
      </div>
    </>
  );
}

export default MessagesPage;