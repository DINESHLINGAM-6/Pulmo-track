"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    reminders: true,
  });

  const handleToggle = (field) => {
    setSettings((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Settings</h2>
      <div className="bg-white rounded shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700">Enable Notifications</span>
          <button
            onClick={() => handleToggle("notifications")}
            className={`px-4 py-2 rounded ${settings.notifications ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
          >
            {settings.notifications ? "On" : "Off"}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-700">Enable Reminders</span>
          <button
            onClick={() => handleToggle("reminders")}
            className={`px-4 py-2 rounded ${settings.reminders ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
          >
            {settings.reminders ? "On" : "Off"}
          </button>
        </div>
      </div>
    </div>
  );
}
