"use client";

import { CalendarClock, TriangleAlert } from "lucide-react";
import { motion } from "motion/react";

interface ExpiringInventory {
  expirationDate: Date | null;
  id: string;
  isActive: boolean;
  product: {
    title: string;
    unit: string;
  };
  quantity: number;
}

interface ExpiringProductsProps {
  inventories: ExpiringInventory[];
}

const colorClasses = {
  destructive: {
    badge: "border-destructive/20 bg-destructive/15 text-destructive",
    icon: "bg-destructive/10 text-destructive",
  },
  warning: {
    badge: "border-warning/20 bg-warning/15 text-warning",
    icon: "bg-warning/10 text-warning",
  },
} as const;

function getDaysRemaining(expirationDate: Date): number {
  const today = new Date();
  const expiration = new Date(expirationDate);

  const todayUtc = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const expirationUtc = Date.UTC(
    expiration.getFullYear(),
    expiration.getMonth(),
    expiration.getDate()
  );

  return Math.round((expirationUtc - todayUtc) / 86_400_000);
}

function formatExpirationDate(date: Date): string {
  return new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    month: "long",
  }).format(date);
}

export default function ExpiringProducts({
  inventories,
}: ExpiringProductsProps) {
  const expiringInventories = inventories
    .filter((inventory) => {
      if (!(inventory.expirationDate && inventory.isActive)) {
        return false;
      }

      const daysRemaining = getDaysRemaining(inventory.expirationDate);

      return daysRemaining >= 0 && daysRemaining < 12;
    })
    // biome-ignore lint/style/noNonNullAssertion: Intentional
    .sort((a, b) => a.expirationDate!.getTime() - b.expirationDate!.getTime());

  const visibleInventories = expiringInventories.slice(0, 4);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl border border-foreground/8 bg-card/4.5 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-colors duration-300 hover:border-foreground/12 hover:bg-card/6.5 hover:shadow-[0_12px_45px_rgba(0,0,0,0.42)] md:backdrop-blur-[18px]"
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
    >
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
        <motion.div
          className="mb-4 flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="flex size-9 items-center justify-center rounded-xl bg-warning/10 text-warning"
              transition={{ damping: 10, stiffness: 400, type: "spring" }}
              whileHover={{ rotate: 12, scale: 1.1 }}
            >
              <TriangleAlert size={18} />
            </motion.div>

            <h3 className="font-semibold text-foreground">
              محصولات نزدیک به انقضا
            </h3>
          </div>

          <motion.span
            className="flex size-6 items-center justify-center rounded-full bg-warning/10 font-bold text-warning text-xs"
            initial={{ scale: 0 }}
            transition={{
              damping: 15,
              delay: 0.2,
              stiffness: 300,
              type: "spring",
            }}
            viewport={{ once: true }}
            whileInView={{ scale: 1 }}
          >
            {expiringInventories.length.toLocaleString("fa-IR")}
          </motion.span>
        </motion.div>

        {visibleInventories.length === 0 ? (
          <div className="flex min-h-28 flex-col items-center justify-center gap-2 py-5 text-center">
            <CalendarClock className="text-muted-foreground" size={24} />
            <p className="font-medium text-sm">محصولی نزدیک به انقضا ندارید.</p>
            <p className="text-muted-foreground text-xs">
              محصولات دارای انقضا در ۱۲ روز آینده اینجا نمایش داده می‌شوند.
            </p>
          </div>
        ) : (
          <div>
            {visibleInventories.map((inventory, index) => {
              const { expirationDate } = inventory;

              if (!expirationDate) {
                return null;
              }

              const daysRemaining = getDaysRemaining(expirationDate);
              const color = daysRemaining < 7 ? "destructive" : "warning";
              const colors = colorClasses[color];

              return (
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  key={inventory.id}
                  transition={{
                    delay: 0.15 + index * 0.08,
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center gap-3 py-2">
                    <motion.div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${colors.icon}`}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <CalendarClock size={18} />
                    </motion.div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-sm">
                        {inventory.product.title}
                      </p>

                      <div className="mt-0.5 flex items-center gap-2">
                        <span className="text-muted-foreground text-xs">
                          {formatExpirationDate(expirationDate)}
                        </span>

                        <span className="text-muted-foreground/40">•</span>

                        <span className="text-muted-foreground text-xs">
                          {inventory.quantity.toLocaleString("fa-IR")}{" "}
                          {inventory.product.unit}
                        </span>
                      </div>
                    </div>

                    <motion.div
                      className={`shrink-0 rounded-full border px-2.5 py-0.5 font-semibold text-xs ${colors.badge}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {daysRemaining === 0
                        ? "امروز"
                        : `${daysRemaining.toLocaleString("fa-IR")} روز`}
                    </motion.div>
                  </div>

                  {index < visibleInventories.length - 1 && (
                    <div className="h-px w-full bg-border/60" />
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}
