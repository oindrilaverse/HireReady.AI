import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CareerState {
  resumeText: string | null;
  dashboardData: any | null;
  isSynced: boolean;
  syncedUserId: string | null;
  setResumeText: (text: string) => void;
  setDashboardData: (data: any) => void;
  setSynced: (status: boolean, userId?: string | null) => void;
  clearStore: () => void;
}

export const useCareerStore = create<CareerState>()(
  persist(
    (set) => ({
      resumeText: null,
      dashboardData: null,
      isSynced: false,
      syncedUserId: null,
      setResumeText: (text) => set({ resumeText: text }),
      setDashboardData: (data) => set({ dashboardData: data }),
      setSynced: (status, userId = null) => set({ isSynced: status, syncedUserId: userId }),
      clearStore: () => set({ resumeText: null, dashboardData: null, isSynced: false, syncedUserId: null }),
    }),
    {
      name: 'career-storage',
    }
  )
);

