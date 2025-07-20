"use client";

import React, { useState } from "react";
import { usePatientStore } from "@/store/usePatientstore";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2, Trash2 } from "lucide-react";
import { useAIAnalysis } from "@/quries";
import { useAIStore } from "@/store/useAiAnalysisStore";

const AIAnalysis = () => {
  const [selectedPatientIds, setSelectedPatientIds] = useState<number[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const { patients } = usePatientStore();
  const { mutate } = useAIAnalysis();
  const loading = useAIStore((s) => s.loading);

  const togglePatient = (id: number) => {
    setSelectedPatientIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

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

  const handleDeleteMessage = (id: number) => {
    setChatMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const handleClearAll = () => {
    setChatMessages([]);
  };

  type ChatMessage = {
    id: number;
    name: string;
    condition: string;
    advice: string;
    urgent: boolean;
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
      <div className="text-center mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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

        {chatMessages.length > 0 && (
          <Button
            variant="outline"
            onClick={handleClearAll}
            className="border-red-400 text-red-600 hover:bg-red-50"
          >
            🗑️ Clear All
          </Button>
        )}
      </div>

      {/* Chatroom Messages */}
      <div className="space-y-4">
        {chatMessages.map((msg, index) => (
          <motion.div
            key={index}
            className="relative bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-md"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {/* Delete Button (top-right corner) */}
            <button
              onClick={() => handleDeleteMessage(msg.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition"
              aria-label="Delete analysis"
            >
              <Trash2 className="w-4 h-4" />
            </button>

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
