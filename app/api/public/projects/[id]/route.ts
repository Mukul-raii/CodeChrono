import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const apiKey = searchParams.get("apiKey");

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is required" },
        { status: 401 }
      );
    }

    // Find user by API key
    const user = await prisma.user.findFirst({
      where: { apiToken: apiKey },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    }

    // Fetch project
    const project = await prisma.project.findFirst({
      where: {
        id,
        userId: user.id,
      },
      include: {
        activities: {
          orderBy: { timestamp: "desc" },
        },
        commits: {
          orderBy: { timestamp: "desc" },
          take: 20,
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Calculate statistics
    const totalDuration = project.activities.reduce(
      (sum, a) => sum + a.duration,
      0
    );

    // Language breakdown
    const languageMap = new Map<string, number>();
    project.activities.forEach((activity) => {
      const current = languageMap.get(activity.language) || 0;
      languageMap.set(activity.language, current + activity.duration);
    });
    const languages = Array.from(languageMap.entries())
      .map(([language, duration]) => ({
        name: language,
        duration,
        percent: totalDuration > 0 ? (duration / totalDuration) * 100 : 0,
        color: getLanguageColor(language),
      }))
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 5);

    // Activity trend (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      d.setHours(0, 0, 0, 0);
      return d;
    });

    const trend = last7Days.map((date) => {
      const dayActivities = project.activities.filter((a) => {
        const aDate = new Date(Number(a.timestamp));
        aDate.setHours(0, 0, 0, 0);
        return aDate.getTime() === date.getTime();
      });
      const duration = dayActivities.reduce((sum, a) => sum + a.duration, 0);
      return Math.round(duration / 3600000); // Convert to hours
    });

    // Format response
    const response = {
      name: project.name,
      description: `Coding project tracked with Miss-Minutes`,
      timeSpent: formatDuration(totalDuration),
      commits: project.commits.length,
      lastActive: getRelativeTime(
        project.activities[0]?.timestamp
          ? Number(project.activities[0].timestamp)
          : Date.now()
      ),
      languages,
      trend,
      stats: {
        totalDuration,
        totalActivities: project.activities.length,
        totalCommits: project.commits.length,
        firstActivity: project.activities[project.activities.length - 1]
          ?.timestamp
          ? Number(project.activities[project.activities.length - 1].timestamp)
          : null,
        lastActivity: project.activities[0]?.timestamp
          ? Number(project.activities[0].timestamp)
          : null,
      },
    };

    // Add CORS headers for embedding
    return NextResponse.json(response, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error fetching project stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function formatDuration(ms: number): string {
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m`;
  }
  return `${Math.floor(ms / 1000)}s`;
}

function getRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return "just now";
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    TypeScript: "#3178C6",
    JavaScript: "#F7DF1E",
    Rust: "#DEA584",
    Python: "#3776AB",
    Go: "#00ADD8",
    Java: "#007396",
    CSS: "#563D7C",
    HTML: "#E34F26",
    JSON: "#292929",
    Markdown: "#083FA1",
  };
  return colors[language] || "#808080";
}
