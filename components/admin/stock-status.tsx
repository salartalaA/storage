"use client";

import { FileChartColumnIncreasing } from "lucide-react";
import { motion } from "motion/react";
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
    status: "IN_STOCK",
  },
  {
    fill: "color-mix(in oklch, var(--warning) 90%, transparent)",
    products: 12,
    status: "LOW_STOCK",
  },
  {
    fill: "color-mix(in oklch, var(--destructive) 90%, transparent)",
    products: 3,
    status: "CLOSE_TO_EXPIRE",
  },
];

const chartConfig = {
  CLOSE_TO_EXPIRE: {
    color: "var(--destructive)",
    label: "تاریخ انقضا",
  },
  IN_STOCK: {
    color: "var(--primary)",
    label: "موجود",
  },
  LOW_STOCK: {
    color: "var(--warning)",
    label: "کم موجود",
  },
} satisfies ChartConfig;

export default function StockStatus() {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl border border-foreground/8 bg-card/4.5 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xs transition-colors duration-300 hover:border-foreground/12 hover:bg-card/6.5 hover:shadow-[0_12px_45px_rgba(0,0,0,0.42)] sm:backdrop-blur-[18px]"
      initial={{ opacity: 0, scale: 0.98, y: 16 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
    >
      {/* Glass reflection */}
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/12 to-transparent"
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      {/* Header */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-1 flex items-center justify-between"
        initial={{ opacity: 0, y: 10 }}
        transition={{
          delay: 0.1,
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="flex items-center gap-x-2">
          <motion.span
            className="flex size-9 items-center justify-center rounded-xl bg-success/10 text-success"
            transition={{ damping: 15, stiffness: 400, type: "spring" }}
            whileHover={{ rotate: 12, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileChartColumnIncreasing size={18} />
          </motion.span>

          <h3 className="font-semibold">{"وضعیت موجودی"}</h3>
        </div>

        <span className="text-muted-foreground text-xs">{"۲۴۵ محصول"}</span>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.92 }}
        transition={{
          delay: 0.18,
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <ChartContainer
          className="mx-auto aspect-square max-h-[200px] w-full"
          config={chartConfig}
        >
          <PieChart>
            <Pie
              animationDuration={900}
              animationEasing="ease-out"
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
      </motion.div>

      {/* Footer Stats */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mt-2 flex justify-center gap-6"
        initial={{ opacity: 0, y: 10 }}
        transition={{
          delay: 0.28,
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="space-y-1 text-center">
          <p className="text-muted-foreground text-xs">{"نرخ موجودی"}</p>
          <p className="font-bold text-base text-primary">{"۹۴٪"}</p>
        </div>

        <motion.div
          animate={{ opacity: 1, scaleY: 1 }}
          className="w-px bg-border/50"
          initial={{ opacity: 0, scaleY: 0 }}
          transition={{ delay: 0.32, duration: 0.4 }}
        />

        <div className="space-y-1 text-center">
          <p className="text-muted-foreground text-xs">{"نرخ کمبود"}</p>
          <p className="font-bold text-base text-warning">{"۶٪"}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
