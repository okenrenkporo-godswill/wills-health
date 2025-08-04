"use client";

import React, { useState } from "react";
import {
  HeartPulse,
  Plus,
  FlaskConical,
  BrainCircuit,
  Home,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ImageSlider from "./ImageSlider";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AllPatient from "./AllPatient";
import LabResultForm from "./LabResultForm";
import AIAnalysis from "./AiAnalysis";
import { toast } from "sonner";
import { useCreatePatient } from "@/quries";
import { motion } from "framer-motion";
import TextSlider from "./TextSlider";

const DashboardMobile = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const { mutate: createNewPatient } = useCreatePatient();

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();

    const patientData = { name, age: Number(age), symptoms };

    createNewPatient(patientData, {
      onSuccess: () => {
        setName("");
        setAge("");
        setSymptoms("");
        toast.success("Patient added successfully! 🎉");
        toast.info("Next step: Please create a lab result for this patient.");
        setActiveTab("lab");
      },
      onError: () => {
        toast.error("Failed to add patient. Try again.");
      },
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans overflow-visible"
      style={{
        background:
          "linear-gradient(to bottom, #001233 0%, #003366 35%, #0055aa 60%, #87cefa 85%, #ffffff 100%)",
      }}
    >
      {/* HEADER */}
      <header className="pt-14 pb-8 flex flex-col items-center text-white">
        <HeartPulse className="w-9 h-9 mb-3" />
        <h1 className="text-[22px] font-bold leading-tight text-center">
          Wills Health Center
        </h1>
      </header>

      {/* CONTENT TABS */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        {/* HOME TAB */}
        <TabsContent
          value="home"
          className="flex flex-col flex-1 px-5 gap-4 pb-20"
        >
          <Button
            className="bg-white text-blue-900 font-semibold rounded-2xl h-[60px] flex items-center justify-start gap-3 shadow-md px-4 text-[15px]"
            onClick={() => setActiveTab("patients")}
          >
            <Plus className="w-6 h-6 text-blue-600" />
            Create Patient
          </Button>

          <Button
            className="bg-white text-blue-900 font-semibold rounded-2xl h-[60px] flex items-center justify-start gap-3 shadow-md px-4 text-[15px]"
            onClick={() => setActiveTab("lab")}
          >
            <FlaskConical className="w-6 h-6 text-blue-600" />
            Submit Lab Result
          </Button>

          <Button
            className="bg-white text-blue-900 font-semibold rounded-2xl h-[60px] flex items-center justify-start gap-3 shadow-md px-4 text-[15px]"
            onClick={() => setActiveTab("ai")}
          >
            <BrainCircuit className="w-6 h-6 text-blue-600" />
            AI Analysis
          </Button>

          {/* GENERAL STATS SLIDER */}
          <ImageSlider />
          <TextSlider />
        </TabsContent>

        {/* PATIENTS TAB */}
        <TabsContent value="patients" className="pb-20">
          <motion.div
            className="grid grid-cols-1 gap-6 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white shadow border">
              <h2 className="text-lg font-semibold text-blue-800  px-1">
                ➕ Add New Patient
              </h2>
              <CardContent className="p-6 space-y-4">
                <Input
                  placeholder="Patient Name"
                  className="bg-white text-gray-900 placeholder-gray-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  placeholder="Age"
                  className="bg-white text-gray-900 placeholder-gray-500"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
                <Textarea
                  placeholder="Symptoms"
                  className="bg-white text-gray-900 placeholder-gray-500"
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

        {/* LAB TAB */}
        <TabsContent value="lab" className="pb-20">
          <motion.div
            className="px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <LabResultForm onSuccessCallback={() => setActiveTab("ai")} />
          </motion.div>
        </TabsContent>

        {/* AI TAB */}
        <TabsContent value="ai" className="pb-20">
          <motion.div
            className="px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white shadow border">
              <CardContent className="p-6 space-y-4">
                <AIAnalysis />
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* STICKY BOTTOM NAVIGATION */}
        <div className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t flex justify-around py-2">
          <TabsList className="flex w-full justify-around bg-transparent">
            <TabsTrigger
              value="home"
              className="flex flex-col items-center text-[11px] data-[state=active]:text-blue-600 no-focus-outline"
            >
              <Home className="w-5 h-5" />
              Home
            </TabsTrigger>
            <TabsTrigger
              value="patients"
              className="flex flex-col items-center text-[11px] data-[state=active]:text-blue-600 no-focus-outline"
            >
              <UserRound className="w-5 h-5" />
              Patients
            </TabsTrigger>
            <TabsTrigger
              value="lab"
              className="flex flex-col items-center text-[11px] data-[state=active]:text-blue-600 no-focus-outline"
            >
              <FlaskConical className="w-5 h-5" />
              Lab Results
            </TabsTrigger>
            <TabsTrigger
              value="ai"
              className="flex flex-col items-center text-[11px] data-[state=active]:text-blue-600 no-focus-outline"
            >
              <BrainCircuit className="w-5 h-5" />
              AI
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
};

export default DashboardMobile;
