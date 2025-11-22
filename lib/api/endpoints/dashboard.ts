/**
 * Dashboard API Endpoints
 * Functions for fetching dashboard statistics and data
 */

import { graphqlRequest } from "../client";
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

    const data = await graphqlRequest<{ dashboardStats: DashboardStats }>(
      query
    );
    return data.dashboardStats;
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

    const data = await graphqlRequest<{
      me: {
        id: string;
        name: string;
        email: string;
        image?: string;
        apiToken?: string;
      };
    }>(query);
    return data.me;
  },
};
