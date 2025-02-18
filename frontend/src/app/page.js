"use client";

import { SignIn } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  // Show a loading spinner while authentication state is being checked
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen bg-background">
        <Loader className="w-8 h-8 animate-spin text-primary" />
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
    <div className="flex justify-center items-center h-screen bg-background">
      <SignIn
        routing="hash"
        appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            card: "bg-white shadow-lg rounded-lg",
            headerTitle: "text-2xl font-bold text-primary",
            headerSubtitle: "text-secondary",
            socialButtons: "space-y-4",
            socialButton: "border border-gray-300 hover:bg-gray-50",
            formFieldInput: "border border-gray-300 rounded-md p-2",
            formButtonPrimary: "bg-primary hover:bg-primary-dark text-white",
            footerActionText: "text-secondary",
            footerActionLink: "text-primary hover:text-primary-dark",
          },
        }}
      />
    </div>
  );
}