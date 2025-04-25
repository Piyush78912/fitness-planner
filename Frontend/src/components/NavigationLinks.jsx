import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationLinks = () => {
  const location = useLocation();
  const links = ['Workout', 'Feed', 'Messages', 'HandBook'];

  return (
    <div className="hidden sm:flex flex-1 justify-center">
      <div className="flex space-x-4">
        {links.map((link) => (
          <Link
            key={link}
            to={`/${link.toLowerCase()}`}
            className={`rounded-md px-3 py-2 text-sm font-medium no-underline transition-colors ${
              location.pathname === `/${link.toLowerCase()}` 
                ? 'bg-gray-900 text-white' 
                : 'hover:bg-gray-700 text-white'
            }`}
          >
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavigationLinks; 