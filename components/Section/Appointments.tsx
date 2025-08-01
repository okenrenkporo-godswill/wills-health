"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const Appointments = () => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Upcoming Appointments
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>👩 Jane Smith - 11:00 AM</li>
          <li>👨 Mike Johnson - 1:30 PM</li>
          <li>🧓 Maria Lopez - 3:00 PM</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default Appointments;
