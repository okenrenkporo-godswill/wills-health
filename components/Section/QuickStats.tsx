"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarCheck, FlaskConical, HeartPulse } from "lucide-react";

const stats = [
  {
    icon: <CalendarCheck className="text-blue-600 w-8 h-8" />,
    title: "Appointments",
    value: "12 Today",
  },
  {
    icon: <FlaskConical className="text-green-600 w-8 h-8" />,
    title: "Lab Results",
    value: "7 Pending",
  },
  {
    icon: <HeartPulse className="text-red-600 w-8 h-8" />,
    title: "AI Analysis",
    value: "5 Reviewed",
  },
];

const QuickStats = () => {
  return (
    <div className="flex flex-row flex-wrap md:flex-nowrap gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="flex-1 min-w-[10rem] bg-white shadow-md hover:shadow-lg transition-all"
        >
          <CardContent className="flex items-center gap-4 p-6">
            {stat.icon}
            <div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h2 className="text-xl font-semibold text-gray-800">
                {stat.value}
              </h2>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;
