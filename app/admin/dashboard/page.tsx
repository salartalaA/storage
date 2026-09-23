import {
  Box,
  Boxes,
  Clock,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
import { redirect } from "next/navigation";
import { getCurrentStore } from "@/actions/auth";
import AdminHeader from "@/components/admin/admin-header";
import ExpiringProducts from "@/components/admin/expiring-products";
import InventoryValue from "@/components/admin/inventory-value";
import RecentActivities from "@/components/admin/recent-activities";
import { StatCard } from "@/components/admin/stat-card";
import StockStatus from "@/components/admin/stock-status";
import ValueOfStock from "@/components/admin/value-of-stock";

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

export default async function Dashboard() {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return redirect("/auth/login");
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden px-3">
      <div className="relative z-10 my-6 flex w-full max-w-2xl flex-col gap-y-4">
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

        <StockStatus />

        <InventoryValue />

        <ValueOfStock />

        <ExpiringProducts />

        <RecentActivities />
      </div>
    </main>
  );
}
