import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CareerState {
  resumeText: string | null;
  setResumeText: (text: string) => void;
  clearStore: () => void;
}

export const useCareerStore = create<CareerState>()(
  persist(
    (set) => ({
      resumeText: null,
      setResumeText: (text) => set({ resumeText: text }),
      clearStore: () => set({ resumeText: null }),
    }),
    {
      name: 'career-storage',
    }
  )
);
