"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useAllLabResults } from "@/quries";
import { useLaboratoryStore } from "@/store/useLaboratoryStore";

const AllLabResults = () => {
  // fetch data using TanStack Query (and it sets Zustand internally)
  const { isLoading, isError } = useAllLabResults();

  // subscribe to Zustand store for reactivity
  const labResults = useLaboratoryStore((state) => state.labResults);

  // get only the first 5 results
  const firstFiveResults = labResults?.slice(0, 5) || [];

  return (
    <Card className="bg-white text-black">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold mb-4">Lab Results Table</h2>

        {isLoading && <div>Loading...</div>}
        {isError && <div>Failed to load lab results.</div>}

        {!isLoading && firstFiveResults.length === 0 && (
          <div>No lab results found.</div>
        )}

        {!isLoading && firstFiveResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left border border-gray-200">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-4 py-2">Patient ID</th>
                    <th className="px-4 py-2">Test Type</th>
                    <th className="px-4 py-2">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {firstFiveResults.map((result) => (
                    <tr
                      key={result.id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{result.patient_id}</td>
                      <td className="px-4 py-2">{result.test_type}</td>
                      <td className="px-4 py-2">{result.result_value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default AllLabResults;
