import { create } from "zustand";

interface ApiUrlState {
  apiUrl: string;
  setApiUrl: (url: string) => void;
}

const defaultApiUrl = "http://localhost:7860";

const useApiUrl = create<ApiUrlState>((set) => ({
  apiUrl: defaultApiUrl,
  setApiUrl: (url) => set({ apiUrl: url }),
}));

export { useApiUrl, defaultApiUrl };
