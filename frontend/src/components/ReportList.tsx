"use client";

import { motion } from "framer-motion";
import { FaFileAlt, FaDownload, FaEye } from "react-icons/fa";

export default function ReportList() {
  // Mock data - replace with actual data fetching logic
  const reports = [
    { id: 1, title: "Monthly Progress Report", date: "2023-05-01" },
    { id: 2, title: "Quarterly Health Summary", date: "2023-04-01" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Health Reports</h2>

      {reports.map((report) => (
        <motion.div
          key={report.id}
          whileHover={{ scale: 1.05 }}
          className="bg-white/50 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 hover:border-blue-500 transition cursor-pointer flex justify-between items-center"
        >
          <div className="flex items-center space-x-4">
            <FaFileAlt className="text-2xl text-blue-600" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{report.title}</h3>
              <p className="text-gray-600">{report.date}</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition duration-300">
              <FaEye /> View
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700 transition duration-300">
              <FaDownload /> Download
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
