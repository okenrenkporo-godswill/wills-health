// store/useLaboratoryStore.ts
import { create } from "zustand";

export interface LabResult {
  patient_id: number;
  test_type: string;
  result_value: string;
}

interface LaboratoryState {
  labResults: LabResult[];
  addLabResult: (result: LabResult) => void;
  setLabResults: (results: LabResult[]) => void;
}

export const useLaboratoryStore = create<LaboratoryState>((set) => ({
  labResults: [],
  addLabResult: (result) =>
    set((state) => ({ labResults: [...state.labResults, result] })),
  setLabResults: (results) => set({ labResults: results }),
}));
