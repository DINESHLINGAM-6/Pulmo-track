"use client";
import { useAppContext } from '../context/AppContext';

export default function Reports() {
  const { reports } = useAppContext();

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg min-h-screen w-full max-w-4xl mx-auto overflow-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-primary">Clinical Documentation</h1>
      {reports.length === 0 ? (
        <p className="text-center text-gray-600">No reports uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {reports.map((report, index) => (
            <li key={index} className="border p-4 rounded-lg shadow-md bg-gray-50">
              <h2 className="text-xl font-semibold">{report.name}</h2>
              <p className="text-sm text-gray-500">Uploaded on: {report.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}