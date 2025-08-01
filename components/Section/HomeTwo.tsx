"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HeartPulse,
  Brain,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Activity,
  Weight,
  History,
} from "lucide-react";

const HomeTwo = () => {
  const [showVitals, setShowVitals] = useState(false);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="bg-gradient-to-br from-white to-blue-50 shadow-xl border border-gray-200 rounded-3xl">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-800">Wellness</h2>
              <p className="text-sm text-gray-600">
                Track & improve patient wellbeing
              </p>
            </div>
            <HeartPulse className="w-10 h-10 text-red-500" />
          </div>

          {/* Mental Health */}
          <div className="flex items-center space-x-3 bg-indigo-50 p-3 rounded-lg shadow-sm">
            <Brain className="w-6 h-6 text-indigo-600" />
            <p className="text-gray-800 font-medium">Mental Health Support</p>
          </div>

          {/* Patient History */}
          <div className="flex items-center space-x-2 cursor-pointer text-blue-700 hover:underline">
            <History className="w-5 h-5" />
            <span className="text-sm font-medium">See Patient History</span>
          </div>

          {/* Vitals Dropdown */}
          <div className="space-y-2">
            <div
              onClick={() => setShowVitals(!showVitals)}
              className="flex items-center justify-between bg-white px-4 py-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition"
            >
              <span className="text-gray-800 font-semibold">See Vitals</span>
              {showVitals ? <ChevronUp /> : <ChevronDown />}
            </div>

            <AnimatePresence>
              {showVitals && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden pl-2 pr-2"
                >
                  <div className="flex items-center justify-between text-gray-700 py-2">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-red-600" />
                      <span>Blood Pressure</span>
                    </div>
                    <span className="font-medium">120/80 mmHg</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700 py-2">
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="w-4 h-4 text-green-600" />
                      <span>Blood Sugar</span>
                    </div>
                    <span className="font-medium">95 mg/dL</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700 py-2">
                    <div className="flex items-center space-x-2">
                      <Weight className="w-4 h-4 text-blue-600" />
                      <span>Weight</span>
                    </div>
                    <span className="font-medium">70 kg</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Button */}
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl">
            Book Wellness Appointment
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HomeTwo;
