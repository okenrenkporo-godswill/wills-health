import { create } from "zustand";

export type AIResult = {
  condition_summary: string;
  advice: string;
  urgent: boolean;
};

interface AIStore {
  analysis: AIResult | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setAnalysis: (data: AIResult) => void;
  clearAnalysis: () => void;
}

export const useAIStore = create<AIStore>((set) => ({
  analysis: null,
  loading: false,
  setLoading: (loading) => set({ loading }),
  setAnalysis: (data) => set({ analysis: data }),
  clearAnalysis: () => set({ analysis: null }),
}));
