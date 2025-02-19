import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Wind, AlertTriangle } from "lucide-react";
import { getPollutionData } from "../../../services/pollution/pollution-api";
import type { PollutionData } from "../../../services/pollution/pollution-type";

const getAqiStatus = (aqi: number) => {
  if (aqi <= 50)
    return { label: "Good", color: "text-green-500", alert: false };
  if (aqi <= 100)
    return { label: "Moderate", color: "text-yellow-500", alert: true };
  if (aqi <= 150)
    return {
      label: "Unhealthy for Sensitive Groups",
      color: "text-orange-500",
      alert: true,
    };
  if (aqi <= 200)
    return { label: "Unhealthy", color: "text-red-500", alert: true };
  return { label: "Very Unhealthy", color: "text-purple-500", alert: true };
};

export const PollutionAlert = () => {
  const [pollutionData, setPollutionData] = useState<PollutionData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // For demonstration, using a fixed location.
        const lat = 31.2047372;
        const lon = 121.4489017;
        const data = await getPollutionData(lat, lon);
        setPollutionData(data);
      } catch (err) {
        setError("Failed to fetch pollution data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-6">
          <div className="h-20 bg-gray-200 rounded-lg"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!pollutionData) return null;

  const aqiStatus = getAqiStatus(pollutionData.data.aqi);
  const timeString = pollutionData.data.time?.s
    ? new Date(pollutionData.data.time.s).toLocaleString()
    : "N/A";

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Wind className={`h-5 w-5 ${aqiStatus.color}`} />
              <h3 className="text-lg font-semibold">Air Quality Index</h3>
            </div>
            <p className={`text-3xl font-bold mt-2 ${aqiStatus.color}`}>
              {pollutionData.data.aqi}
            </p>
            <p className={`text-sm ${aqiStatus.color}`}>{aqiStatus.label}</p>
            <p className="text-sm text-gray-500 mt-1">{timeString}</p>
          </div>
          {aqiStatus.alert && (
            <div className="bg-red-50 p-3 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
          )}
        </div>
        {aqiStatus.alert && (
          <Alert className="mt-4">
            <AlertDescription>
              Air quality is not optimal. Consider limiting outdoor activities.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
