"use client";

import { motion } from "framer-motion";
import { FaUserMd, FaStickyNote, FaCalendarAlt } from "react-icons/fa";

export default function VisitList() {
  // Mock data - replace with actual data fetching logic
  const visits = [
    { id: 1, date: "2023-05-01", doctor: "Dr. Smith", notes: "Regular checkup" },
    { id: 2, date: "2023-04-15", doctor: "Dr. Johnson", notes: "Follow-up appointment" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Past Visits</h2>

      {visits.map((visit) => (
        <motion.div
          key={visit.id}
          whileHover={{ scale: 1.05 }}
          className="bg-white/50 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 hover:border-blue-500 transition cursor-pointer"
        >
          <div className="flex items-center space-x-3">
            <FaCalendarAlt className="text-xl text-blue-600" />
            <p className="font-semibold text-lg">{visit.date}</p>
          </div>
          <div className="flex items-center space-x-3 mt-2">
            <FaUserMd className="text-xl text-green-600" />
            <p className="text-gray-800 font-medium">{visit.doctor}</p>
          </div>
          <div className="flex items-center space-x-3 mt-2">
            <FaStickyNote className="text-xl text-yellow-600" />
            <p className="text-gray-600">{visit.notes}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
