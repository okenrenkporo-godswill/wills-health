// store/usePatientStore.ts

import { create } from "zustand";

export interface Patient {
  id: number;
  name: string;
  age: number;
  symptoms: string;
}

interface PatientState {
  patients: Patient[];
  setPatients: (newPatients: Patient[]) => void;
  addPatient: (patients: Patient) => void;
  clearPatients: () => void;
}

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  setPatients: (newPatients) => set({ patients: newPatients }),
  addPatient: (patient) =>
    set((state) => ({ patients: [...state.patients, patient] })),
  clearPatients: () => set({ patients: [] }),
}));
