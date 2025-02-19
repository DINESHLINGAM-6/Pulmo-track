import { Activity, Heart, Droplets, Wind, CheckCircle2 } from "lucide-react";
import { PollutionAlert } from "../components/dashboard/PollutionAlert";
import { HealthMetrics } from "../components/dashboard/HealthMetrics";
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

const Index = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => api.get('/dashboard/metrics').then(res => res.data)
  });

  if (isLoading) return <div>Loading...</div>;

  const { healthMetrics, dailyMissions } = data || {
    healthMetrics: [],
    dailyMissions: []
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, Sarah
        </h1>
        <p className="text-gray-600">Here's your health overview for today</p>
      </header>
      {/* Pollution Alert Section */}
      <div className="mb-6">
        <PollutionAlert />
      </div>

      {/* Health Metrics Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Health Metrics</h2>
        <HealthMetrics />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthMetrics.map((metric) => (
          <div
            key={metric.name}
            className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">{metric.name}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
              </div>
              <metric.icon
                className={`w-6 h-6 ${metric.color} group-hover:scale-110 transition-transform`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Health Trends</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Charts will be implemented in the next iteration
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">
            Today's Health Missions
          </h2>
          <div className="space-y-4">
            {dailyMissions.map((mission, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CheckCircle2
                  className={`w-5 h-5 ${
                    mission.completed ? "text-green-500" : "text-gray-300"
                  }`}
                />
                <span
                  className={`${
                    mission.completed
                      ? "text-gray-400 line-through"
                      : "text-gray-700"
                  }`}
                >
                  {mission.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
