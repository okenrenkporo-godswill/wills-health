// components/AllLabResults.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useLaboratoryStore } from "@/store/useLaboratoryStore";

const AllLabResults = () => {
  const labResults = useLaboratoryStore((state) => state.labResults);

  return (
    <Card className="bg-white text-black">
      <CardContent className="p-4 space-y-2">
        <h2 className="text-lg font-bold mb-4">Lab Results</h2>
        {labResults.length === 0 ? (
          <p className="text-gray-500">No lab results yet.</p>
        ) : (
          labResults.map((result) => (
            <motion.div
              key={result.patient_id}
              className="border p-3 rounded-md bg-blue-50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p>
                <strong>Patient ID:</strong> {result.patient_id}
              </p>
              <p>
                <strong>Test Type:</strong> {result.test_type}
              </p>
              <p>
                <strong>Result:</strong> {result.result_value}
              </p>
            </motion.div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default AllLabResults;
