"use client";

import { TimeRange } from "./AnalyticsContent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { formatDuration } from "@/lib/utils/index";

interface TimeLineChartProps {
  data: Array<{ date: string; duration: number }>;
  timeRange: TimeRange;
}

const chartConfig = {
  duration: {
    label: "Coding Time",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function TimeLineChart({ data, timeRange }: TimeLineChartProps) {
  // Filter and format data based on time range
  const now = new Date();
  now.setHours(23, 59, 59, 999); // End of today
  const filterDate = new Date();
  filterDate.setHours(0, 0, 0, 0); // Start of day

  if (timeRange === "day") {
    filterDate.setDate(now.getDate() - 7); // Last 7 days
  } else if (timeRange === "week") {
    filterDate.setDate(now.getDate() - 30); // Last 30 days
  } else {
    filterDate.setMonth(now.getMonth() - 6); // Last 6 months
  }

  const filteredData = data
    .filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= filterDate && itemDate <= now;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((item) => ({
      date: new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      duration: item.duration / 3600000, // Convert milliseconds to hours for Y-axis
      durationText: formatDuration(item.duration), // Use formatDuration for tooltip
    }));

  const totalTime = filteredData.reduce((acc, item) => acc + item.duration, 0);

  if (filteredData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Coding Time Over Time</CardTitle>
          <CardDescription>
            {timeRange === "day" && "Daily activity for the last 7 days"}
            {timeRange === "week" && "Weekly activity for the last 30 days"}
            {timeRange === "month" && "Monthly activity for the last 6 months"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            No activity data for this time range
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coding Time Over Time</CardTitle>
        <CardDescription>
          {timeRange === "day" && "Daily activity for the last 7 days"}
          {timeRange === "week" && "Weekly activity for the last 30 days"}
          {timeRange === "month" && "Monthly activity for the last 6 months"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={filteredData}
            margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value.toFixed(1)}h`}
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.3 }}
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => `Date: ${label}`}
                  formatter={(value, name, props) => (
                    <span>{props.payload.durationText}</span>
                  )}
                />
              }
            />
            <Bar
              dataKey="duration"
              fill="var(--chart-1)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Total: {formatDuration(totalTime * 3600000)}
        </div>
      </CardContent>
    </Card>
  );
}
