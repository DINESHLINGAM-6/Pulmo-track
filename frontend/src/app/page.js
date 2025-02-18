"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  const { isSignedIn } = useAuth();

  // If the user is not signed in, show the SignIn component
  if (!isSignedIn) {
    return <SignIn routing="hash" />;
  }

  // If the user is signed in, show a placeholder until Onboarding is created
  return <div>Welcome! Onboarding component will be added soon.</div>;
}
