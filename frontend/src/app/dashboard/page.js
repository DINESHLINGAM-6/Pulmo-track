"use client";

import Link from 'next/link';
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isSignedIn) {
    router.push("/");
    return null;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Dashboard</h2>
      <p className="text-lg text-gray-700 mb-4">
        Welcome to your personalized dashboard.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/doctor-visits" className="p-4 bg-white rounded shadow hover:shadow-lg">
          <h3 className="text-xl font-semibold text-blue-600">Doctor Visits</h3>
          <p className="text-gray-600">View and add your doctor visit details.</p>
        </Link>
        <Link href="/reports" className="p-4 bg-white rounded shadow hover:shadow-lg">
          <h3 className="text-xl font-semibold text-blue-600">Reports</h3>
          <p className="text-gray-600">Generate and view your clinical reports.</p>
        </Link>
        <Link href="/patient-demographics" className="p-4 bg-white rounded shadow hover:shadow-lg">
          <h3 className="text-xl font-semibold text-blue-600">Patient Demographics</h3>
          <p className="text-gray-600">Update your personal and health details.</p>
        </Link>
        <Link href="/settings" className="p-4 bg-white rounded shadow hover:shadow-lg">
          <h3 className="text-xl font-semibold text-blue-600">Settings</h3>
          <p className="text-gray-600">Manage your account settings.</p>
        </Link>
      </div>
    </div>
  );
}
