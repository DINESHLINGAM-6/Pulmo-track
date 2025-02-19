"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Switch } from "@headlessui/react";
import { toast } from "react-hot-toast";

export default function SettingsForm() {
  const [settings, setSettings] = useState<{
    notifications: boolean;
    reminders: boolean;
    dataSharing: boolean;
  }>({
    notifications: true,
    reminders: true,
    dataSharing: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key], // Ensure toggling works correctly
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully! ✅");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 backdrop-blur-md space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 text-center">
        Account Settings ⚙️
      </h2>

      <div className="space-y-4">
        {/* Toggle Options */}
        {(["notifications", "reminders", "dataSharing"] as const).map((key) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {key === "notifications"
                ? "Enable Notifications"
                : key === "reminders"
                ? "Enable Reminders"
                : "Allow Data Sharing"}
            </span>
            <Switch
              checked={settings[key]}
              onChange={() => handleToggle(key)}
              className={`${
                settings[key] ? "bg-blue-600" : "bg-gray-400"
              } relative inline-flex h-6 w-11 items-center rounded-full transition duration-300`}
            >
              <span
                className={`${
                  settings[key] ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform bg-white rounded-full transition duration-300`}
              />
            </Switch>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Save Settings 💾
      </button>
    </motion.form>
  );
}
