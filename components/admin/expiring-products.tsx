"use client";

import { CalendarClock, TriangleAlert } from "lucide-react";
import { motion } from "motion/react";

const expiringProducts = [
  {
    color: "destructive",
    date: "۲۸ شهریور",
    days: "۶ روز",
    name: "شیر کاله",
    quantity: "۲۴ عدد",
  },
  {
    color: "warning",
    date: "۳۰ شهریور",
    days: "۸ روز",
    name: "ماست پگاه",
    quantity: "۱۸ عدد",
  },
  {
    color: "warning",
    date: "۲ مهر",
    days: "۱۰ روز",
    name: "نوشابه کوکا",
    quantity: "۴۸ عدد",
  },
  {
    color: "normal",
    date: "۵ مهر",
    days: "۱۳ روز",
    name: "پنیر لیقوان",
    quantity: "۱۲ عدد",
  },
] as const;

const colorClasses = {
  destructive: {
    badge: "border-destructive/20 bg-destructive/15 text-destructive",
    icon: "bg-destructive/10 text-destructive",
  },
  normal: {
    badge: "border-primary/20 bg-primary/15 text-primary",
    icon: "bg-primary/10 text-primary",
  },
  warning: {
    badge: "border-warning/20 bg-warning/15 text-warning",
    icon: "bg-warning/10 text-warning",
  },
};

export default function ExpiringProducts() {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl border border-foreground/8 bg-card/4.5 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-[18px] transition-colors duration-300 hover:border-foreground/12 hover:bg-card/6.5 hover:shadow-[0_12px_45px_rgba(0,0,0,0.42)]"
      initial={{ opacity: 0, scale: 0.98, y: 20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
    >
      {/* Glass reflection animation */}
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

      {/* Subtle colored glow */}
      <div className="pointer-events-none absolute -top-12 -right-12 size-28 rounded-full bg-primary/4.5 blur-3xl transition-all duration-300 group-hover:bg-primary/8" />

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
              className="flex size-9 items-center justify-center rounded-xl bg-warning/10 text-warning"
              transition={{ damping: 10, stiffness: 400, type: "spring" }}
              whileHover={{ rotate: 12, scale: 1.1 }}
            >
              <TriangleAlert size={18} />
            </motion.div>

            <h3 className="font-semibold text-foreground">
              {"محصولات نزدیک به انقضا"}
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
            {"۴"}
          </motion.span>
        </motion.div>

        {/* Product List */}
        <div>
          {expiringProducts.map((product, index) => {
            const colors = colorClasses[product.color];

            return (
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                key={product.name}
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
                      {product.name}
                    </p>

                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">
                        {product.date}
                      </span>

                      <span className="text-muted-foreground/40">•</span>

                      <span className="text-muted-foreground text-xs">
                        {product.quantity}
                      </span>
                    </div>
                  </div>

                  <motion.div
                    className={`shrink-0 rounded-full border px-2.5 py-0.5 font-semibold text-xs ${colors.badge}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {product.days}
                  </motion.div>
                </div>

                {index < expiringProducts.length - 1 && (
                  <div className="h-px w-full bg-border/60" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
