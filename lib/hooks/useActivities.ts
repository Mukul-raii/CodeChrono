/**
 * Activities Hooks
 * React Query hooks for activities data fetching
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { activitiesApi } from "../api";
import type {
  ActivityLog,
  SyncActivityInput,
  PaginationParams,
} from "../api/types";
import { useUIStore } from "../stores";

// Query keys for caching
export const activityKeys = {
  all: ["activities"] as const,
  byProject: (projectId: string, params?: PaginationParams) =>
    [...activityKeys.all, "project", projectId, params] as const,
  recent: (limit: number) => [...activityKeys.all, "recent", limit] as const,
  dateRange: (start: Date, end: Date) =>
    [
      ...activityKeys.all,
      "range",
      start.toISOString(),
      end.toISOString(),
    ] as const,
};

/**
 * Hook to fetch activities by project
 */
export function useProjectActivities(
  projectId: string,
  params?: PaginationParams
) {
  return useQuery<ActivityLog[]>({
    queryKey: activityKeys.byProject(projectId, params),
    queryFn: () => activitiesApi.getByProject(projectId, params),
    enabled: !!projectId,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}

/**
 * Hook to fetch recent activities
 */
export function useRecentActivities(limit: number = 10) {
  return useQuery<ActivityLog[]>({
    queryKey: activityKeys.recent(limit),
    queryFn: () => activitiesApi.getRecent(limit),
    staleTime: 1000 * 60 * 1, // 1 minute
    refetchInterval: 1000 * 60 * 2, // Refetch every 2 minutes
  });
}

/**
 * Hook to fetch activities by date range
 */
export function useActivitiesByDateRange(startDate: Date, endDate: Date) {
  return useQuery<ActivityLog[]>({
    queryKey: activityKeys.dateRange(startDate, endDate),
    queryFn: () => activitiesApi.getByDateRange(startDate, endDate),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Hook to sync activities from extension
 */
export function useSyncActivities() {
  const queryClient = useQueryClient();
  const { addNotification } = useUIStore();

  return useMutation({
    mutationFn: ({
      apiToken,
      activities,
    }: {
      apiToken: string;
      activities: SyncActivityInput[];
    }) => activitiesApi.sync(apiToken, activities),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: activityKeys.all });
      addNotification(
        "success",
        `Synced ${data.syncedCount} activities successfully`
      );
    },
    onError: (error: Error) => {
      addNotification("error", `Failed to sync activities: ${error.message}`);
    },
  });
}

/**
 * Hook to refresh activities
 */
export function useRefreshActivities() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await queryClient.invalidateQueries({ queryKey: activityKeys.all });
      return true;
    },
  });
}
