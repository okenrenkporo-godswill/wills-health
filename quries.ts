import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";

import { usePatientStore } from "./store/usePatientstore";
import axios from "axios";

import { useLaboratoryStore } from "./store/useLaboratoryStore";
import { useAIStore } from "./store/useAiAnalysisStore";

const BASE_URL = "https://backend-1-fmwc.onrender.com";

export const usePatient = () => {
  const { token } = useAuthStore();
  const setPatients = usePatientStore().setPatients;

  return useQuery({
    queryKey: ["patients"],
    enabled: !!token,
    queryFn: async () => {
      const res = await axios.get(`${BASE_URL}/patients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const patients = res.data.data; // ✅ extract the `data` array
      setPatients(patients);
      return patients;
    },
  });
};

// interface CreatePatient {
//   name: string;
//   age: number;
//   symptoms: string;
// }

export const useCreatePatient = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation<
    any,
    Error,
    {
      name: string;
      age: number;
      symptoms: string;
    }
  >({
    mutationFn: async ({ name, age, symptoms }) => {
      const res = await axios.post(
        `${BASE_URL}/patients`,
        {
          name,
          age,
          symptoms,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const success = res.statusText == "ok";
      if (success) {
        await queryClient.invalidateQueries({ queryKey: ["patients"] });
      }
      return res.data.data;
    },

    onSuccess: () => {
      // ✅ Invalidate and refetch patients
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};

export interface LabResultPayload {
  test_type: string;
  result_value: string;
}

// quries.ts or wherever

export interface LabResultPayload {
  test_type: string;
  result_value: string;
}

export const useCreateLabResult = (patient_id: number) => {
  const queryClient = useQueryClient();
  const { token } = useAuthStore();
  const addLabResult = useLaboratoryStore((state) => state.addLabResult);

  return useMutation<any, Error, LabResultPayload>({
    mutationFn: async ({ test_type, result_value }) => {
      const res = await axios.post(
        `http://127.0.0.1:8000/labresult/${patient_id}`,
        { test_type, result_value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.data;
    },
    onSuccess: (newResult) => {
      addLabResult(newResult);
      queryClient.invalidateQueries({ queryKey: ["labResults"] });
    },
  });
};

export const useAIAnalysis = () => {
  const setAnalysis = useAIStore((s) => s.setAnalysis);
  const setLoading = useAIStore((s) => s.setLoading);
  const { token } = useAuthStore();

  return useMutation({
    mutationFn: async (patientId: number) => {
      setLoading(true);

      const res = await axios.post(
        `${BASE_URL}/agent/agent/${patientId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.analysis; // ✅ Expecting: { analysis: {...} }
    },
    onSuccess: (data) => {
      setAnalysis(data);
      setLoading(false);
    },
    onError: (error: any) => {
      setLoading(false);

      console.error("AI analysis error:", error);
    },
  });
};
