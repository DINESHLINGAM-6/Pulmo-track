import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Heart, Activity, Moon } from "lucide-react";
import type { HealthMetrics as HealthData } from "../../../services/health/health-type";

export function HealthMetrics() {
  const [metrics, setMetrics] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchDummyData = () => {
      setTimeout(() => {
        const dummyData: HealthData = {
          heartRate: 72,
          steps: 8500,
          oxygenSaturation: 98,
          sleepHours: 7.5,
        };
        setMetrics(dummyData);
        setLoading(false);
      }, 1000);
    };

    fetchDummyData();
    const interval = setInterval(fetchDummyData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return <div className="animate-pulse">Loading health metrics...</div>;
  if (!metrics) return null;

  const healthCards = [
    {
      icon: Heart,
      label: "Heart Rate",
      value: `${metrics.heartRate} bpm`,
      color: "text-red-500",
    },
    {
      icon: Activity,
      label: "Steps",
      value: metrics.steps.toLocaleString(),
      color: "text-blue-500",
    },
    {
      icon: Moon,
      label: "Sleep Hours",
      value: `${metrics.sleepHours} h`,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {healthCards.map((card) => (
        <Card key={card.label}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{card.label}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
