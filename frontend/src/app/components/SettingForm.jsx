"use client";

import { useState } from "react";

export default function SettingsForm() {
  const [settings, setSettings] = useState({
    notifications: true,
    reminders: true,
    dataSharing: false,
  });

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <div className="flex items-center justify-between">
        <label htmlFor="notifications" className="font-medium text-gray-700">
          Enable Notifications
        </label>
        <input
          type="checkbox"
          id="notifications"
          name="notifications"
          checked={settings.notifications}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="reminders" className="font-medium text-gray-700">
          Enable Reminders
        </label>
        <input
          type="checkbox"
          id="reminders"
          name="reminders"
          checked={settings.reminders}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
      </div>
      <div className="flex items-center justify-between">
        <label htmlFor="dataSharing" className="font-medium text-gray-700">
          Allow Data Sharing
        </label>
        <input
          type="checkbox"
          id="dataSharing"
          name="dataSharing"
          checked={settings.dataSharing}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
      >
        Save Settings
      </button>
    </form>
  );
}
