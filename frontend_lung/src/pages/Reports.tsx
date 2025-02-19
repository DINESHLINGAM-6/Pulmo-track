import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { FileText, Download, Calendar } from "lucide-react";
import { format } from "date-fns";
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../services/api';

const Reports = () => {
  const { data: reports, isLoading } = useQuery({
    queryKey: ['reports'],
    queryFn: () => api.get('/reports').then(res => res.data)
  });

  const uploadMutation = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      return api.post('/reports/upload', formData);
    }
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medical Reports</h1>
          <p className="text-gray-600">
            Access all your medical reports and test results
          </p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
          Upload Report
        </button>
      </header>

      <div className="grid gap-6">
        {reports?.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="text-primary h-5 w-5" />
                    <h3 className="font-semibold text-lg">{report.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{format(report.date, "PP")}</span>
                    </div>
                    <span>•</span>
                    <span>{report.type}</span>
                    <span>•</span>
                    <span>{report.fileSize}</span>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Download className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;
