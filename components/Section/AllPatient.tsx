// components/AllPatient.tsx
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { usePatientStore } from "@/store/usePatientstore";
import { usePatient } from "@/quries";

const AllPatient = () => {
  const { isLoading } = usePatient();
  const patients = usePatientStore((state) => state.patients);

  return (
    <Card className="bg-white text-black">
      <CardContent className="p-4">
        <h2 className="text-lg font-bold mb-4">Patients Table</h2>

        {isLoading && <div>Loading...</div>}

        {!isLoading && (
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
                  </tr>
                </thead>
                <tbody>
                  {patients?.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{patient.name}</td>
                      <td className="px-4 py-2">{patient.age}</td>
                      <td className="px-4 py-2">{patient.symptoms}</td>
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

export default AllPatient;
