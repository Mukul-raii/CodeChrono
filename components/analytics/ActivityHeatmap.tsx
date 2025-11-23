"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ActivityHeatmapProps {
  data: Array<{ date: string; duration: number }>;
}

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  // Create a heatmap for the last 12 weeks
  const weeks = 12;
  const daysPerWeek = 7;
  const now = new Date();
  const startDate = new Date();
  startDate.setDate(now.getDate() - weeks * daysPerWeek);

  // Create a map of date to duration
  const durationMap = new Map<string, number>();
  data.forEach((item) => {
    const dateStr = item.date.split("T")[0]; // Handle ISO string or date string
    durationMap.set(dateStr, item.duration);
  });

  // Find max duration for color scaling
  const maxDuration = Math.max(...Array.from(durationMap.values()), 1);

  // Generate grid data
  const gridData: Array<Array<{ date: Date; duration: number }>> = [];

  for (let week = 0; week < weeks; week++) {
    const weekData: Array<{ date: Date; duration: number }> = [];
    for (let day = 0; day < daysPerWeek; day++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + week * daysPerWeek + day);
      const dateStr = date.toISOString().split("T")[0];
      const duration = durationMap.get(dateStr) || 0;
      weekData.push({ date, duration });
    }
    gridData.push(weekData);
  }

  const getIntensityStyle = (duration: number) => {
    if (duration === 0) {
      return {
        backgroundColor: "hsl(var(--muted))",
        opacity: 0.5,
      };
    }
    const intensity = Math.min(duration / maxDuration, 1);
    const baseColor = "hsl(var(--chart-1))";

    // Use opacity for intensity
    if (intensity < 0.2) return { backgroundColor: baseColor, opacity: 0.2 };
    if (intensity < 0.4) return { backgroundColor: baseColor, opacity: 0.4 };
    if (intensity < 0.6) return { backgroundColor: baseColor, opacity: 0.6 };
    if (intensity < 0.8) return { backgroundColor: baseColor, opacity: 0.8 };
    return { backgroundColor: baseColor, opacity: 1 };
  };

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Heatmap</CardTitle>
        <CardDescription>
          Your coding activity over the last {weeks} weeks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="inline-flex gap-1">
            {/* Day labels */}
            <div className="flex flex-col gap-1 text-xs text-muted-foreground mr-2">
              {dayLabels.map((label, i) => (
                <div key={i} className="h-3 flex items-center">
                  {label}
                </div>
              ))}
            </div>

            {/* Heatmap grid */}
            {gridData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="h-3 w-3 rounded-sm border border-border/50 transition-all hover:scale-110 cursor-pointer"
                    style={getIntensityStyle(day.duration)}
                    title={`${day.date.toLocaleDateString()}: ${(
                      day.duration / 3600
                    ).toFixed(2)} hours`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            <div
              className="h-3 w-3 rounded-sm border border-border/50"
              style={{ backgroundColor: "hsl(var(--muted))", opacity: 0.5 }}
            />
            <div
              className="h-3 w-3 rounded-sm border border-border/50"
              style={{ backgroundColor: "hsl(var(--chart-1))", opacity: 0.2 }}
            />
            <div
              className="h-3 w-3 rounded-sm border border-border/50"
              style={{ backgroundColor: "hsl(var(--chart-1))", opacity: 0.4 }}
            />
            <div
              className="h-3 w-3 rounded-sm border border-border/50"
              style={{ backgroundColor: "hsl(var(--chart-1))", opacity: 0.6 }}
            />
            <div
              className="h-3 w-3 rounded-sm border border-border/50"
              style={{ backgroundColor: "hsl(var(--chart-1))", opacity: 0.8 }}
            />
            <div
              className="h-3 w-3 rounded-sm border border-border/50"
              style={{ backgroundColor: "hsl(var(--chart-1))", opacity: 1 }}
            />
          </div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}
