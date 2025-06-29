import { Calculator } from 'lucide-react';
import React, { useState } from 'react';
import sample from "../assets/sample.png";
import BMICalculatorModal from '../components/BMICalculatorModal';
import NavigationLinks from '../components/NavigationLinks';
import ProfileDropdown from '../components/ProfileDropdown';

function Header() {
  const [isBMIModalOpen, setIsBMIModalOpen] = useState(false);

  return (
    <nav className="bg-red-500/90 sticky top-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Simple Heart with Pulse Icon */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-white rounded-full p-2 shadow-sm">
                <svg 
                  width="28" 
                  height="28"
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Simple Heart Icon */}
                  <path 
                    d="M12 6C12 6 9 3 5.5 3C2 3 2 6.5 2 6.5C2 9.5 3.5 11.5 5.5 13.5C7.5 15.5 12 19 12 19C12 19 16.5 15.5 18.5 13.5C20.5 11.5 22 9.5 22 6.5C22 6.5 22 3 18.5 3C15 3 12 6 12 6Z" 
                    fill="#ef4444" 
                    stroke="#ef4444" 
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="text-white font-bold text-xl">FitPlanner</span>
            </div>
          </div>

          {/* Navigation Links */}
          <NavigationLinks />

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* BMI Calculator Button */}
            <button
              onClick={() => setIsBMIModalOpen(true)}
              className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
            >
              <Calculator className="h-5 w-5" />
              <span className="hidden md:inline">BMI Calculator</span>
            </button>

            {/* Profile Dropdown */}
            <ProfileDropdown profileImage={sample} />
          </div>
        </div>
      </div>

      {/* BMI Calculator Modal */}
      <BMICalculatorModal 
        isOpen={isBMIModalOpen} 
        onClose={() => setIsBMIModalOpen(false)} 
      />
    </nav>
  );
}

export default Header;