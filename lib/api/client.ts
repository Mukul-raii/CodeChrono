/**
 * API Client for CodeChrono
 * Centralized GraphQL client configuration
 */

import { GraphQLClient } from "graphql-request";

// GraphQL endpoint
const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/graphql`
  : "/api/graphql";

// Create GraphQL client with default configuration
export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
    "Content-Type": "application/json",
  },
  // Return errors as part of the response instead of throwing
  errorPolicy: "all",
});

/**
 * Helper function to set authentication token
 * Call this when user logs in or token changes
 */
export const setAuthToken = (token: string | null) => {
  if (token) {
    graphqlClient.setHeader("Authorization", `Bearer ${token}`);
  } else {
    graphqlClient.setHeader("Authorization", "");
  }
};

/**
 * Helper function to make GraphQL requests with error handling
 * @param query - GraphQL query or mutation string
 * @param variables - Variables for the query/mutation
 * @returns Response data
 */
export const graphqlRequest = async <T = unknown>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> => {
  try {
    const data = await graphqlClient.request<T>(query, variables);
    return data;
  } catch (error: unknown) {
    // Handle GraphQL errors
    if (error && typeof error === "object" && "response" in error) {
      const gqlError = error as {
        response?: { errors?: unknown[]; status?: number };
      };
      if (gqlError.response?.errors) {
        console.error("GraphQL Errors:", gqlError.response.errors);
      }
      // Handle network errors
      if (gqlError.response?.status === 401) {
        console.error("Unauthorized access - please login");
      }
    }
    throw error;
  }
};
