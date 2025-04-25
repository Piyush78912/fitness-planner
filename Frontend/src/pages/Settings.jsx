import React, { useState } from "react";

const Settings = () => {
  const [username, setUsername] = useState("Piyush Khatri");
  const [email, setEmail] = useState("piyush@example.com");
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState(true);

  const handleSaveChanges = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Settings</h2>

      {/* Profile Settings */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Password Update */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Notifications Toggle */}
      <div className="mb-6 flex items-center">
        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
          className="h-5 w-5 text-blue-600"
        />
        <label className="ml-2 text-gray-700">Enable Notifications</label>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSaveChanges}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Settings;
