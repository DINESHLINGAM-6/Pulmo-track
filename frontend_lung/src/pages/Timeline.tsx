import React from "react";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Circle } from "lucide-react";
import { format } from "date-fns";

const Timeline = () => {
  const events = [
    {
      id: 1,
      date: new Date(),
      title: "Doctor Visit",
      description: "Regular checkup with Dr. Smith",
      type: "visit",
    },
    {
      id: 2,
      date: new Date(Date.now() - 86400000),
      title: "Lung Function Test",
      description: "SpO2 levels normal",
      type: "test",
    },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Health Timeline</h1>
        <p className="text-gray-600">Track your health journey</p>
      </header>

      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200" />
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event.id} className="relative pl-10">
              <Circle className="absolute left-2 -translate-x-1/2 w-5 h-5 text-primary fill-white" />
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {format(event.date, "PPp")}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-sm">
                        {event.type}
                      </span>
                    </div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
