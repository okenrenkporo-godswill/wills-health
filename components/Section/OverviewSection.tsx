"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const labData = [
  { name: "Mon", wbc: 3.2, glucose: 90 },
  { name: "Tue", wbc: 4.5, glucose: 85 },
  { name: "Wed", wbc: 5.1, glucose: 78 },
  { name: "Thu", wbc: 4.8, glucose: 82 },
  { name: "Fri", wbc: 4.2, glucose: 88 },
];

const activityData = [
  { day: "Mon", hours: 4 },
  { day: "Tue", hours: 6 },
  { day: "Wed", hours: 5 },
  { day: "Thu", hours: 7 },
  { day: "Fri", hours: 6 },
];

const OverviewSection = () => {
  return (
    <div className="w-full space-y-12">
      {/* Hero Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-22"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/hero.png"
          alt="Wills Health Overview"
          width={600}
          height={400}
          className="rounded-xl shadow-md"
        />
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-primary">
            Welcome to Wills Health
          </h2>
          <p className="text-gray-700 text-lg">
            Your Health, Powered by Care and Intelligence. Our AI-driven
            services help you make smart decisions and stay healthy—anytime,
            anywhere..
            <br />
            <strong className="text-xl text-primary  ">
              Healing starts here
            </strong>{" "}
            The right answers the first time Effective treatment depends on
            getting the right diagnosis. Our experts diagnose and treat the
            toughest medical challenges.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-22"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="md:order-2 order-1">
          <Image
            src="/surgery.jpg"
            alt="Patient-Centered Innovation"
            width={600}
            height={400}
            className="rounded-xl shadow-md"
          />
        </div>
        <div className="space-y-4 md:order-1 order-2">
          <h2 className="text-4xl font-bold text-blue-800">
            Patient-Centered Innovation
          </h2>
          <p className="text-gray-700 text-lg">
            We believe every patient is unique. Our smart system adapts to your
            needs, tracks progress, and empowers your care team to act fast and
            effectively.
          </p>
        </div>
      </motion.div>
      {/* <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Image
          src="/nurses.png"
          alt="AI Health Insights"
          width={600}
          height={400}
          className="rounded-xl shadow-md"
        />
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-blue-800">
            Your Health, Our Mission
          </h2>
          <p className="text-gray-700 text-lg">
            At <strong>Wills Health Center</strong>, we combine compassion,
            innovation, and data-driven tools to deliver smarter healthcare.
            With real-time monitoring, AI support, and digital records, your
            wellbeing is in your hands.
          </p>
        </div>
      </motion.div> */}
      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-white shadow-md border-l-4 border-blue-600">
          <CardContent className="p-6">
            <p className="text-lg font-semibold text-gray-600">
              Total Patients
            </p>
            <p className="text-4xl text-blue-700 mt-2 font-bold">124</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-l-4 border-green-600">
          <CardContent className="p-6">
            <p className="text-lg font-semibold text-gray-600">Lab Results</p>
            <p className="text-4xl text-green-700 mt-2 font-bold">88</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md border-l-4 border-purple-600">
          <CardContent className="p-6">
            <p className="text-lg font-semibold text-gray-600">AI Analyses</p>
            <p className="text-4xl text-purple-700 mt-2 font-bold">42</p>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center my-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <Image
          src="/nurses.png"
          alt="AI Health Insights"
          width={600}
          height={400}
          className="rounded-xl shadow-md"
        />
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-blue-800">
            Your Health, Our Mission
          </h2>
          <p className="text-gray-700 text-lg">
            At <strong>Wills Health Center</strong>, we combine compassion,
            innovation, and data-driven tools to deliver smarter healthcare.
            With real-time monitoring, AI support, and digital records, your
            wellbeing is in your hands.
          </p>
        </div>
      </motion.div>
      {/* Charts */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <p className="text-md font-bold text-blue-800 mb-2">
              Lab Result Chart
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={labData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="wbc"
                  stroke="#3b82f6"
                  name="WBC"
                />
                <Line
                  type="monotone"
                  dataKey="glucose"
                  stroke="#ef4444"
                  name="Glucose"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-md">
          <CardContent className="p-6">
            <p className="text-md font-bold text-blue-800 mb-2">
              Patient Activity
            </p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
      {/* Call to Action */}
      <motion.div
        className="mt-12 p-8 bg-blue-50 border border-blue-100 rounded-lg shadow-sm text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-2xl font-bold text-blue-800 mb-2">
          Step Into the Future of Healthcare
        </h3>
        <p className="text-gray-600 mb-4">
          Wills Health is more than a system it is your companion in wellness.
          Discover the peace of mind that comes with precision medicine,
          intelligent monitoring, and healthcare that truly cares.
        </p>
        <button className="px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition">
          Start Your Journey with Us
        </button>
      </motion.div>
    </div>
  );
};

export default OverviewSection;
