/**
 * Dashboard Hooks
 * React Query hooks for dashboard data fetching
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardApi } from "../api";
import type { DashboardStats } from "../api/types";

// Query keys for caching
export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
  profile: () => [...dashboardKeys.all, "profile"] as const,
};

/**
 * Hook to fetch dashboard statistics
 */
export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: dashboardKeys.stats(),
    queryFn: () => dashboardApi.getStats(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true,
  });
}

/**
 * Hook to fetch user profile
 */
export function useProfile() {
  return useQuery({
    queryKey: dashboardKeys.profile(),
    queryFn: () => dashboardApi.getProfile(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

/**
 * Hook to refresh dashboard data
 */
export function useRefreshDashboard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
      return true;
    },
  });
}
