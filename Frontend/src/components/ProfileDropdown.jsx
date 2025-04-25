import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = ({ profileImage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (err) {
        console.error('Error parsing user data from localStorage:', err);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const handleItemClick = (path) => (e) => {
    e.stopPropagation();
    setIsOpen(false);
    navigate(path);
  };

  // Get user's name for display
  const displayName = user?.fullName || (user?.firstName && user?.lastName 
    ? `${user.firstName} ${user.lastName}` 
    : user?.firstName || user?.email || 'User');

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center space-x-2 rounded-full bg-gray-800 p-1 focus:ring-2 focus:ring-white"
      >
        <img 
          className="h-8 w-8 rounded-full object-cover" 
          src={profileImage} 
          alt="Profile" 
        />
        <span className="text-white text-sm hidden md:block pr-2">{displayName}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{displayName}</p>
            {user?.email && <p className="text-sm text-gray-500">{user.email}</p>}
          </div>
          <div className="py-1">
            <div
              onClick={handleItemClick('/profile')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Your Profile
            </div>
            <div
              onClick={handleItemClick('/settings')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Settings
            </div>
            <div
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer border-t border-gray-100"
            >
              Sign out
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown; 