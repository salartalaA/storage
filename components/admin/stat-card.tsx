import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  description: string;
  icon: LucideIcon;
  iconClass: string;
  title: string;
  trend: string;
  trendClass: string;
  trendIcon: LucideIcon;
  value: string | number;
  valueClass: string;
}

export function StatCard({
  title,
  description,
  value,
  trend,
  icon: Icon,
  trendIcon: TrendIcon,
  iconClass,
  trendClass,
  valueClass,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-foreground/8 bg-card/4.5 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-[18px] transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/12 hover:bg-card/6.5 hover:shadow-[0_12px_45px_rgba(0,0,0,0.42)]">
      {/* Glass reflection */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/12 to-transparent" />
      {/* Subtle colored glow */}
      <div className="pointer-events-none absolute -top-12 -right-12 size-28 rounded-full bg-primary/4.5 blur-3xl transition-all duration-300 group-hover:bg-primary/8" />
      <div className="relative flex flex-col">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <span
            className={`rounded-xl p-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.18)] ring-1 backdrop-blur-md ring-${iconClass} ${iconClass}`}
          >
            <Icon size={19} strokeWidth={2} />
          </span>
          <div
            className={`flex items-center gap-x-1 rounded-full border border-foreground/5 bg-background/30 px-2 py-1 text-[11px] backdrop-blur-md ${trendClass}`}
          >
            <TrendIcon size={11} strokeWidth={2.5} /> <span>{trend}</span>
          </div>
        </div>
        {/* Value */}
        <span
          className={`mt-4 font-bold text-[1.7rem] leading-none tracking-tight ${valueClass}`}
        >
          {value}
        </span>
        {/* Description */}
        <div className="mt-3 flex flex-col gap-y-1">
          <span className="font-semibold text-foreground text-sm">{title}</span>
          <span className="text-[11px] text-muted-foreground">
            {description}
          </span>
        </div>
      </div>
    </div>
  );
}
