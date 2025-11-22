/**
 * Dashboard API Endpoints
 * Functions for fetching dashboard statistics and data
 */

import { apiClient } from "../client";
import type { DashboardStats } from "../types";

export const dashboardApi = {
  /**
   * Get dashboard statistics for the current user
   */
  getStats: async (): Promise<DashboardStats> => {
    const query = `
      query GetDashboardStats {
        dashboardStats {
          totalTime
          totalProjects
          activeProjects
          projects {
            id
            name
            path
            totalDuration
            activityCount
            lastActive
          }
          languages {
            language
            duration
            percentage
          }
          dailyActivity {
            date
            duration
          }
          hourlyDistribution {
            hour
            duration
          }
        }
      }
    `;

    const response = await apiClient.post("/graphql", { query });
    return response.data.data.dashboardStats;
  },

  /**
   * Get user profile information
   */
  getProfile: async () => {
    const query = `
      query GetProfile {
        me {
          id
          name
          email
          image
          apiToken
        }
      }
    `;

    const response = await apiClient.post("/graphql", { query });
    return response.data.data.me;
  },
};
