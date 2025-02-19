"use client";

import { motion } from "framer-motion";
import ReportList from "@/components/ReportList";
import { FaFileMedical } from "react-icons/fa";

export default function Reports() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen p-10 bg-gradient-to-br from-blue-500 via-blue-300 to-purple-400 dark:from-gray-800 dark:to-gray-900"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
            <span className="flex justify-center items-center gap-3">
              <FaFileMedical className="text-6xl text-white drop-shadow-xl" />
              Health Reports
            </span>
          </h1>
          <p className="text-lg text-gray-200 mt-3">
            View and manage your medical reports effortlessly.
          </p>
        </div>

        {/* Content Box */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 border border-gray-300 dark:border-gray-800 transition-all duration-300"
        >
          <ReportList />
        </motion.div>
      </div>
    </motion.div>
  );
}
