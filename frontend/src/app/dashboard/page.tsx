import DashboardCard from "@/components/DashboardCard";
import { FaHeartbeat, FaLungs, FaCalendarAlt, FaUpload, FaChartLine, FaRobot } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 p-8 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-white drop-shadow-md mb-6">
        Lung Health Dashboard 🫁
      </h1>

      <p className="text-lg text-white mb-8 opacity-90">
        Track your lung health, doctor visits, and progress.
      </p>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        <DashboardCard
          title="SpO₂ Levels"
          value="98%"
          icon={<FaHeartbeat className="text-4xl text-red-400" />}
          trend="up"
          trendValue="2%"
          trendText="from last week"
        />
        <DashboardCard
          title="Cough Count"
          value="5"
          icon={<FaLungs className="text-4xl text-blue-300" />}
          trend="down"
          trendValue="3"
          trendText="from last week"
        />
        <DashboardCard
          title="Next Doctor Visit"
          value="May 15, 2023"
          icon={<FaCalendarAlt className="text-4xl text-green-400" />}
          trend="static"
          trendText="No change"
        />
      </div>

      {/* Action Buttons */}
      <div className="mt-12 flex flex-wrap gap-6">
        <button className="flex items-center px-6 py-3 bg-white/30 backdrop-blur-md text-white font-bold text-lg rounded-full shadow-lg hover:bg-white/50 transition-all">
          <FaUpload className="mr-2 text-xl" /> Upload Reports
        </button>
        <button className="flex items-center px-6 py-3 bg-white/30 backdrop-blur-md text-white font-bold text-lg rounded-full shadow-lg hover:bg-white/50 transition-all">
          <FaChartLine className="mr-2 text-xl" /> Track Progress
        </button>
        <button className="flex items-center px-6 py-3 bg-white/30 backdrop-blur-md text-white font-bold text-lg rounded-full shadow-lg hover:bg-white/50 transition-all">
          <FaRobot className="mr-2 text-xl" /> Consult AI Assistant
        </button>
      </div>
    </div>
  );
}
