"use client";

import { FileChartColumnIncreasing } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartData = [
  {
    fill: "color-mix(in oklch, var(--primary) 90%, transparent)",
    products: 230,
    status: "inStock",
  },
  {
    fill: "color-mix(in oklch, var(--warning) 90%, transparent)",
    products: 12,
    status: "lowStock",
  },
  {
    fill: "color-mix(in oklch, var(--destructive) 90%, transparent)",
    products: 3,
    status: "closeToExpire",
  },
];

const chartConfig = {
  closeToExpire: {
    color: "var(--destructive)",
    label: "تاریخ انقضا",
  },
  inStock: {
    color: "var(--primary)",
    label: "موجود",
  },
  lowStock: {
    color: "var(--warning)",
    label: "کم موجود",
  },
} satisfies ChartConfig;

export function ChartPieLegend() {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-success/10 text-success">
            <FileChartColumnIncreasing size={18} />
          </span>

          <h3 className="font-semibold">{"وضعیت موجودی"}</h3>
        </div>

        <span className="text-muted-foreground text-xs">{"۲۴۵ محصول"}</span>
      </div>

      <ChartContainer
        className="mx-auto aspect-square max-h-[200px] w-full"
        config={chartConfig}
      >
        <PieChart>
          <Pie
            data={chartData}
            dataKey="products"
            innerRadius={52}
            outerRadius={80}
            stroke="var(--background)"
            strokeWidth={2}
          />

          <ChartLegend
            className="flex-wrap gap-4 pt-3 text-muted-foreground"
            content={<ChartLegendContent nameKey="status" />}
          />
        </PieChart>
      </ChartContainer>

      <div className="mt-2 flex justify-center gap-6">
        <div className="space-y-1 text-center">
          <p className="text-xs">{"نرخ موجودی"}</p>
          <p className="font-bold text-base text-primary">{"۹۴٪"}</p>
        </div>

        <div className="w-px bg-border/50" />

        <div className="space-y-1 text-center">
          <p className="text-xs">{"نرخ کمبود"}</p>
          <p className="font-bold text-base text-warning">{"۶٪"}</p>
        </div>
      </div>
    </div>
  );
}
