"use client";

import { SignIn } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  // Show a loading spinner while authentication state is being checked
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // Redirect signed-in users to the dashboard
  if (isSignedIn) {
    router.push("/dashboard");
    return null; // Prevent rendering anything while redirecting
  }

  // Show the SignIn component for signed-out users
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn
        routing="hash"
        appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            card: "bg-white shadow-lg rounded-lg p-4",
            headerTitle: "text-2xl font-bold text-blue-600",
            headerSubtitle: "text-gray-600",
            socialButtons: "space-y-4",
            socialButton: "border border-gray-300 hover:bg-gray-50",
            formFieldInput: "border border-gray-300 rounded-md p-2",
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
            footerActionText: "text-gray-600",
            footerActionLink: "text-blue-600 hover:text-blue-700",
          },
        }}
      />
    </div>
  );
}
