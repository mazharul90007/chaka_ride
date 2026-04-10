import { create } from "zustand";

type UIState = {
  globalLoading: boolean;
  setGlobalLoading: (value: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  globalLoading: false,
  setGlobalLoading: (globalLoading) => set({ globalLoading }),
}));
