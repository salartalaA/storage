import {
  Box,
  Boxes,
  Clock,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
import AdminHeader from "@/components/admin/admin-header";
import { StatCard } from "@/components/admin/stat-card";

const stats = [
  {
    description: "در ۱۸ دسته‌بندی",
    icon: Box,
    iconClass: "bg-primary/10 text-primary",
    title: "کل محصولات",
    trend: "+۸",
    trendClass: "text-success",
    trendIcon: TrendingUp,
    value: "۲۴۵",
    valueClass: "text-foreground",
  },
  {
    description: "عدد در انبار",
    icon: Boxes,
    iconClass: "bg-success/10 text-success",
    title: "موجودی کل",
    trend: "+۳۲۰",
    trendClass: "text-success",
    trendIcon: TrendingUp,
    value: "۴۸۲۰",
    valueClass: "text-success",
  },
  {
    description: "نیاز به سفارش",
    icon: TriangleAlert,
    iconClass: "bg-warning/10 text-warning",
    title: "محصولات کم موجود",
    trend: "۳",
    trendClass: "text-warning",
    trendIcon: TrendingDown,
    value: "۱۲",
    valueClass: "text-warning",
  },
  {
    description: "تا ۷ روز آینده",
    icon: Clock,
    iconClass: "bg-destructive/10 text-destructive",
    title: "رو به انقضا",
    trend: "۲۰",
    trendClass: "text-destructive",
    trendIcon: TrendingDown,
    value: "۸",
    valueClass: "text-destructive",
  },
];

export default function Dashboard() {
  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden px-3">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 size-105 rounded-full bg-primary/12 blur-[130px]" />
        <div className="absolute -bottom-48 -left-32 size-110 rounded-full bg-primary/14 blur-[150px]" />
        <div className="absolute top-[28%] -right-48 size-110 rounded-full bg-primary/8 blur-[150px]" />
        <div className="absolute -right-32 -bottom-52 size-105 rounded-full bg-primary/12 blur-[140px]" />

        <div className="absolute top-[30%] -left-24 h-64 w-44 rotate-12 rounded-4xl border border-primary/8 bg-primary/2.5 backdrop-blur-sm" />
        <div className="absolute top-[18%] -right-24 h-72 w-48 -rotate-12 rounded-4xl border border-primary/8 bg-primary/2.5 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 flex w-full max-w-2xl flex-col gap-y-4">
        <AdminHeader />

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trendIcon;

            return (
              <StatCard
                description={stat.description}
                icon={Icon}
                iconClass={stat.iconClass}
                key={stat.title}
                title={stat.title}
                trend={stat.trend}
                trendClass={stat.trendClass}
                trendIcon={TrendIcon}
                value={stat.value}
                valueClass={stat.valueClass}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
