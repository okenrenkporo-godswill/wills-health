"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const mockDiseases: Record<string, string[]> = {
  A: ["Asthma", "Anemia", "Appendicitis"],
  B: ["Bronchitis", "Back Pain"],
  C: ["Cancer", "Cold", "Cholera"],
  // ... Add more sample data here for other letters
};

const DiseaseBrowser = () => {
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [search, setSearch] = useState("");

  const diseases = mockDiseases[selectedLetter] || [];

  const filtered = diseases.filter((disease) =>
    disease.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      className="p-6 bg-white shadow rounded-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        🔍 Browse Diseases by Alphabet
      </h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {alphabet.map((letter) => (
          <button
            key={letter}
            className={`px-3 py-1 border rounded-full text-sm font-medium hover:bg-blue-100 transition ${
              selectedLetter === letter
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            onClick={() => setSelectedLetter(letter)}
          >
            {letter}
          </button>
        ))}
      </div>

      <Input
        placeholder="Search disease..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.length > 0 ? (
          filtered.map((disease, idx) => (
            <Card key={idx} className="hover:shadow-md transition">
              <CardContent className="p-4">
                <p className="text-gray-700 font-medium">{disease}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No diseases found.</p>
        )}
      </div>
    </motion.div>
  );
};

export default DiseaseBrowser;
