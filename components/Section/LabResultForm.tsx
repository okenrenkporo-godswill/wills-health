"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { usePatientStore } from "@/store/usePatientstore";
import { useCreateLabResult } from "@/quries";
import AllLabResults from "./AllLabResult";
import Image from "next/image";

const labInvestigations = [
  "Full Blood Count (FBC)",
  "Liver Function Test (LFT)",
  "Kidney Function Test (KFT)",
  "Malaria Parasite",
  "HIV Test",
  "Blood Sugar",
  "Electrolytes",
  "Urinalysis",
  "X-Ray",
  "CT Scan",
  "MRI",
];

const LabResultForm = () => {
  const [selectedPatientId, setSelectedPatientId] = useState<number>(0);
  const [testType, setTestType] = useState("");
  const [resultValue, setResultValue] = useState("");

  const { mutate: createLabResult } = useCreateLabResult(
    selectedPatientId ?? 0
  );
  const patients = usePatientStore((state) => state.patients);

  const handleCreateLabResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId || !testType || !resultValue) return;

    createLabResult({
      test_type: testType,
      result_value: resultValue,
    });

    setTestType("");
    setResultValue("");
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-blue-200"
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
            <Image src="/lab.png" alt="Lab" width={300} height={200} />
            <h2 className="text-2xl font-bold text-blue-700">
              Laboratory Request Form
            </h2>
          </motion.div>

          <form
            onSubmit={handleCreateLabResult}
            className="space-y-5 transition-all duration-500"
          >
            {/* Patient Selector */}
            <div>
              <label className="block font-medium mb-1 text-blue-900">
                Select Patient:
              </label>
              <select
                className="w-full p-3 border border-blue-300 rounded-lg text-gray-800 bg-white"
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

            {/* Investigation List */}
            <div>
              <label className="block font-medium mb-1 text-blue-900">
                Laboratory Investigation:
              </label>
              <select
                className="w-full p-3 border border-blue-300 rounded-lg text-gray-800 bg-white"
                value={testType}
                onChange={(e) => setTestType(e.target.value)}
              >
                <option value="">🧪 Select Investigation</option>
                {labInvestigations.map((test) => (
                  <option key={test} value={test}>
                    {test}
                  </option>
                ))}
              </select>
            </div>

            {/* Result Entry */}
            <div>
              <label className="block font-medium mb-1 text-blue-900">
                Result:
              </label>
              <Textarea
                placeholder="Enter result details..."
                value={resultValue}
                onChange={(e) => setResultValue(e.target.value)}
                className="bg-white border border-blue-300 text-gray-900"
              />
            </div>

            {/* Submit */}
            <div className="text-right">
              <Button
                type="submit"
                disabled={!selectedPatientId || !testType || !resultValue}
                className="bg-blue-700 hover:bg-blue-900 text-white px-6 py-3 rounded-lg shadow transition"
              >
                Submit Lab Result
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
            alt="Laboratory Image"
            width={400} // Set an appropriate width
            height={300} // Set an appropriate height
            className="rounded-xl shadow-md w-full max-w-sm object-cover"
          />
        </motion.div>
      </div>

      {/* All Lab Results Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-10"
      >
        <AllLabResults />
      </motion.div>
    </motion.div>
  );
};

export default LabResultForm;
