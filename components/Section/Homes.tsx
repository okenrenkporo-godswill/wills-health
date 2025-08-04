"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, CalendarCheck, HeartPulse } from "lucide-react";
import QuickStats from "./QuickStats";
import Notifications from "./Notifications";
import Appointments from "./Appointments";
import HealthTip from "./HealthTip";

const sliderItems = [
  {
    icon: <Bell className="text-blue-300 w-5 h-5" />,
    component: <Notifications />,
  },
  {
    icon: <CalendarCheck className="text-green-300 w-5 h-5" />,
    component: <Appointments />,
  },
  {
    icon: <HeartPulse className="text-pink-300 w-5 h-5" />,
    component: <HealthTip />,
  },
];

const Homes = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderItems.length);
    }, 10000); // Change every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative bg-gradient-to-b from-black via-gray-800 to-white min-h-screen px-4 py-6 md:px-8 md:py-10 overflow-hidden text-white">
        {/* Floating Welcome Box */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute top-4 left-4 right-4 mx-auto bg-black/60 backdrop-blur-md shadow-xl rounded-xl p-4 flex items-center gap-4 z-10 md:hidden"
        ></motion.div>

        <div className="h-20" />

        {/* Image Slider (mobile only) */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="md:hidden mb-6"
        ></motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <QuickStats />
        </motion.div>

        {/* Mobile Slider for Notifications, Appointments, HealthTip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:hidden mb-6"
        >
          <motion.div
            key={currentSlide}
            className="rounded-xlshadow-lg p-4 flex items-start gap-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {sliderItems[currentSlide].icon}
            </motion.div>
            {sliderItems[currentSlide].component}
          </motion.div>
        </motion.div>

        {/* Desktop View – Grid Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:grid md:grid-cols-2 md:gap-4 mb-6"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-xl bg-white/10 backdrop-blur-md shadow-lg p-4 flex items-start gap-3 w-full"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Bell className="text-blue-300 w-5 h-5" />
            </motion.div>
            <Notifications />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-xl bg-white/10 backdrop-blur-md shadow-lg p-4 flex items-start gap-3 w-full"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <CalendarCheck className="text-green-300 w-5 h-5" />
            </motion.div>
            <Appointments />
          </motion.div>
        </motion.div>

        {/* Health Tip (desktop only) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="hidden md:flex rounded-xl bg-white/10 backdrop-blur-md shadow-md p-4 items-start gap-3"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <HeartPulse className="text-pink-300 w-5 h-5" />
          </motion.div>
          <HealthTip />
        </motion.div>
      </div>
    </>
  );
};

export default Homes;
