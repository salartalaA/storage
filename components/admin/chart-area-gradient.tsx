"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "اردیبهشت", value: 210 },
  { month: "خرداد", value: 225 },
  { month: "تیر", value: 250 },
  { month: "مرداد", value: 265 },
];

const chartConfig = {
  value: {
    color: "var(--success)",
    label: "ارزش (میلیون تومان)",
  },
} satisfies ChartConfig;

export function ChartAreaGradient() {
  return (
    <div className="h-40 w-full">
      <ChartContainer className="h-full w-full" config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            bottom: 0,
            left: 8,
            right: 8,
            top: 10,
          }}
        >
          <CartesianGrid
            className="stroke-border/30"
            strokeDasharray="3 4"
            vertical={false}
          />

          <XAxis
            axisLine={false}
            dataKey="month"
            tick={{ fontSize: 12 }}
            tickLine={false}
            tickMargin={8}
          />

          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />

          <defs>
            <linearGradient id="fillMobile" x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-value)"
                stopOpacity={0.35}
              />

              <stop
                offset="100%"
                stopColor="var(--color-value)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          <Area
            dataKey="value"
            fill="url(#fillMobile)"
            fillOpacity={0.7}
            stroke="var(--color-value)"
            strokeWidth={2.5}
            type="natural"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
