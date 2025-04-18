import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication state and any user data
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('email');
    
    // Any other cleanup needed
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center text-white hover:text-gray-200"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 mr-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
        />
      </svg>
      Logout
    </button>
  );
};

export default LogoutButton;