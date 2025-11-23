"use client";

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
import { Pie, PieChart, Cell, Legend } from "recharts";
import { formatDuration } from "@/lib/utils/index";

interface ProjectPieChartProps {
  projects: Array<{
    id: string;
    name: string;
    totalDuration: number;
  }>;
}

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function ProjectPieChart({ projects }: ProjectPieChartProps) {
  const totalTime = projects.reduce((acc, p) => acc + p.totalDuration, 0);

  if (totalTime === 0 || projects.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Time by Project</CardTitle>
          <CardDescription>
            Distribution of coding time across projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            No project data available
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = projects.slice(0, 5).map((project, index) => ({
    name: project.name,
    value: project.totalDuration, // Keep in milliseconds for accuracy
    duration: formatDuration(project.totalDuration), // Use formatDuration for consistency
    percentage: ((project.totalDuration / totalTime) * 100).toFixed(1),
    fill: COLORS[index % COLORS.length],
  }));

  const chartConfig = chartData.reduce((acc, item, index) => {
    acc[item.name] = {
      label: item.name,
      color: COLORS[index % COLORS.length],
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time by Project</CardTitle>
        <CardDescription>
          Distribution of coding time across projects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value, name, props) => (
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{props.payload.name}</span>
                      <span>{props.payload.duration}</span>
                      <span className="text-muted-foreground">
                        {props.payload.percentage}% of total
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ percentage }) => `${percentage}%`}
              outerRadius={100}
              innerRadius={60}
              dataKey="value"
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  stroke="var(--background)"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
