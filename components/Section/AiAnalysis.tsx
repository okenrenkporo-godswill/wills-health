"use client";

import React, { useState } from "react";
import { usePatientStore } from "@/store/usePatientstore";
import { useAIAnalysis } from "@/quries";
import { useAIStore } from "@/store/useAiAnalysisStore";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Brain, User } from "lucide-react";

type ChatMessage = {
  id: number;
  name: string;
  condition: string;
  advice: string;
  urgent: boolean;
};

const AIAnalysis = () => {
  const { patients } = usePatientStore();
  const { mutate } = useAIAnalysis();
  const loading = useAIStore((s) => s.loading);

  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(
    null
  );
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const handleAnalyze = () => {
    if (!selectedPatientId) return;

    mutate(selectedPatientId, {
      onSuccess: (data) => {
        const patient = patients.find((p) => p.id === selectedPatientId);
        if (!patient) return;

        setChatMessages((prev) => [
          ...prev,
          {
            id: selectedPatientId,
            name: patient.name,
            condition: data.condition_summary,
            advice: data.advice,
            urgent: data.urgent,
          },
        ]);
      },
    });
  };

  const handleDeleteMessage = (id: number) => {
    setChatMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const handleClearAll = () => {
    setChatMessages([]);
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-blue-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center flex items-center justify-center gap-2">
        <Brain className="w-7 h-7" />
        WILL HEALTH AI Chatroom
      </h2>

      {/* Patient Select */}
      <div className="mb-6">
        <label
          htmlFor="patient-select"
          className="block text-sm font-medium mb-2"
        >
          Select a Patient
        </label>
        <select
          id="patient-select"
          value={selectedPatientId ?? ""}
          onChange={(e) => setSelectedPatientId(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>
            -- Choose a patient --
          </option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (ID: {p.id})
            </option>
          ))}
        </select>
      </div>

      {/* Analyze Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <Button
          disabled={!selectedPatientId || loading}
          onClick={handleAnalyze}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 w-5 h-5" />
              Analyzing...
            </>
          ) : (
            "Run AI Analysis"
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

      {/* Messages */}
      <div className="space-y-4">
        {chatMessages.map((msg, index) => (
          <motion.div
            key={index}
            className="relative bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-md"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <button
              onClick={() => handleDeleteMessage(msg.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition"
              aria-label="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <User className="w-4 h-4" />
              {msg.name} (ID: {msg.id})
            </h4>

            <ul className="text-sm space-y-1 text-gray-800">
              <li>
                <strong>📝 Condition:</strong> {msg.condition}
              </li>
              <li>
                <strong>💡 Advice:</strong> {msg.advice}
              </li>
              <li>
                <strong>🚨 Urgent:</strong>{" "}
                <span
                  className={
                    msg.urgent ? "text-red-600 font-semibold" : "text-green-600"
                  }
                >
                  {msg.urgent ? "Yes" : "No"}
                </span>
              </li>
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AIAnalysis;
