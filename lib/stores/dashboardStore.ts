/**
 * Dashboard Store
 * Global state management for dashboard data
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { DashboardStats } from "../api/types";

interface DashboardState {
  stats: DashboardStats | null;
  selectedDateRange: {
    start: Date;
    end: Date;
  };
  selectedProject: string | null;
  viewMode: "day" | "week" | "month" | "year";
  setStats: (stats: DashboardStats) => void;
  setDateRange: (start: Date, end: Date) => void;
  setSelectedProject: (projectId: string | null) => void;
  setViewMode: (mode: "day" | "week" | "month" | "year") => void;
  reset: () => void;
}

const getDefaultDateRange = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 7); // Last 7 days by default
  return { start, end };
};

export const useDashboardStore = create<DashboardState>()(
  devtools(
    (set) => ({
      stats: null,
      selectedDateRange: getDefaultDateRange(),
      selectedProject: null,
      viewMode: "week",
      setStats: (stats) => set({ stats }),
      setDateRange: (start, end) => set({ selectedDateRange: { start, end } }),
      setSelectedProject: (projectId) => set({ selectedProject: projectId }),
      setViewMode: (viewMode) => set({ viewMode }),
      reset: () =>
        set({
          stats: null,
          selectedDateRange: getDefaultDateRange(),
          selectedProject: null,
          viewMode: "week",
        }),
    }),
    {
      name: "dashboard-store",
    }
  )
);
