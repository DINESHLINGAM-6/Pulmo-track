import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string;
  icon: ReactNode; // Allow JSX elements
  trend: "up" | "down" | "static";
  trendValue?: string;
  trendText?: string;
}

export default function DashboardCard({
  title,
  value,
  icon,
  trend,
  trendValue,
  trendText,
}: DashboardCardProps) {
  const trendColor = {
    up: "text-green-500",
    down: "text-red-500",
    static: "text-gray-500",
  }[trend];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-gray-400">{icon}</div>
      </div>
      {trendText && (
        <div className="mt-4 flex items-center space-x-2">
          <span className={`text-sm ${trendColor}`}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
          </span>
          <span className="text-sm text-gray-500">{trendText}</span>
        </div>
      )}
    </div>
  );
}