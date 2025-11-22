import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FolderGit2, Clock, Calendar, Code } from "lucide-react";
import { prisma } from "@/lib/prisma";

function formatDuration(ms: number) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
}

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  // @ts-expect-error - session user id
  const userId = session.user.id;

  // Fetch all projects with aggregated stats
  const projects = await prisma.project.findMany({
    where: {
      userId,
    },
    include: {
      activities: {
        select: {
          duration: true,
          language: true,
        },
      },
      commits: {
        select: {
          id: true,
        },
      },
      _count: {
        select: {
          activities: true,
          commits: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  // Calculate stats for each project
  const projectsWithStats = projects.map((project) => {
    const totalDuration = project.activities.reduce(
      (sum, activity) => sum + activity.duration,
      0
    );

    // Get unique languages
    const languageMap = new Map<string, number>();
    project.activities.forEach((activity) => {
      const current = languageMap.get(activity.language) || 0;
      languageMap.set(activity.language, current + activity.duration);
    });

    const topLanguages = Array.from(languageMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([language]) => language);

    return {
      ...project,
      totalDuration,
      topLanguages,
      activityCount: project._count.activities,
      commitCount: project._count.commits,
    };
  });

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Header */}
      <header
        className="border-b"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="p-2 rounded-lg hover:bg-opacity-80 transition-colors"
                style={{ background: "var(--surface-hover)" }}
              >
                <ArrowLeft
                  className="w-5 h-5"
                  style={{ color: "var(--text-primary)" }}
                />
              </Link>
              <div>
                <h1
                  className="text-2xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Projects
                </h1>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  View all your tracked projects and their analytics
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="px-4 py-2 rounded-lg"
                style={{
                  background: "var(--surface-hover)",
                  color: "var(--text-muted)",
                }}
              >
                <span className="text-sm font-medium">
                  {projectsWithStats.length}{" "}
                  {projectsWithStats.length === 1 ? "Project" : "Projects"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {projectsWithStats.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
              style={{ background: "var(--surface)" }}
            >
              <FolderGit2
                className="w-10 h-10"
                style={{ color: "var(--text-muted)" }}
              />
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              No Projects Yet
            </h3>
            <p
              className="text-center max-w-md mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              Start coding in VS Code with the CodeChrono extension to see your
              projects here.
            </p>
            <Link
              href="/dashboard"
              className="px-6 py-2.5 rounded-lg font-medium transition-colors"
              style={{
                background: "var(--primary)",
                color: "white",
              }}
            >
              Back to Dashboard
            </Link>
          </div>
        ) : (
          // Projects Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsWithStats.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group"
              >
                <div
                  className="p-6 rounded-xl border transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                  style={{
                    background: "var(--surface)",
                    borderColor: "var(--border)",
                  }}
                >
                  {/* Project Icon & Name */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                      style={{
                        background: "var(--primary)",
                        opacity: 0.1,
                      }}
                    >
                      <FolderGit2
                        className="w-6 h-6"
                        style={{ color: "var(--primary)" }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-semibold text-lg mb-1 truncate group-hover:text-opacity-80 transition-colors"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {project.name}
                      </h3>
                      <p
                        className="text-xs truncate"
                        style={{ color: "var(--text-muted)" }}
                        title={project.path}
                      >
                        {project.path}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock
                        className="w-4 h-4 shrink-0"
                        style={{ color: "var(--text-muted)" }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Total Time:
                      </span>
                      <span
                        className="text-sm font-semibold ml-auto"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {formatDuration(project.totalDuration)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Code
                        className="w-4 h-4 shrink-0"
                        style={{ color: "var(--text-muted)" }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Activities:
                      </span>
                      <span
                        className="text-sm font-semibold ml-auto"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {project.activityCount}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar
                        className="w-4 h-4 shrink-0"
                        style={{ color: "var(--text-muted)" }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Commits:
                      </span>
                      <span
                        className="text-sm font-semibold ml-auto"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {project.commitCount}
                      </span>
                    </div>
                  </div>

                  {/* Top Languages */}
                  {project.topLanguages.length > 0 && (
                    <div
                      className="pt-4 border-t"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <p
                        className="text-xs font-medium mb-2"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Top Languages
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.topLanguages.map((language) => (
                          <span
                            key={language}
                            className="px-2 py-1 rounded text-xs font-medium"
                            style={{
                              background: "var(--surface-hover)",
                              color: "var(--text-primary)",
                            }}
                          >
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Last Updated */}
                  <div
                    className="mt-4 pt-4 border-t"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Last updated:{" "}
                      {new Date(project.updatedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
