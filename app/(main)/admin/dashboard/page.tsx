import { Box, Boxes, Clock, TriangleAlert } from "lucide-react";
import { redirect } from "next/navigation";
import { getStoreAuditLogs } from "@/actions/audit";
import { getCurrentStore } from "@/actions/auth";
import { getDashboardStats } from "@/actions/dashboard";
import { getExpiringInventories, getInventories } from "@/actions/product";
import AdminHeader from "@/components/admin/admin-header";
import { AnimatedStatCard } from "@/components/admin/animated-stat-card";
import ExpiringProducts from "@/components/admin/expiring-products";
import InventoryValue from "@/components/admin/inventory-value";
import RecentActivities from "@/components/admin/recent-activities";
import { StatCard, type StatCardProps } from "@/components/admin/stat-card";
import StockStatus from "@/components/admin/stock-status";
import type { ProductCategory } from "@/schema/product";

// const stats: StatCardProps[] = [
//   {
//     description: "در ۱۸ دسته‌بندی",
//     icon: Box,
//     iconClass: "bg-primary/10 text-primary",
//     title: "کل محصولات",
//     value: "۲۴۵",
//     valueClass: "text-foreground",
//   },
//   {
//     description: "عدد در انبار",
//     icon: Boxes,
//     iconClass: "bg-success/10 text-success",
//     title: "موجودی کل",
//     value: "۴۸۲۰",
//     valueClass: "text-success",
//   },
//   {
//     description: "نیاز به سفارش",
//     icon: TriangleAlert,
//     iconClass: "bg-warning/10 text-warning",
//     title: "محصولات ناموجود",
//     value: "۱۲",
//     valueClass: "text-warning",
//   },
//   {
//     description: "تا ۷ روز آینده",
//     icon: Clock,
//     iconClass: "bg-destructive/10 text-destructive",
//     title: "رو به انقضا",
//     value: "۸",
//     valueClass: "text-destructive",
//   },
// ];

export default async function Dashboard() {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return redirect("/auth/login");
  }

  const recentActivities = await getStoreAuditLogs();

  const inventories = await getInventories();

  const categoryValues = inventories?.reduce<Record<string, number>>(
    (totals, inventory) => {
      const { category } = inventory.product;

      totals[category] =
        (totals[category] ?? 0) + inventory.quantity * inventory.unitPrice;

      return totals;
    },
    {}
  );

  // biome-ignore lint/style/noNonNullAssertion: Intentional
  const result = Object.entries(categoryValues!).map(([category, value]) => ({
    category: category as ProductCategory,
    value,
  }));

  const expiringInventories = await getExpiringInventories();

  const dashboardStats = await getDashboardStats();

  if (!dashboardStats) {
    return redirect("/auth/login");
  }

  const stats: StatCardProps[] = [
    {
      description: "محصول فعال در فروشگاه",
      icon: Box,
      iconClass: "bg-primary/10 text-primary",
      title: "کل محصولات",
      value: dashboardStats.activeProductCount.toLocaleString("fa-IR"),
      valueClass: "text-foreground",
    },
    {
      description: "مجموع تعداد واحدها",
      icon: Boxes,
      iconClass: "bg-success/10 text-success",
      title: "موجودی کل",
      value: dashboardStats.totalQuantity.toLocaleString("fa-IR"),
      valueClass: "text-success",
    },
    {
      description: "نیازمند تأمین موجودی",
      icon: TriangleAlert,
      iconClass: "bg-warning/10 text-warning",
      title: "محصولات ناموجود",
      value: dashboardStats.outOfStockProductCount.toLocaleString("fa-IR"),
      valueClass: "text-warning",
    },
    {
      description: "تا ۷ روز آینده",
      icon: Clock,
      iconClass: "bg-destructive/10 text-destructive",
      title: "رو به انقضا",
      value: dashboardStats.expiringInventoryCount.toLocaleString("fa-IR"),
      valueClass: "text-destructive",
    },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden px-3">
      <div className="relative z-10 my-6 flex w-full max-w-sm flex-col gap-y-4">
        <AdminHeader />

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            // const TrendIcon = stat.trendIcon;

            return (
              <AnimatedStatCard index={index} key={stat.title}>
                <StatCard
                  description={stat.description}
                  icon={Icon}
                  iconClass={stat.iconClass}
                  title={stat.title}
                  // trendClass={stat.trendClass}
                  // trendIcon={TrendIcon}
                  value={stat.value}
                  valueClass={stat.valueClass}
                />
              </AnimatedStatCard>
            );
          })}
        </div>

        <StockStatus data={dashboardStats.stockStatus} />

        {/* <ValueOfStock /> */}

        {/* biome-ignore lint/style/noNonNullAssertion: Intentional */}
        <InventoryValue categoryValues={result!} />

        <ExpiringProducts inventories={expiringInventories ?? []} />

        <RecentActivities activities={recentActivities} />
      </div>
    </main>
  );
}
