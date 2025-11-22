/**
 * API Types and Interfaces
 * Shared types for API requests and responses
 */

export interface ActivityLog {
  id: string;
  projectId: string;
  filePath: string;
  language: string;
  editor?: string;
  timestamp: bigint | number;
  duration: number;
  commitId?: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  path: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  activities?: ActivityLog[];
}

export interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string;
  apiToken?: string;
}

export interface DashboardStats {
  totalTime: number;
  totalProjects: number;
  activeProjects: number;
  projects: Array<{
    id: string;
    name: string;
    path: string;
    totalDuration: number;
    activityCount: number;
    lastActive: number;
  }>;
  languages: Array<{
    language: string;
    duration: number;
    percentage: number;
  }>;
  dailyActivity: Array<{
    date: string;
    duration: number;
  }>;
  hourlyDistribution: Array<{
    hour: number;
    duration: number;
  }>;
}

export interface SyncActivityInput {
  projectPath: string;
  filePath: string;
  language: string;
  timestamp: number;
  duration: number;
  editor?: string;
  commitHash?: string;
}

export interface SyncResponse {
  success: boolean;
  syncedCount: number;
  message: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
