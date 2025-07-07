"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";
import AllPatient from "./AllPatient";
import { useCreatePatient } from "@/quries";
import LabResultForm from "./LabResultForm";
import AIAnalysis from "./AiAnalysis";
import AllLabResults from "./AllLabResult";
import Image from "next/image";
import DiseaseBrowser from "./DiseaseBrowser";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const username = useAuthStore((state) => state.username);
  const { mutate: createNewPatient } = useCreatePatient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    const patientData = { name, age: Number(age), symptoms };
    createNewPatient(patientData, {
      onSuccess: () => {
        setName("");
        setAge("");
        setSymptoms("");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 font-sans">
      <motion.header
        className="mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-extrabold text-blue-800">
          Wills Health Center
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Empowering care through data and technology
        </p>
        <p className="mt-1 text-gray-700 font-medium">
          Welcome back, {username || "Guest"} 👋
        </p>
      </motion.header>

      <Tabs className="w-full max-w-7xl mx-auto">
        <TabsList className="grid grid-cols-5 rounded-lg bg-blue-700 text-white shadow mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="conditions">Conditions</TabsTrigger>
          <TabsTrigger value="patients">Patients </TabsTrigger>
          <TabsTrigger value="lab">Lab Results</TabsTrigger>
          <TabsTrigger value="ai">AI Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-blue-700">
                Quality Healthcare at Your Fingertips
              </h2>
              <p className="text-gray-700 text-lg">
                At Wills Health, our mission is to transform patient care
                through technology. With powerful tools like lab tracking,
                patient insights, and AI diagnostics, our platform is designed
                to support both healthcare professionals and patients every step
                of the way.
              </p>
            </div>
            <Image
              src="/overview-illustration.png"
              alt="Healthcare Overview"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
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
                <p className="text-lg font-semibold text-gray-600">
                  Lab Results
                </p>
                <p className="text-4xl text-green-700 mt-2 font-bold">88</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md border-l-4 border-purple-600">
              <CardContent className="p-6">
                <p className="text-lg font-semibold text-gray-600">
                  AI Analyses
                </p>
                <p className="text-4xl text-purple-700 mt-2 font-bold">42</p>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="patients">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white shadow border">
              <CardContent className="p-6 space-y-4">
                <Input
                  placeholder="Patient Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <Textarea
                  placeholder="Symptoms"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
                <Button
                  onClick={handleCreatePatient}
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                  disabled={!name || !age || !symptoms}
                >
                  Add Patient
                </Button>
              </CardContent>
            </Card>

            <AllPatient />
          </motion.div>
        </TabsContent>

        <TabsContent value="lab">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <LabResultForm />
            <AllLabResults />
          </motion.div>
        </TabsContent>

        <TabsContent value="ai">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AIAnalysis />
          </motion.div>
        </TabsContent>

        <TabsContent value="conditions">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <DiseaseBrowser />
          </motion.div>
        </TabsContent>
      </Tabs>

      <motion.section
        className="mt-20 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-blue-800 mb-4">
          📅 Appointments
        </h2>
        <Card className="bg-white border shadow-md">
          <CardContent className="p-6 text-gray-700">
            <p className="text-center">No appointments scheduled yet.</p>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
};

export default Dashboard;
