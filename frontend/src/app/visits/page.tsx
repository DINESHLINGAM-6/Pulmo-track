"use client";

import { useState } from "react";
import VisitList from "@/components/VisitList";
import AddVisitForm from "@/components/AddVisitForm";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FiPlus, FiDownload, FiX } from "react-icons/fi";

export default function DoctorVisits() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 flex flex-col items-center">
      {/* Page Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-white drop-shadow-lg"
      >
        Doctor Visits
      </motion.h1>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-6 flex space-x-4"
      >
        {/* Add Visit Button */}
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-5 py-3 text-lg font-medium bg-blue-700 text-white hover:bg-blue-800 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FiPlus className="text-xl" />
          <span>Add New Visit</span>
        </Button>

        {/* Download History Button */}
        <Button
          onClick={() => alert("Downloading Visit History...")}
          className="flex items-center space-x-2 px-5 py-3 text-lg font-medium bg-green-700 text-white hover:bg-green-800 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <FiDownload className="text-xl" />
          <span>Download History</span>
        </Button>
      </motion.div>

      {/* Visit List Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-8 w-full max-w-4xl"
      >
        <div className="backdrop-blur-md bg-white/30 p-6 rounded-2xl shadow-xl border border-white/20">
          <VisitList />
        </div>
      </motion.div>

      {/* Modal for Adding a New Visit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-2xl w-96 relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition"
            >
              <FiX className="text-2xl" />
            </button>
            <h2 className="text-xl font-bold text-gray-700 mb-4">Add New Visit</h2>
            <AddVisitForm />
          </motion.div>
        </div>
      )}
    </div>
  );
}
