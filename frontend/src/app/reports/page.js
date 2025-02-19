"use client";

import { useState } from "react";

export default function ReportsPage() {
  const [reports, setReports] = useState([
    { id: 1, title: "Visit Report - 2023-01-15", content: "Summary of doctor visit and recommendations." },
    { id: 2, title: "Visit Report - 2023-02-10", content: "Follow-up visit details and insights." },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Clinical Reports</h2>
      <p className="text-gray-700 mb-6">
        Here you can view your past clinical reports or generate a new one.
      </p>
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="p-4 bg-white rounded shadow">
            <h3 className="text-xl font-semibold text-blue-600">{report.title}</h3>
            <p className="text-gray-600">{report.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
