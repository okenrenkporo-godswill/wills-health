"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePatientStore } from "@/store/usePatientstore";
import { useCreateLabResult } from "@/quries";

import Image from "next/image";
import { isMobile } from "@/lib/mobile";
import { toast } from "sonner";
import AllLabResults from "./AllLabResult";

const LabResultForm = ({
  onSuccessCallback,
}: {
  onSuccessCallback?: () => void;
}) => {
  const [selectedPatientId, setSelectedPatientId] = useState<number>(0);
  const [testType, setTestType] = useState("");
  const [resultValue, setResultValue] = useState("");
  const patients = usePatientStore((state) => state.patients);
  const [mobile, setMobile] = useState(false);

  const { mutate: createLabResult } = useCreateLabResult(
    selectedPatientId ?? 0
  );

  useEffect(() => {
    setMobile(isMobile());

    const handleResize = () => setMobile(isMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCreateLabResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId || !testType || !resultValue) return;

    createLabResult(
      {
        test_type: testType,
        result_value: resultValue,
      },
      {
        onSuccess: () => {
          setTestType("");
          setResultValue("");

          toast.success("Lab result created successfully! ✅");
          toast.info("You can now run AI analysis on this patient.");

          if (onSuccessCallback) onSuccessCallback();
        },
        onError: () => {
          toast.error("Failed to submit lab result. Try again.");
        },
      }
    );
  };

  return (
    <motion.div
      className={`${
        mobile ? "w-full px-4" : "w-full"
      } max-w-6xl mx-auto mt-10 p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-blue-100`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* FORM SECTION */}
        <div>
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Image src="/logo.png" alt="Lab" width={90} height={90} />
            <h2 className="text-2xl font-semibold text-blue-800">
              Laboratory Result Entry
            </h2>
          </motion.div>

          <form onSubmit={handleCreateLabResult} className="space-y-6">
            {/* Patient Selector */}
            <div>
              <label className="block font-medium mb-2 text-gray-700">
                Select Patient:
              </label>
              <select
                className="w-full p-3 border border-blue-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setSelectedPatientId(Number(e.target.value))}
                value={selectedPatientId}
              >
                <option value={0}>🩺 Choose a patient</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (ID: {p.id})
                  </option>
                ))}
              </select>
            </div>

            {/* Free Text Input for Investigation */}
            <div>
              <label className="block font-medium mb-2 text-gray-700">
                Investigation Name:
              </label>
              <input
                type="text"
                className="w-full p-3 border border-blue-300 rounded-md bg-white focus:ring-2 focus:ring-blue-400"
                placeholder="e.g., Full Blood Count, Malaria Test, etc."
                value={testType}
                onChange={(e) => setTestType(e.target.value)}
              />
            </div>

            {/* Result Textarea */}
            <div>
              <label className="block font-medium mb-2 text-gray-700">
                Result Details:
              </label>
              <Textarea
                placeholder="Enter lab result details here..."
                value={resultValue}
                onChange={(e) => setResultValue(e.target.value)}
                className="bg-white border border-blue-300 text-gray-800 focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Submit Button */}
            <div className="text-right">
              <Button
                type="submit"
                disabled={!selectedPatientId || !testType || !resultValue}
                className="bg-blue-700 hover:bg-blue-900 text-white px-6 py-3 rounded-lg shadow-md transition"
              >
                Save Lab Result
              </Button>
            </div>
          </form>
        </div>

        {/* IMAGE SECTION */}
        <motion.div
          className="w-full flex justify-center items-start"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/laboratory.jpg"
            alt="Lab"
            width={450}
            height={320}
            className="rounded-xl shadow-lg object-cover w-full max-w-md"
          />
        </motion.div>
      </div>

      {/* Lab Results Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-12"
      >
        <AllLabResults />
      </motion.div>
    </motion.div>
  );
};

export default LabResultForm;
