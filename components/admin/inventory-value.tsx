"use client";

import { motion } from "motion/react";

const inventoryValueData = [
  {
    category: "مواد غذایی",
    color: "bg-primary",
    value: 112,
  },
  {
    category: "نوشیدنی",
    color: "bg-success",
    value: 78,
  },
  {
    category: "بهداشتی",
    color: "bg-warning",
    value: 46,
  },
  {
    category: "قنادی",
    color: "bg-destructive",
    value: 31,
  },
  {
    category: "سایر",
    color: "bg-muted-foreground",
    value: 17,
  },
];

export default function InventoryValue() {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl border border-foreground/8 bg-card/4.5 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-[18px] transition-colors duration-300 hover:border-foreground/12 hover:bg-card/6.5 hover:shadow-[0_12px_45px_rgba(0,0,0,0.42)]"
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

      {/* Subtle colored glow */}
      <div className="pointer-events-none absolute -top-12 -right-12 size-28 rounded-full bg-primary/4.5 blur-3xl transition-all duration-300 group-hover:bg-primary/8" />

      <div className="relative">
        {/* Header */}
        <motion.div
          className="mb-5 flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className="font-semibold text-foreground">
            {"ارزش موجودی به تفکیک دسته"}
          </h3>

          <span className="rounded-full border border-foreground/6 bg-background/30 px-2.5 py-1 text-muted-foreground text-xs backdrop-blur-md">
            {"میلیون تومان"}
          </span>
        </motion.div>

        {/* Progress Bars List */}
        <div className="space-y-4">
          {inventoryValueData.map((item, index) => {
            const width = `${(item.value / 120) * 100}%`;

            return (
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -10 }}
                key={item.category}
                transition={{
                  delay: 0.15 + index * 0.05,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <span className="w-16 shrink-0 text-muted-foreground text-xs">
                  {item.category}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="h-3 min-w-0 flex-1 overflow-hidden rounded-full bg-muted/20">
                      <motion.div
                        className={`h-full max-w-full rounded-full ${item.color}`}
                        initial={{ width: 0 }}
                        transition={{
                          delay: 0.2 + index * 0.06,
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        viewport={{ once: true }}
                        whileInView={{ width }}
                      />
                    </div>

                    <span className="w-10 shrink-0 text-left font-medium text-[10px] text-foreground">
                      {item.value} م.ت
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Axis Ticks */}
        <motion.div
          className="mt-3 flex items-center gap-3"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}
        >
          <span className="w-16 shrink-0" />

          <div className="flex min-w-0 flex-1 justify-between pe-12 text-muted-foreground/50 text-xs">
            <span>{"۰ م.ت"}</span>
            <span>{"۳۰ م.ت"}</span>
            <span>{"۶۰ م.ت"}</span>
            <span>{"۹۰ م.ت"}</span>
            <span>{"۱۲۰ م.ت"}</span>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-4 flex items-center justify-between border-border/50 border-t pt-3"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <span className="text-muted-foreground text-xs">
            {"بیشترین ارزش موجودی"}
          </span>

          <span className="font-semibold text-foreground text-xs">
            {"مواد غذایی · ۱۱۲ م.ت"}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
