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
  now.setHours(23, 59, 59, 999);
  const startDate = new Date();
  startDate.setDate(now.getDate() - weeks * daysPerWeek);
  startDate.setHours(0, 0, 0, 0);

  // Create a map of date to duration
  const durationMap = new Map<string, number>();

  if (data && data.length > 0) {
    data.forEach((item) => {
      // Parse the date string properly
      const itemDate = new Date(item.date);
      const dateStr = itemDate.toISOString().split("T")[0];

      // Accumulate durations for the same date
      const existing = durationMap.get(dateStr) || 0;
      durationMap.set(dateStr, existing + item.duration);
    });
  }

  // Find max duration for color scaling
  const maxDuration = Math.max(...Array.from(durationMap.values()), 3600000); // At least 1 hour for scaling

  // Generate grid data
  const gridData: Array<Array<{ date: Date; duration: number }>> = [];

  for (let week = 0; week < weeks; week++) {
    const weekData: Array<{ date: Date; duration: number }> = [];
    for (let day = 0; day < daysPerWeek; day++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + week * daysPerWeek + day);

      // Skip future dates
      if (date > now) {
        weekData.push({ date, duration: 0 });
        continue;
      }

      const dateStr = date.toISOString().split("T")[0];
      const duration = durationMap.get(dateStr) || 0;
      weekData.push({ date, duration });
    }
    gridData.push(weekData);
  }

  const getIntensityStyle = (duration: number, isFuture: boolean) => {
    if (isFuture) {
      return {
        backgroundColor: "hsl(var(--muted))",
        opacity: 0.2,
        cursor: "default",
      };
    }

    if (duration === 0) {
      return {
        backgroundColor: "hsl(var(--muted))",
        opacity: 0.4,
      };
    }

    const intensity = Math.min(duration / maxDuration, 1);
    const baseColor = "hsl(var(--chart-1))";

    // Use opacity for intensity
    if (intensity < 0.2) return { backgroundColor: baseColor, opacity: 0.3 };
    if (intensity < 0.4) return { backgroundColor: baseColor, opacity: 0.5 };
    if (intensity < 0.6) return { backgroundColor: baseColor, opacity: 0.7 };
    if (intensity < 0.8) return { backgroundColor: baseColor, opacity: 0.85 };
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
        <div className="overflow-x-auto pb-2">
          <div className="inline-flex gap-1.5 min-w-full justify-center">
            {/* Day labels */}
            <div className="flex flex-col gap-1.5 text-xs text-muted-foreground justify-around py-1">
              {dayLabels.map((label, i) => (
                <div
                  key={i}
                  className="h-3 flex items-center justify-end pr-2 w-8"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Heatmap grid */}
            {gridData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1.5">
                {week.map((day, dayIndex) => {
                  const isFuture = day.date > now;
                  const hours = (day.duration / 3600000).toFixed(1);

                  return (
                    <div
                      key={dayIndex}
                      className="h-3 w-3 rounded-[3px] border transition-all hover:scale-125 hover:shadow-sm"
                      style={getIntensityStyle(day.duration, isFuture)}
                      title={
                        isFuture
                          ? `${day.date.toLocaleDateString()}: Future date`
                          : `${day.date.toLocaleDateString()}: ${hours} hours`
                      }
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-3 mt-6 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            <div
              className="h-3 w-3 rounded-[3px] border border-border/50"
              style={{ backgroundColor: "hsl(var(--muted))", opacity: 0.4 }}
              title="No activity"
            />
            <div
              className="h-3 w-3 rounded-[3px] border border-border/50"
              style={{ backgroundColor: "hsl(var(--chart-1))", opacity: 0.3 }}
              title="Light activity"
            />
            <div
              className="h-3 w-3 rounded-[3px] border border-border/50"
              style={{ backgroundColor: "hsl(var(--chart-1))", opacity: 0.5 }}
            />
            <div
              className="h-3 w-3 rounded-[3px] border border-border/50"
              style={{ backgroundColor: "hsl(var(--chart-1))", opacity: 0.7 }}
            />
            <div
              className="h-3 w-3 rounded-[3px] border border-border/50"
              style={{ backgroundColor: "hsl(var(--chart-1))", opacity: 0.85 }}
            />
            <div
              className="h-3 w-3 rounded-[3px] border border-border/50"
              style={{ backgroundColor: "hsl(var(--chart-1))", opacity: 1 }}
              title="Heavy activity"
            />
          </div>
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
}
