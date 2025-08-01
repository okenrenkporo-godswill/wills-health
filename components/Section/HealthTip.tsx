"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const HealthTip = () => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          Today's Health Tip
        </h3>
        <p className="text-sm text-gray-700">
          💧 Stay hydrated and encourage your patients to drink at least 8
          glasses of water per day. Proper hydration improves focus and immune
          system strength.
        </p>
        <Button className="mt-4" variant="outline">
          See More Tips
        </Button>
      </CardContent>
    </Card>
  );
};

export default HealthTip;
