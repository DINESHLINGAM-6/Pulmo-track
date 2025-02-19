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
      [key]: !prev[key],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("✅ Settings saved successfully!");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white/20 dark:bg-gray-900/50 p-8 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700 backdrop-blur-lg space-y-8 max-w-lg mx-auto"
    >
      {/* Title */}
      <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 text-center flex items-center justify-center gap-2">
        ⚙️ Account Settings
      </h2>

      {/* Settings Options */}
      <div className="space-y-6">
        {[
          { key: "notifications", label: "Enable Notifications" },
          { key: "reminders", label: "Enable Reminders" },
          { key: "dataSharing", label: "Allow Data Sharing" },
        ].map(({ key, label }) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-between bg-white/10 dark:bg-gray-800 p-4 rounded-xl border border-gray-300/50 dark:border-gray-700 shadow-md"
          >
            <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
              {label}
            </span>
            <Switch
              checked={settings[key as keyof typeof settings]}
              onChange={() => handleToggle(key as keyof typeof settings)}
              className={`${
                settings[key as keyof typeof settings] ? "bg-blue-600" : "bg-gray-400"
              } relative inline-flex h-7 w-14 items-center rounded-full transition duration-300`}
            >
              <span
                className={`${
                  settings[key as keyof typeof settings] ? "translate-x-7" : "translate-x-1"
                } inline-block h-5 w-5 transform bg-white rounded-full transition`}
              />
            </Switch>
          </motion.div>
        ))}
      </div>

      {/* Save Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
      >
        💾 Save Settings
      </motion.button>
    </motion.form>
  );
}
