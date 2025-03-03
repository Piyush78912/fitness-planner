import React, { useState } from 'react';
import { Search, Send, Phone, Video, Info } from 'lucide-react';

function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: '/api/placeholder/40/40',
        online: true
      },
      lastMessage: 'Great workout today! Thanks for the tips!',
      timestamp: '2m ago',
      unread: 2
    },
    {
      id: 2,
      user: {
        name: 'Mike Chen',
        avatar: '/api/placeholder/40/40',
        online: false
      },
      lastMessage: 'See you at tomorrow\'s session',
      timestamp: '1h ago',
      unread: 0
    }
  ];

  const messages = [
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
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Handle sending message
    setNewMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r bg-white">
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="overflow-y-auto h-full">
          {conversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 flex items-center space-x-3 hover:bg-gray-50 cursor-pointer ${
                selectedChat?.id === chat.id ? 'bg-gray-50' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={chat.user.avatar}
                  alt={chat.user.name}
                  className="w-12 h-12 rounded-full"
                />
                {chat.user.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{chat.user.name}</h3>
                  <span className="text-sm text-gray-500">{chat.timestamp}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
              <img
                src={selectedChat.user.avatar}
                alt={selectedChat.user.name}
                className="w-10 h-10 rounded-full"
              />
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
            {messages.map((message) => (
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
    </div>
  );
}

export default MessagesPage;