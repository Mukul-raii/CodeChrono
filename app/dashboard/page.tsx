import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ActivityController } from "@/lib/controllers/activity";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  LineChart,
  FileText,
  Box,
  Key,
  Settings,
  HelpCircle,
  LogOut,
  TrendingUp,
  ArrowUpRight,
  Clock,
  PauseCircle,
} from "lucide-react";

function formatDuration(ms: number) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  // @ts-expect-error - session user id
  const userId = session.user.id;
  // @ts-expect-error - session user apiToken
  const apiToken = session.user.apiToken;

  const stats = await ActivityController.getDashboardStats(userId);

  // Calculate mock stats for demo
  const totalProjects = stats.projects.length;
  const activeProjects = stats.projects.filter(
    (p) => p.totalDuration > 0
  ).length;
  const topLanguage = stats.languages[0]?.language || "N/A";

  return (
    <div
      className="flex min-h-screen"
      style={{ background: "var(--background)" }}
    >
      {/* Sidebar */}
      <aside
        className="w-64 border-r flex flex-col"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "var(--primary)" }}
            >
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span
              className="font-bold text-xl"
              style={{ color: "var(--text-primary)" }}
            >
              CodeChrono
            </span>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4">
          <div className="mb-6">
            <p
              className="text-xs font-semibold mb-3 px-3"
              style={{ color: "var(--text-muted)" }}
            >
              MENU
            </p>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors"
              style={{
                background: "var(--primary)",
                color: "white",
              }}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link
              href="/teams"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 hover:bg-gray-100 transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <Users className="w-5 h-5" />
              <span>Teams</span>
            </Link>
            <Link
              href="/projects"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 hover:bg-gray-100 transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <FolderKanban className="w-5 h-5" />
              <span>Projects</span>
            </Link>
            <Link
              href="/insights"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 hover:bg-gray-100 transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <LineChart className="w-5 h-5" />
              <span>Insights</span>
            </Link>
            <Link
              href="/reports"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 hover:bg-gray-100 transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <FileText className="w-5 h-5" />
              <span>Reports</span>
            </Link>
            <Link
              href="/components"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 hover:bg-gray-100 transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <Box className="w-5 h-5" />
              <span>Shareable Components</span>
            </Link>
            <Link
              href="/api"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <Key className="w-5 h-5" />
              <span>Get API</span>
            </Link>
          </div>

          <div>
            <p
              className="text-xs font-semibold mb-3 px-3"
              style={{ color: "var(--text-muted)" }}
            >
              GENERAL
            </p>
            <Link
              href="/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 hover:bg-gray-100 transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
            <Link
              href="/help"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 hover:bg-gray-100 transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <HelpCircle className="w-5 h-5" />
              <span>Help</span>
            </Link>
            <Link
              href="/api/auth/signout"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 transition-colors"
              style={{ color: "var(--error)" }}
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header
          className="h-20 border-b flex items-center justify-between px-8"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex-1">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search project"
                className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--background)",
                  color: "var(--text-primary)",
                }}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded"
                style={{
                  background: "var(--background)",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                ⌘ F
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              📧
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              🔔
            </button>
            <div
              className="flex items-center gap-3 pl-4 border-l"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="text-right">
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {session.user?.name || "User"}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {session.user?.email || ""}
                </p>
              </div>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ background: "var(--primary)" }}
              >
                {session.user?.name?.[0]?.toUpperCase() || "U"}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-8">
          {/* Title Section */}
          <div className="mb-8">
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Dashboard
            </h1>
            <p style={{ color: "var(--text-muted)" }}>
              Plan, prioritize, and accomplish your tasks with ease.
            </p>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              className="px-6 py-2.5 rounded-lg font-medium transition-colors"
              style={{
                background: "var(--primary)",
                color: "white",
              }}
            >
              + Add Project
            </button>
            <button
              className="px-6 py-2.5 rounded-lg border font-medium hover:bg-gray-50 transition-colors"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            >
              Import Data
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {/* Total Projects */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--primary)" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-white/80 text-sm mb-1">Total Projects</p>
                  <p className="text-4xl font-bold text-white">
                    {totalProjects}
                  </p>
                </div>
                <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Increased from last month</span>
              </div>
            </div>

            {/* Active Projects */}
            <div
              className="rounded-xl p-6 border"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p
                    className="text-sm mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Active Projects
                  </p>
                  <p
                    className="text-4xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {activeProjects}
                  </p>
                </div>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  style={{ background: "var(--background)" }}
                >
                  <ArrowUpRight
                    className="w-5 h-5"
                    style={{ color: "var(--text-secondary)" }}
                  />
                </button>
              </div>
              <div
                className="flex items-center gap-2"
                style={{ color: "var(--text-muted)" }}
              >
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Increased from last month</span>
              </div>
            </div>

            {/* Total Time */}
            <div
              className="rounded-xl p-6 border"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p
                    className="text-sm mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Total Coding Time
                  </p>
                  <p
                    className="text-4xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {formatDuration(stats.totalDuration)}
                  </p>
                </div>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  style={{ background: "var(--background)" }}
                >
                  <ArrowUpRight
                    className="w-5 h-5"
                    style={{ color: "var(--text-secondary)" }}
                  />
                </button>
              </div>
              <div
                className="flex items-center gap-2"
                style={{ color: "var(--text-muted)" }}
              >
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Increased from last month</span>
              </div>
            </div>

            {/* Top Language */}
            <div
              className="rounded-xl p-6 border"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p
                    className="text-sm mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Top Language
                  </p>
                  <p
                    className="text-4xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {topLanguage}
                  </p>
                </div>
                <button
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                  style={{ background: "var(--background)" }}
                >
                  <ArrowUpRight
                    className="w-5 h-5"
                    style={{ color: "var(--text-secondary)" }}
                  />
                </button>
              </div>
              <div
                className="flex items-center gap-2"
                style={{ color: "var(--text-secondary)" }}
              >
                <span className="text-sm">On Discuss</span>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Project Analytics */}
            <div
              className="col-span-2 rounded-xl p-6 border"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <h2
                className="text-lg font-semibold mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                Project Analytics
              </h2>
              <div className="flex items-end justify-around h-48">
                {stats.projects.slice(0, 7).map((project, index) => {
                  const maxDuration = Math.max(
                    ...stats.projects.map((p) => p.totalDuration)
                  );
                  const height =
                    maxDuration > 0
                      ? (project.totalDuration / maxDuration) * 100
                      : 10;
                  const days = ["M", "T", "W", "T", "F", "S", "S"];

                  return (
                    <div
                      key={project.id}
                      className="flex flex-col items-center gap-2 flex-1"
                    >
                      <div
                        className="w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                        style={{
                          height: `${Math.max(height, 10)}%`,
                          background:
                            index % 2 === 0
                              ? "var(--primary)"
                              : "var(--primary-light)",
                          maxWidth: "60px",
                        }}
                        title={`${project.name}: ${formatDuration(
                          project.totalDuration
                        )}`}
                      />
                      <span
                        className="text-sm"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {days[index % 7]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Time Tracker */}
            <div
              className="rounded-xl p-6 text-white"
              style={{ background: "var(--primary-dark)" }}
            >
              <h2 className="text-lg font-semibold mb-8">Time Tracker</h2>
              <div className="text-center mb-8">
                <div className="text-5xl font-bold mb-4">
                  {formatDuration(stats.totalDuration)}
                </div>
                <div className="flex gap-3 justify-center">
                  <button className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                    <PauseCircle className="w-6 h-6" />
                  </button>
                  <button className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors">
                    <div className="w-3 h-3 bg-white rounded-sm" />
                  </button>
                </div>
              </div>
            </div>

            {/* Projects List */}
            <div
              className="col-span-2 rounded-xl p-6 border"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Projects
                </h2>
                <button
                  className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50 transition-colors"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                  }}
                >
                  + New
                </button>
              </div>
              <div className="space-y-3">
                {stats.projects.length === 0 ? (
                  <p
                    className="text-center py-8"
                    style={{ color: "var(--text-muted)" }}
                  >
                    No projects tracked yet
                  </p>
                ) : (
                  stats.projects.slice(0, 5).map((project) => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.id}`}
                      className="flex items-center gap-4 p-4 rounded-lg border hover:shadow-sm transition-all cursor-pointer"
                      style={{
                        borderColor: "var(--border)",
                        background: "var(--background)",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: "var(--primary)" }}
                      >
                        <span className="text-white font-semibold">
                          {project.name[0]?.toUpperCase() || "P"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-medium truncate"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {project.name}
                        </p>
                        <p
                          className="text-sm truncate"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {project.path}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className="text-sm font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {formatDuration(project.totalDuration)}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>

            {/* Languages */}
            <div
              className="rounded-xl p-6 border"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <h2
                className="text-lg font-semibold mb-6"
                style={{ color: "var(--text-primary)" }}
              >
                Languages
              </h2>
              <div className="space-y-4">
                {stats.languages.length === 0 ? (
                  <p
                    className="text-center py-8"
                    style={{ color: "var(--text-muted)" }}
                  >
                    No data yet
                  </p>
                ) : (
                  stats.languages.slice(0, 5).map((lang, index) => {
                    const totalLangTime = stats.languages.reduce(
                      (sum, l) => sum + l.totalDuration,
                      0
                    );
                    const percentage =
                      totalLangTime > 0
                        ? Math.round((lang.totalDuration / totalLangTime) * 100)
                        : 0;

                    return (
                      <div key={lang.language}>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="text-sm font-medium"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {lang.language}
                          </span>
                          <span
                            className="text-sm"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {percentage}%
                          </span>
                        </div>
                        <div
                          className="h-2 rounded-full overflow-hidden"
                          style={{ background: "var(--background)" }}
                        >
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${percentage}%`,
                              background:
                                index === 0
                                  ? "var(--primary)"
                                  : "var(--primary-light)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* API Token Section */}
          <div
            className="mt-8 rounded-xl p-6 border"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Your API Token
            </h3>
            <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
              Use this token in your VS Code extension to sync your data.
            </p>
            <code
              className="block px-4 py-3 rounded-lg font-mono text-sm select-all"
              style={{
                background: "var(--background)",
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
              }}
            >
              {apiToken}
            </code>
          </div>
        </main>
      </div>
    </div>
  );
}
