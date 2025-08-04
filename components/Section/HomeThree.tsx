"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Apple,
  Dumbbell,
  BedDouble,
  ChevronDown,
  ChevronUp,
  Syringe,
  Clock,
} from "lucide-react";

const HomeThree = () => {
  const [showPrograms, setShowPrograms] = useState(false);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="bg-gradient-to-br from-blue-50 to-white shadow-xl border border-gray-200 rounded-3xl">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-800">
                Health Programs
              </h2>
              <p className="text-sm text-gray-600">
                Boost lifestyle with guided routines
              </p>
            </div>
            <Dumbbell className="w-10 h-10 text-purple-600" />
          </div>

          {/* Featured Programs */}
          <div className="flex items-center space-x-3 bg-green-50 p-3 rounded-lg shadow-sm">
            <Apple className="w-6 h-6 text-green-600" />
            <p className="text-gray-800 font-medium">Nutrition Coaching</p>
          </div>

          <div className="flex items-center space-x-3 bg-yellow-50 p-3 rounded-lg shadow-sm">
            <BedDouble className="w-6 h-6 text-yellow-600" />
            <p className="text-gray-800 font-medium">Sleep Tracking</p>
          </div>

          {/* Expandable Section */}
          <div className="space-y-2">
            <div
              onClick={() => setShowPrograms(!showPrograms)}
              className="flex items-center justify-between bg-white px-4 py-3 border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition"
            >
              <span className="text-gray-800 font-semibold">Show Details</span>
              {showPrograms ? <ChevronUp /> : <ChevronDown />}
            </div>

            <AnimatePresence>
              {showPrograms && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden pl-2 pr-2"
                >
                  <div className="flex items-center justify-between text-gray-700 py-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>Daily Exercise</span>
                    </div>
                    <span className="font-medium">30 mins/day</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-700 py-2">
                    <div className="flex items-center space-x-2">
                      <Syringe className="w-4 h-4 text-red-600" />
                      <span>Vaccination Plan</span>
                    </div>
                    <span className="font-medium">Up-to-date</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Button */}
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-xl">
            Enroll in Health Program
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HomeThree;
