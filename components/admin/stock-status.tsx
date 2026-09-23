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

export default function StockStatus() {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-foreground/8 bg-card/4.5 p-4 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-[18px] transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/12 hover:bg-card/6.5 hover:shadow-[0_12px_45px_rgba(0,0,0,0.42)]">
      {/* Glass reflection */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/12 to-transparent" />
      {/* Subtle colored glow */}
      <div className="pointer-events-none absolute -top-12 -right-12 size-28 rounded-full bg-primary/4.5 blur-3xl transition-all duration-300 group-hover:bg-primary/8" />

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
