/**
 * Projects API Endpoints
 * Functions for managing projects
 */

import { graphqlRequest } from "../client";
import type { Project, PaginationParams } from "../types";

export const projectsApi = {
  /**
   * Get all projects for the current user
   */
  getAll: async (params?: PaginationParams): Promise<Project[]> => {
    const query = `
      query GetProjects {
        projects {
          id
          name
          path
          createdAt
          updatedAt
        }
      }
    `;

    const data = await graphqlRequest<{ projects: Project[] }>(
      query,
      params as Record<string, unknown>
    );
    return data.projects;
  },

  /**
   * Get a single project by ID
   */
  getById: async (id: string): Promise<Project> => {
    const query = `
      query GetProject($id: ID!) {
        project(id: $id) {
          id
          name
          path
          createdAt
          updatedAt
        }
      }
    `;

    const data = await graphqlRequest<{ project: Project }>(query, { id });
    return data.project;
  },

  /**
   * Get project statistics
   */
  getDetails: async (id: string) => {
    const query = `
      query GetProjectDetails($id: ID!) {
        projectDetails(id: $id) {
          id
          name
          path
          totalDuration
          activityCount
          topLanguages {
            language
            duration
            percentage
          }
          topFiles {
            filePath
            duration
          }
          dailyActivity {
            date
            duration
          }
          recentActivities {
            id
            filePath
            language
            duration
            timestamp
            editor
          }
        }
      }
    `;

    const data = await graphqlRequest<{
      projectDetails: {
        id: string;
        name: string;
        path: string;
        totalDuration: number;
        activityCount: number;
        topLanguages: Array<{
          language: string;
          duration: number;
          percentage: number;
        }>;
        topFiles: Array<{ filePath: string; duration: number }>;
        dailyActivity: Array<{ date: string; duration: number }>;
        recentActivities: Array<{
          id: string;
          filePath: string;
          language: string;
          duration: number;
          timestamp: string;
          editor: string;
        }>;
      };
    }>(query, { id });
    return data.projectDetails;
  },

  /**
   * Delete a project
   */
  delete: async (id: string): Promise<boolean> => {
    const mutation = `
      mutation DeleteProject($id: ID!) {
        deleteProject(id: $id)
      }
    `;

    const data = await graphqlRequest<{ deleteProject: boolean }>(mutation, {
      id,
    });
    return data.deleteProject;
  },

  /**
   * Update project name
   */
  updateName: async (id: string, name: string): Promise<Project> => {
    const mutation = `
      mutation UpdateProject($id: ID!, $name: String!) {
        updateProject(id: $id, name: $name) {
          id
          name
          path
          createdAt
          updatedAt
        }
      }
    `;

    const data = await graphqlRequest<{ updateProject: Project }>(mutation, {
      id,
      name,
    });
    return data.updateProject;
  },
};
