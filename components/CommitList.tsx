"use client";

import { GitCommit } from "@/lib/api/types";

interface CommitListProps {
  commits: GitCommit[];
}

export function CommitList({ commits }: CommitListProps) {
  const formatDuration = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!commits || commits.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No commits tracked yet. Start coding and making commits!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Git Commits</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Commit</th>
              <th>Message</th>
              <th>Author</th>
              <th>Branch</th>
              <th>Stats</th>
              <th>Time Spent</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {commits.map((commit) => (
              <tr key={commit.id} className="hover">
                <td>
                  <code className="text-xs bg-base-200 px-2 py-1 rounded">
                    {commit.commitHash.substring(0, 7)}
                  </code>
                </td>
                <td>
                  <div className="max-w-md truncate" title={commit.message}>
                    {commit.message}
                  </div>
                </td>
                <td>
                  <div className="text-sm">
                    <div className="font-medium">{commit.author}</div>
                    <div className="text-gray-500 text-xs">
                      {commit.authorEmail}
                    </div>
                  </div>
                </td>
                <td>
                  {commit.branch && (
                    <span className="badge badge-outline badge-sm">
                      {commit.branch}
                    </span>
                  )}
                </td>
                <td>
                  <div className="text-xs space-y-1">
                    <div className="flex items-center gap-1">
                      <span className="text-green-600">
                        +{commit.linesAdded}
                      </span>
                      <span className="text-red-600">
                        -{commit.linesDeleted}
                      </span>
                    </div>
                    <div className="text-gray-500">
                      {commit.filesChanged} files
                    </div>
                  </div>
                </td>
                <td>
                  <div className="text-sm">
                    <div className="font-semibold text-primary">
                      {formatDuration(commit.totalDuration)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {commit.activityCount} activities
                    </div>
                  </div>
                </td>
                <td className="text-sm text-gray-600">
                  {formatDate(commit.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
