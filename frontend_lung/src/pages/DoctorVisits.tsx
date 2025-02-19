import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Calendar, Clock, Hospital } from "lucide-react";
import { format } from "date-fns";
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../services/api';
import { queryClient } from '../lib/react-query';

const DoctorVisits = () => {
  const { data: visits, isLoading } = useQuery({
    queryKey: ['visits'],
    queryFn: () => api.get('/visits').then(res => res.data)
  });

  const scheduleMutation = useMutation({
    mutationFn: (visitData) => api.post('/visits/schedule', visitData),
    onSuccess: () => {
      // Refresh visits data
      queryClient.invalidateQueries({ queryKey: ['visits'] });
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctor Visits</h1>
          <p className="text-gray-600">
            Track your medical appointments and consultations
          </p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
          Schedule Visit
        </button>
      </header>

      <div className="grid gap-6">
        {visits?.map((visit) => (
          <Card key={visit.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Hospital className="text-primary h-5 w-5" />
                    <h3 className="font-semibold text-lg">{visit.doctor}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{format(visit.date, "PP")}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{format(visit.date, "p")}</span>
                    </div>
                  </div>
                  <p className="text-gray-600">{visit.summary}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm font-medium">
                  {visit.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DoctorVisits;
