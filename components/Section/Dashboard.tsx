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
import Footers from "./Footers";
import { toast } from "sonner";
import { isMobile } from "@/lib/mobile";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const username = useAuthStore((state) => state.username);
  const { mutate: createNewPatient } = useCreatePatient();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview"); // 👈 Track active tab

  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMobile(isMobile());

    const handleResize = () => setMobile(isMobile());
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!mounted) return null;

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();

    const patientData = {
      name,
      age: Number(age),
      symptoms,
    };

    createNewPatient(patientData, {
      onSuccess: () => {
        setName("");
        setAge("");
        setSymptoms("");

        toast.success("Patient added successfully! 🎉");
        toast.info("Next step: Please create a lab result for this patient.");
        setActiveTab("lab"); // 👈 Switch to lab tab
      },
      onError: () => {
        toast.error("Failed to add patient. Try again.");
      },
    });
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className={`min-h-screen flex ${
        mobile ? "flex-col" : "flex-row"
      } bg-white font-sans`}
    >
      {/* Sidebar */}
      <aside
        className={`${
          mobile
            ? "w-full border-b rounded-b-2xl"
            : "md:w-[240px] md:min-h-screen md:border-r rounded-r-2xl"
        } bg-gradient-to-b from-blue-50 to-white flex-shrink-0 shadow-sm flex flex-col`}
      >
        <div className="flex flex-col justify-evenly h-[100px] md:h-[600px] p-6">
          <TabsList
            className={`${
              mobile ? "flex flex-row gap-1" : "flex flex-col gap-2"
            } bg-transparent p-0 shadow-none text-left w-full`}
          >
            {[
              { label: "Overview", value: "overview" },
              { label: "Conditions", value: "conditions" },
              { label: "Patients", value: "patients" },
              { label: "Lab Results", value: "lab" },
              { label: "AI Analysis", value: "ai" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={`w-full justify-start px-4 py-2 rounded-md text-sm text-blue-900 font-medium hover:bg-blue-100 hover:text-blue-700 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all ${
                  mobile ? "text-xs px-2 py-1" : ""
                }`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {!mobile && (
            <div className="flex items-center space-x-3 border-t pt-6 mt-10">
              <Image
                src="/nurse.jpg"
                alt="User Avatar"
                width={42}
                height={42}
                className="rounded-full border"
              />
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Brooklyn Simmons
                </p>
                <p className="text-xs text-gray-500">Upcoming Appointment</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 pt-6 px-4 md:px-6 md:pt-10 overflow-y-auto">
        <motion.header
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800">
            Wills Health Center
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Empowering care through data and technology
          </p>
          <p className="mt-1 text-gray-700 font-medium">
            Welcome back, {username || "Guest"} 👋
          </p>
        </motion.header>

        <TabsContent value="patients">
          <motion.div
            className={`grid grid-cols-1 ${
              mobile ? "" : "md:grid-cols-2"
            } gap-6`}
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
            <LabResultForm onSuccessCallback={() => setActiveTab("ai")} />
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

        <motion.section
          className="mt-20 max-w-6xl"
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

        <Footers />
      </main>
    </Tabs>
  );
};

export default Dashboard;
