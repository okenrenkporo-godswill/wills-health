"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";

const Notifications = () => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Notifications</h3>
          <Bell className="text-gray-500 w-5 h-5" />
        </div>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>🧪 Lab result ready for John Doe</li>
          <li>📅 Appointment with Sarah at 2PM</li>
          <li>💡 New AI insight available</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default Notifications;
