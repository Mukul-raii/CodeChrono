/**
 * UI Store
 * Global state management for UI-related state
 */

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UIState {
  theme: "light" | "dark" | "system";
  sidebarCollapsed: boolean;
  activeView: "dashboard" | "projects" | "analytics" | "settings";
  notifications: Array<{
    id: string;
    type: "info" | "success" | "warning" | "error";
    message: string;
    timestamp: number;
  }>;
  setTheme: (theme: "light" | "dark" | "system") => void;
  toggleSidebar: () => void;
  setActiveView: (
    view: "dashboard" | "projects" | "analytics" | "settings"
  ) => void;
  addNotification: (
    type: "info" | "success" | "warning" | "error",
    message: string
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    persist(
      (set) => ({
        theme: "system",
        sidebarCollapsed: false,
        activeView: "dashboard",
        notifications: [],
        setTheme: (theme) => set({ theme }),
        toggleSidebar: () =>
          set((state) => ({
            sidebarCollapsed: !state.sidebarCollapsed,
          })),
        setActiveView: (activeView) => set({ activeView }),
        addNotification: (type, message) =>
          set((state) => ({
            notifications: [
              ...state.notifications,
              {
                id: `${Date.now()}-${Math.random()}`,
                type,
                message,
                timestamp: Date.now(),
              },
            ],
          })),
        removeNotification: (id) =>
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          })),
        clearNotifications: () => set({ notifications: [] }),
      }),
      {
        name: "ui-storage",
      }
    )
  )
);
