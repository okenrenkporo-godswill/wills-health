"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";

import { useCreatePatient } from "@/quries";
import LabResultForm from "./LabResultForm";
import AIAnalysis from "./AiAnalysis";
import Image from "next/image";
import DiseaseBrowser from "./DiseaseBrowser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Homes from "./Homes";
import HomeTwo from "./HomeTwo";
import VitalSlider from "./Vitalslider";
import AllPatient from "./AllPatient";
import HomeThree from "./HomeThree";
import ImageSlider from "./ImageSlider";

import {
  BrainCircuit,
  FlaskConical,
  HeartPulse,
  Home,
  UserRound,
} from "lucide-react";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const username = useAuthStore((state) => state.username);
  const { mutate: createNewPatient } = useCreatePatient();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isMobile, setIsMobile] = useState(false);
  const [sliderView] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    setMounted(true);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
        setActiveTab("lab");
      },
      onError: () => {
        toast.error("Failed to add patient. Try again.");
      },
    });
  };

  return (
    <>
      {!isMobile && <VitalSlider />}

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className={`min-h-screen flex ${
          isMobile ? "flex-col" : "flex-row"
        } bg-gradient-to-b from-white to-black/50 font-sans`}
      >
        <aside
          className={`${
            isMobile
              ? "w-full"
              : "md:w-[240px] md:min-h-screen md:border-r rounded-r-2xl"
          } bg-gradient-to-b from-blue-50 to-white flex-shrink-0 shadow-sm flex flex-col`}
        >
          <div
            className={`${
              isMobile
                ? "fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t z-50 flex justify-around px-4 py-2 shadow-md"
                : "flex flex-col justify-evenly h-[100px] md:h-[600px] p-6"
            }`}
          >
            <TabsList
              className={`${
                isMobile
                  ? "flex w-full gap-1"
                  : "flex flex-col gap-2 w-full p-0"
              } bg-transparent shadow-none text-left`}
            >
              {isMobile && (
                <div className="flex items-center justify-center w-full mb-1">
                  <HeartPulse className="text-blue-600" size={20} />
                </div>
              )}

              {[
                {
                  label: "Home",
                  value: "home",
                  icon: <Home className="w-4 h-4 mr-1" />,
                },
                ...(isMobile
                  ? []
                  : [
                      {
                        label: "Conditions",
                        value: "conditions",
                        icon: <HeartPulse className="w-4 h-4 mr-1" />,
                      },
                    ]),
                {
                  label: "Patients",
                  value: "patients",
                  icon: <UserRound className="w-4 h-4 mr-1" />,
                },
                {
                  label: "Lab Results",
                  value: "lab",
                  icon: <FlaskConical className="w-4 h-4 mr-1" />,
                },
                {
                  label: "AI Analysis",
                  value: "ai",
                  icon: <BrainCircuit className="w-4 h-4 mr-1" />,
                },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={`${
                    isMobile
                      ? "flex flex-col items-center text-xs px-2 py-2 gap-1"
                      : "flex items-center text-sm px-4 py-2 gap-2"
                  } w-full rounded-md text-blue-900 font-medium hover:bg-blue-100 hover:text-blue-700 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {!isMobile && (
            <>
              <Button
                onClick={() => router.push("/result")}
                className="mt-6 text-sm bg-blue-600 hover:bg-blue-700 text-white w-full"
              >
                View All Lab Results
              </Button>

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
            </>
          )}
        </aside>

        <main
          className={`flex-1 pt-6 px-4 md:px-6 md:pt-10 overflow-y-auto ${
            isMobile ? "pb-24" : ""
          }`}
        >
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

          {/* HOME TAB */}
          <TabsContent value="home">
            <motion.div
              className={`${
                isMobile
                  ? sliderView
                    ? "flex overflow-x-auto gap-4 snap-x snap-mandatory"
                    : "flex flex-col gap-4"
                  : "flex flex-wrap gap-6"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className={`${isMobile ? "w-full px-1" : "w-full md:w-[48%]"}`}
              >
                <div className="bg-transparent md:bg-white shadow md:shadow w-full rounded-xl p-2 space-y-1">
                  <ImageSlider />
                  <Homes />
                  <Button
                    onClick={() => setActiveTab("patients")}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                  >
                    Go to Patient Section
                  </Button>
                </div>
              </div>

              {!isMobile && (
                <div className="w-full md:w-[48%] flex flex-col gap-6">
                  <Card className="bg-white shadow border">
                    <CardContent className="p-6 space-y-4">
                      <HomeTwo />
                    </CardContent>
                  </Card>
                  <Card className="bg-white shadow border">
                    <CardContent className="p-6 space-y-4">
                      <HomeThree />
                    </CardContent>
                  </Card>
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* PATIENT TAB */}
          <TabsContent value="patients">
            <motion.div
              className={`grid grid-cols-1 ${
                isMobile ? "" : "md:grid-cols-2"
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
              {isMobile && <AllPatient />}
            </motion.div>
          </TabsContent>

          {/* LAB FORM */}
          <TabsContent value="lab">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <LabResultForm onSuccessCallback={() => setActiveTab("ai")} />
            </motion.div>
          </TabsContent>

          {/* AI ANALYSIS */}
          <TabsContent value="ai">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AIAnalysis />
            </motion.div>
          </TabsContent>

          {/* CONDITIONS */}
          <TabsContent value="conditions">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <DiseaseBrowser />
            </motion.div>
          </TabsContent>
        </main>
      </Tabs>
    </>
  );
};

export default Dashboard;
