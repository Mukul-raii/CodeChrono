/**
 * Projects Store
 * Global state management for projects
 */

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Project } from "../api/types";

interface ProjectsState {
  projects: Project[];
  selectedProject: Project | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  sortBy: "name" | "lastActive" | "totalTime";
  sortOrder: "asc" | "desc";
  setProjects: (projects: Project[]) => void;
  setSelectedProject: (project: Project | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: "name" | "lastActive" | "totalTime") => void;
  setSortOrder: (order: "asc" | "desc") => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  removeProject: (id: string) => void;
  reset: () => void;
}

export const useProjectsStore = create<ProjectsState>()(
  devtools(
    (set) => ({
      projects: [],
      selectedProject: null,
      isLoading: false,
      error: null,
      searchQuery: "",
      sortBy: "lastActive",
      sortOrder: "desc",
      setProjects: (projects) => set({ projects, error: null }),
      setSelectedProject: (project) => set({ selectedProject: project }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (sortOrder) => set({ sortOrder }),
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
        })),
      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
          selectedProject:
            state.selectedProject?.id === id
              ? { ...state.selectedProject, ...updates }
              : state.selectedProject,
        })),
      removeProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          selectedProject:
            state.selectedProject?.id === id ? null : state.selectedProject,
        })),
      reset: () =>
        set({
          projects: [],
          selectedProject: null,
          isLoading: false,
          error: null,
          searchQuery: "",
          sortBy: "lastActive",
          sortOrder: "desc",
        }),
    }),
    {
      name: "projects-store",
    }
  )
);
