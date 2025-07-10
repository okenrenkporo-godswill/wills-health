// eslint-disable-next-line @typescript-eslint/no-unused-vars
"use client";

import React, { useState } from "react";
import { usePatientStore } from "@/store/usePatientstore";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useAIAnalysis } from "@/quries";
import { useAIStore } from "@/store/useAiAnalysisStore";

const AIAnalysis = () => {
  const [selectedPatientIds, setSelectedPatientIds] = useState<number[]>([]);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const { patients } = usePatientStore();
  const { mutate } = useAIAnalysis();
  const loading = useAIStore((s) => s.loading); // ✅ Zustand loading state

  // Toggle selected patient (multi-select)
  const togglePatient = (id: number) => {
    setSelectedPatientIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // Run AI Analysis for selected patients
  const handleAIAnalysis = () => {
    selectedPatientIds.forEach((id) => {
      mutate(id, {
        onSuccess: (data) => {
          const patient = patients.find((p) => p.id === id);
          setChatMessages((prev) => [
            ...prev,
            {
              id,
              name: patient?.name || "Unknown",
              condition: data.condition_summary,
              advice: data.advice,
              urgent: data.urgent,
            },
          ]);
        },
      });
    });
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-blue-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        🧠 WILL HEALTH AI Chatroom
      </h2>

      {/* Patient Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {patients.map((p) => (
          <motion.button
            key={p.id}
            onClick={() => togglePatient(p.id)}
            className={`p-3 border rounded-lg text-left text-sm transition-all duration-200 ${
              selectedPatientIds.includes(p.id)
                ? "bg-blue-100 border-blue-500"
                : "bg-white border-gray-300"
            }`}
            whileTap={{ scale: 0.97 }}
          >
            ✅ {p.name} (ID: {p.id})
          </motion.button>
        ))}
      </div>

      {/* Analyze Button */}
      <div className="text-center mb-6">
        <Button
          disabled={selectedPatientIds.length === 0 || loading}
          onClick={handleAIAnalysis}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 inline-block w-5 h-5" />
              Analyzing...
            </>
          ) : (
            "Analyze Selected Patients"
          )}
        </Button>
      </div>

      {/* Chatroom Messages */}
      <div className="space-y-4">
        {chatMessages.map((msg, index) => (
          <motion.div
            key={index}
            className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-md"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <h4 className="font-semibold text-blue-800 mb-2">
              👤 {msg.name} (ID: {msg.id})
            </h4>
            <ul className="space-y-1 text-gray-800 text-sm">
              <li>
                <strong>📝 Condition:</strong> {msg.condition}
              </li>
              <li>
                <strong>💡 Advice:</strong> {msg.advice}
              </li>
              <li>
                <strong>🚨 Urgent:</strong> {msg.urgent ? "Yes" : "No"}
              </li>
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AIAnalysis;
