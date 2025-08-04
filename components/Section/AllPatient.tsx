// components/AllPatient.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { usePatientStore } from "@/store/usePatientstore";
import { useLaboratoryStore } from "@/store/useLaboratoryStore";
import { usePatient, useAllLabResults } from "@/quries";

const AllPatient = () => {
  const { isLoading: patientLoading } = usePatient();
  const { isLoading: labLoading } = useAllLabResults();

  const patients = usePatientStore((state) => state.patients);
  const labResults = useLaboratoryStore((state) => state.labResults);

  const getLabResultForPatient = (patientId: number) => {
    return labResults.find((result) => result.patient_id === patientId);
  };

  return (
    <Card className="bg-white text-black">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold mb-4">Patients with Lab Results</h2>

        {(patientLoading || labLoading) && <div>Loading...</div>}

        {!patientLoading && !labLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left border border-gray-200">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Age</th>
                    <th className="px-4 py-2">Symptoms</th>
                    <th className="px-4 py-2">Lab Test Type</th>
                    <th className="px-4 py-2">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {patients?.slice(0, 5).map((patient) => {
                    const lab = getLabResultForPatient(patient.id);

                    return (
                      <tr
                        key={patient.id}
                        className="border-t border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-4 py-2">{patient.name}</td>
                        <td className="px-4 py-2">{patient.age}</td>
                        <td className="px-4 py-2">{patient.symptoms}</td>
                        <td className="px-4 py-2">
                          {lab ? lab.test_type : "—"}
                        </td>
                        <td className="px-4 py-2">
                          {lab ? lab.result_value : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default AllPatient;
