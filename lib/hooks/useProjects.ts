/**
 * Projects Hooks
 * React Query hooks for projects data fetching
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "../api";
import type { Project, PaginationParams } from "../api/types";
import { useUIStore } from "../stores";

// Query keys for caching
export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  list: (params?: PaginationParams) =>
    [...projectKeys.lists(), params] as const,
  details: () => [...projectKeys.all, "detail"] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
  stats: (id: string) => [...projectKeys.all, "stats", id] as const,
};

/**
 * Hook to fetch all projects
 */
export function useProjects(params?: PaginationParams) {
  return useQuery<Project[]>({
    queryKey: projectKeys.list(params),
    queryFn: () => projectsApi.getAll(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch a single project
 */
export function useProject(id: string) {
  return useQuery<Project>({
    queryKey: projectKeys.detail(id),
    queryFn: () => projectsApi.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to fetch project statistics
 */
export function useProjectDetails(id: string) {
  return useQuery({
    queryKey: projectKeys.stats(id),
    queryFn: () => projectsApi.getDetails(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to delete a project
 */
export function useDeleteProject() {
  const queryClient = useQueryClient();
  const { addNotification } = useUIStore();

  return useMutation({
    mutationFn: (id: string) => projectsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      addNotification("success", "Project deleted successfully");
    },
    onError: (error: Error) => {
      addNotification("error", `Failed to delete project: ${error.message}`);
    },
  });
}

/**
 * Hook to update project name
 */
export function useUpdateProject() {
  const queryClient = useQueryClient();
  const { addNotification } = useUIStore();

  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      projectsApi.updateName(id, name),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      queryClient.setQueryData(projectKeys.detail(data.id), data);
      addNotification("success", "Project updated successfully");
    },
    onError: (error: Error) => {
      addNotification("error", `Failed to update project: ${error.message}`);
    },
  });
}

/**
 * Hook to refresh all projects
 */
export function useRefreshProjects() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await queryClient.invalidateQueries({ queryKey: projectKeys.all });
      return true;
    },
  });
}
