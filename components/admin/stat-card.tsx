import type { LucideIcon } from "lucide-react";

export interface StatCardProps {
  description: string;
  icon: LucideIcon;
  iconClass: string;
  title: string;
  value: string | number;
  valueClass: string;
}

export function StatCard({
  title,
  description,
  value,
  icon: Icon,
  iconClass,
  valueClass,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-foreground/8 bg-card/4.5 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/12 hover:bg-card/6.5 hover:shadow-[0_12px_45px_rgba(0,0,0,0.42)] sm:backdrop-blur-[18px]">
      {/* Glass reflection */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/12 to-transparent" />
      <div className="relative flex flex-col">
        <div className="flex items-center justify-between">
          <span
            className={`rounded-xl p-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.18)] ring-1 sm:backdrop-blur-md ring-${iconClass} ${iconClass}`}
          >
            <Icon size={19} strokeWidth={2} />
          </span>
        </div>

        <span
          className={`mt-4 font-bold text-[1.7rem] leading-none tracking-tight ${valueClass}`}
        >
          {value}
        </span>

        <div className="mt-3 flex flex-col gap-y-1">
          <span className="font-semibold text-foreground text-sm">{title}</span>
          <span className="text-muted-foreground text-xs">{description}</span>
        </div>
      </div>
    </div>
  );
}
