import React, { useState } from 'react';
import { Bell, Menu, Calculator } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from "../assets/logo.jpg";
import sample from "../assets/sample.png";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBMIModalOpen, setIsBMIModalOpen] = useState(false);
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token (or session data)
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
      <nav className="bg-red-500/90 sticky top-0 w-full z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img className="h-14 w-14 object-contain p-1" src={logo} alt="Fitness Logo" />
            </div>

            <div className="hidden sm:flex flex-1 justify-center">
              <div className="flex space-x-4">
                {['Workout', 'Feed', 'Messages', 'HandBook'].map((link) => (
                  <a
                    key={link}
                    href={`/${link.toLowerCase()}`}
                    className={`rounded-md px-3 py-2 text-sm font-medium no-underline transition-colors ${
                      location.pathname === `/${link.toLowerCase()}` ? 'bg-gray-900 text-white' : 'hover:bg-gray-700 text-white'
                    }`}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsBMIModalOpen(true)}
                className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700"
              >
                <Calculator className="h-5 w-5" />
                <span className="hidden md:inline">BMI Calculator</span>
              </button>

              <button type="button" className="relative rounded-full bg-gray-800 p-2 text-white hover:bg-gray-700 focus:ring-2 focus:ring-white">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-red-600 text-xs text-white">
                  1
                </span>
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="relative flex rounded-full bg-gray-800 p-1 focus:ring-2 focus:ring-white"
                >
                  <img className="h-8 w-8 rounded-full object-cover" src={sample} alt="Profile" />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                    <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <a 
                      onClick={handleLogout} 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isBMIModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-[90%]">
            <h2 className="text-xl font-bold mb-4">BMI Calculator</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder={`Enter height in ${heightUnit}`}
                  />
                  <select
                    value={heightUnit}
                    onChange={(e) => setHeightUnit(e.target.value)}
                    className="px-2 py-2 border rounded-md"
                  >
                    <option value="cm">cm</option>
                    <option value="feet">feet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter weight in kg"
                />
              </div>

              <button
                onClick={() => {
                  const heightInMeters = heightUnit === 'feet' ? parseFloat(height) * 0.3048 : parseFloat(height) / 100;
                  if (heightInMeters && weight) {
                    setBMI((parseFloat(weight) / (heightInMeters ** 2)).toFixed(1));
                  }
                }}
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
              >
                Calculate BMI
              </button>

              {bmi && (
                <div className="mt-4">
                  <p className="text-lg">Your BMI: <span className="font-bold">{bmi}</span></p>
                  <p className={`text-lg ${bmi < 18.5 ? 'text-blue-500' : bmi < 24.9 ? 'text-green-500' : bmi < 29.9 ? 'text-yellow-500' : 'text-red-500'}`}>
                    Category: {bmi < 18.5 ? 'Underweight' : bmi < 24.9 ? 'Normal weight' : bmi < 29.9 ? 'Overweight' : 'Obese'}
                  </p>
                </div>
              )}

              <button onClick={() => setIsBMIModalOpen(false)} className="w-full mt-4 bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
