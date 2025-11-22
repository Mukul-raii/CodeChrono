/**
 * Activities API Endpoints
 * Functions for managing activity logs
 */

import { graphqlRequest } from "../client";
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

    const data = await graphqlRequest<{ syncActivities: SyncResponse }>(
      mutation,
      {
        apiToken,
        logs: activities,
      }
    );
    return data.syncActivities;
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

    const data = await graphqlRequest<{ projectActivities: ActivityLog[] }>(
      query,
      { projectId, ...params }
    );
    return data.projectActivities;
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

    const data = await graphqlRequest<{ recentActivities: ActivityLog[] }>(
      query,
      { limit }
    );
    return data.recentActivities;
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

    const data = await graphqlRequest<{
      activitiesByDateRange: ActivityLog[];
    }>(query, {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
    return data.activitiesByDateRange;
  },
};
