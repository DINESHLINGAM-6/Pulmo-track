"use client";

import { useState } from "react";
import type React from "react";
import { motion } from "framer-motion";
import { FiUpload, FiCheckCircle } from "react-icons/fi";

export default function AddVisitForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Visit added successfully!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white/50 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20 space-y-4 w-full max-w-md"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Add New Visit</h2>

      {/* Date Input */}
      <div>
        <label className="block text-gray-700 font-medium">Visit Date</label>
        <input
          type="date"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Doctor/Clinic Name */}
      <div>
        <label className="block text-gray-700 font-medium">Doctor/Clinic Name</label>
        <input
          type="text"
          placeholder="Enter doctor or clinic name"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-gray-700 font-medium">Notes</label>
        <textarea
          placeholder="Add any notes about this visit..."
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        ></textarea>
      </div>

      {/* File Upload */}
      <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center cursor-pointer hover:border-blue-500 transition">
        <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
        <label htmlFor="file-upload" className="cursor-pointer">
          {selectedFile ? (
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <FiCheckCircle className="text-xl" />
              <span>{selectedFile.name}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <FiUpload className="text-xl" />
              <span>Upload Medical Report</span>
            </div>
          )}
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 font-medium text-lg"
      >
        Add Visit
      </button>
    </motion.form>
  );
}
