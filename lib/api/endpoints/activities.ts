/**
 * Activities API Endpoints
 * Functions for managing activity logs
 */

import { apiClient } from "../client";
import type {
  ActivityLog,
  SyncActivityInput,
  SyncResponse,
  PaginationParams,
} from "../types";

export const activitiesApi = {
  /**
   * Sync activities from extension
   */
  sync: async (
    apiToken: string,
    activities: SyncActivityInput[]
  ): Promise<SyncResponse> => {
    const mutation = `
      mutation SyncActivities($apiToken: String!, $logs: [ActivityInput!]!) {
        syncActivities(apiToken: $apiToken, logs: $logs) {
          success
          syncedCount
          message
        }
      }
    `;

    const response = await apiClient.post("/graphql", {
      query: mutation,
      variables: {
        apiToken,
        logs: activities,
      },
    });
    return response.data.data.syncActivities;
  },

  /**
   * Get activities for a specific project
   */
  getByProject: async (
    projectId: string,
    params?: PaginationParams
  ): Promise<ActivityLog[]> => {
    const query = `
      query GetProjectActivities($projectId: ID!, $page: Int, $limit: Int) {
        projectActivities(projectId: $projectId, page: $page, limit: $limit) {
          id
          filePath
          language
          editor
          timestamp
          duration
          createdAt
        }
      }
    `;

    const response = await apiClient.post("/graphql", {
      query,
      variables: { projectId, ...params },
    });
    return response.data.data.projectActivities;
  },

  /**
   * Get recent activities
   */
  getRecent: async (limit: number = 10): Promise<ActivityLog[]> => {
    const query = `
      query GetRecentActivities($limit: Int!) {
        recentActivities(limit: $limit) {
          id
          filePath
          language
          editor
          timestamp
          duration
          createdAt
        }
      }
    `;

    const response = await apiClient.post("/graphql", {
      query,
      variables: { limit },
    });
    return response.data.data.recentActivities;
  },

  /**
   * Get activities by date range
   */
  getByDateRange: async (
    startDate: Date,
    endDate: Date
  ): Promise<ActivityLog[]> => {
    const query = `
      query GetActivitiesByDateRange($startDate: String!, $endDate: String!) {
        activitiesByDateRange(startDate: $startDate, endDate: $endDate) {
          id
          filePath
          language
          editor
          timestamp
          duration
          createdAt
        }
      }
    `;

    const response = await apiClient.post("/graphql", {
      query,
      variables: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    });
    return response.data.data.activitiesByDateRange;
  },
};
