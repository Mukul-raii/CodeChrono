/**
 * Commits API Endpoints
 * Functions for managing git commits
 */

import { graphqlRequest } from "../client";
import type { GitCommit } from "../types";

export const commitsApi = {
  /**
   * Get commits for a specific project
   */
  getByProject: async (projectId: string): Promise<GitCommit[]> => {
    const query = `
      query GetProjectCommits($projectId: ID!) {
        projectDetails(id: $projectId) {
          commits {
            id
            commitHash
            message
            author
            authorEmail
            timestamp
            totalDuration
            filesChanged
            linesAdded
            linesDeleted
            branch
            activityCount
            createdAt
          }
        }
      }
    `;

    const data = await graphqlRequest<{
      projectDetails: { commits: GitCommit[] };
    }>(query, { projectId });
    return data.projectDetails.commits;
  },

  /**
   * Get commit details with activities
   */
  getCommitDetails: async (
    projectId: string,
    commitHash: string
  ): Promise<GitCommit | null> => {
    const commits = await commitsApi.getByProject(projectId);
    return commits.find((c) => c.commitHash === commitHash) || null;
  },
};
