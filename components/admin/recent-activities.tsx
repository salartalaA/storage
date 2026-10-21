"use client";

import {
  CircleArrowDown,
  CircleArrowUp,
  History,
  type LucideIcon,
  PackagePlus,
  Power,
  PowerOff,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { formatRelativeTime } from "@/lib/date";

export interface RecentActivityItem {
  action: string;
  createdAt: Date;
  details: string | null;
  id: string;
  productTitle: string;
  reason: string;
}

type ActivityColor = "success" | "destructive" | "normal";

interface ActivityConfig {
  amountFallback: string;
  color: ActivityColor;
  icon: LucideIcon;
  label: string;
}

const activityConfig: Record<string, ActivityConfig> = {
  INVENTORY_DECREASE: {
    amountFallback: "کاهش موجودی",
    color: "normal",
    icon: CircleArrowDown,
    label: "کاهش موجودی",
  },
  INVENTORY_INCREASE: {
    amountFallback: "افزایش موجودی",
    color: "success",
    icon: CircleArrowUp,
    label: "افزایش موجودی",
  },
  PRODUCT_CREATE: {
    amountFallback: "ثبت محصول",
    color: "success",
    icon: PackagePlus,
    label: "افزودن محصول",
  },
  PRODUCT_DELETE: {
    amountFallback: "حذف محصول",
    color: "destructive",
    icon: Trash2,
    label: "حذف محصول",
  },
  PRODUCT_DISABLE: {
    amountFallback: "غیرفعال شد",
    color: "destructive",
    icon: PowerOff,
    label: "غیرفعال‌سازی محصول",
  },
  PRODUCT_ENABLE: {
    amountFallback: "فعال شد",
    color: "success",
    icon: Power,
    label: "فعال‌سازی محصول",
  },
  PRODUCT_UPDATE: {
    amountFallback: "ویرایش مشخصات",
    color: "normal",
    icon: SlidersHorizontal,
    label: "ویرایش محصول",
  },
};

const fallbackConfig: ActivityConfig = {
  amountFallback: "تغییر ثبت شد",
  color: "normal",
  icon: SlidersHorizontal,
  label: "فعالیت",
};

const colorClasses = {
  destructive: {
    badge: "bg-destructive/10 text-destructive border-destructive/20",
    icon: "bg-destructive/10 text-destructive",
    text: "text-destructive",
  },
  normal: {
    badge: "bg-primary/10 text-primary border-primary/20",
    icon: "bg-primary/10 text-primary",
    text: "text-primary",
  },
  success: {
    badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    icon: "bg-emerald-500/10 text-emerald-500",
    text: "text-emerald-500",
  },
} as const;

export default function RecentActivities({
  activities,
}: {
  activities: RecentActivityItem[];
}) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl border border-foreground/8 bg-card/4.5 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-xs transition-colors duration-300 hover:border-foreground/12 hover:bg-card/6.5 hover:shadow-[0_12px_45px_rgba(0,0,0,0.42)] sm:backdrop-blur-[18px]"
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
    >
      {/* Glass reflection */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/12 to-transparent"
        initial={{ opacity: 0 }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
        viewport={{ once: true }}
        whileInView={{ opacity: [0.3, 0.8, 0.3] }}
      />

      <div className="relative">
        {/* Header */}
        <motion.div
          className="mb-4 flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary"
              transition={{ damping: 10, stiffness: 400, type: "spring" }}
              whileHover={{ rotate: -15, scale: 1.1 }}
            >
              <History size={18} />
            </motion.div>

            <h3 className="font-semibold text-foreground">
              {"فعالیت‌های اخیر"}
            </h3>
          </div>

          <span className="text-muted-foreground text-xs">
            {"آخرین تغییرات"}
          </span>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line Animation */}
          <motion.div
            className="absolute top-2 right-4.5 bottom-2 w-px origin-top bg-border/40"
            initial={{ scaleY: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            whileInView={{ scaleY: 1 }}
          />

          {activities.length === 0 && (
            <div className="relative z-10 rounded-2xl border border-foreground/7 border-dashed bg-foreground/2.5 px-4 py-8 text-center">
              <History className="mx-auto size-5 text-muted-foreground" />

              <p className="mt-2 text-muted-foreground text-xs">
                هنوز فعالیتی ثبت نشده است.
              </p>
            </div>
          )}

          <div className="space-y-4">
            {activities.map((activity, index) => {
              const config = activityConfig[activity.action] ?? fallbackConfig;
              const Icon = config.icon;
              const colors = colorClasses[config.color];

              return (
                <motion.div
                  className="relative flex items-start gap-3"
                  initial={{ opacity: 0, x: -15 }}
                  key={activity.id}
                  transition={{
                    delay: 0.2 + index * 0.08,
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, x: 0 }}
                >
                  <motion.div
                    className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-foreground/5 ${colors.icon}`}
                    initial={{ scale: 0 }}
                    transition={{
                      damping: 15,
                      delay: 0.25 + index * 0.08,
                      stiffness: 300,
                      type: "spring",
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.12 }}
                    whileInView={{ scale: 1 }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <Icon className="size-4" />
                  </motion.div>

                  <div className="min-w-0 flex-1 pt-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate font-medium text-sm">
                        {activity.productTitle}
                      </p>

                      <motion.span
                        className={`shrink-0 font-semibold text-xs ${colors.text}`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {activity.details || config.amountFallback}
                      </motion.span>
                    </div>

                    <div className="mt-0.5 flex items-center gap-2">
                      <span className={`font-medium text-xs ${colors.text}`}>
                        {config.label}
                      </span>

                      <span className="text-muted-foreground/40 text-xs">
                        •
                      </span>

                      <span
                        className="text-muted-foreground text-xs"
                        suppressHydrationWarning
                      >
                        {formatRelativeTime(activity.createdAt)}
                      </span>
                    </div>

                    <p
                      className="mt-0.5 truncate text-[10px] text-muted-foreground"
                      title={activity.reason}
                    >
                      دلیل: {activity.reason}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
