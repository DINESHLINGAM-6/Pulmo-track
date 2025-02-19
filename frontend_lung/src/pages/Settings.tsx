import React from "react";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { User, Bell, Shield, Smartphone } from "lucide-react";

const Settings = () => {
  const sections = [
    {
      icon: User,
      title: "Profile Settings",
      description: "Update your personal information",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Manage your notification preferences",
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Control your privacy settings",
    },
    {
      icon: Smartphone,
      title: "Connected Devices",
      description: "Manage your connected health devices",
    },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences</p>
      </header>

      <div className="grid gap-6">
        {sections.map((section) => (
          <Card
            key={section.title}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{section.title}</h3>
                  <p className="text-gray-600">{section.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Settings;
