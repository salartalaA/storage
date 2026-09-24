"use client";

import { TrendingUp, Wallet } from "lucide-react";
import { motion } from "motion/react";
import { ChartAreaGradient } from "./chart-area-gradient";

export default function ValueOfStock() {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl border border-foreground/8 bg-card/4.5 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-[18px] transition-colors duration-300 hover:border-foreground/12 hover:bg-card/6.5 hover:shadow-[0_12px_45px_rgba(0,0,0,0.42)]"
      initial={{ opacity: 0, scale: 0.98, y: 16 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
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
          className="mb-5 flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-x-2">
            <motion.span
              className="flex size-9 items-center justify-center rounded-xl bg-success/10 text-success"
              transition={{ damping: 15, stiffness: 400, type: "spring" }}
              whileHover={{ rotate: 12, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Wallet size={18} />
            </motion.span>

            <h3 className="font-semibold text-base">{"ارزش موجودی"}</h3>
          </div>

          <span className="text-muted-foreground text-xs">{"۴ ماه اخیر"}</span>
        </motion.div>

        {/* Main Value */}
        <motion.div
          className="mb-5 flex items-end gap-x-3"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.18, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div>
            <p className="text-muted-foreground text-xs">{"ارزش کل موجودی"}</p>

            <p className="mt-1 font-bold text-xl tracking-tight">
              {"۲۸۵ میلیون"}{" "}
              <span className="text-muted-foreground text-xs">{"تومان"}</span>
            </p>
          </div>

          <motion.div
            className="ms-auto flex items-center gap-x-1 rounded-full bg-success/10 px-2.5 py-1 text-success"
            initial={{ opacity: 0, scale: 0.85 }}
            transition={{
              damping: 20,
              delay: 0.22,
              stiffness: 350,
              type: "spring",
            }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <TrendingUp size={13} />
            </motion.div>

            <span className="font-medium text-xs">{"۹.۶٪ رشد"}</span>
          </motion.div>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          transition={{ delay: 0.26, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <ChartAreaGradient />
        </motion.div>

        <motion.div
          className="my-4 h-px bg-border"
          initial={{ opacity: 0, scaleX: 0.95 }}
          transition={{ delay: 0.32, duration: 0.4 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, scaleX: 1 }}
        />

        {/* Footer */}
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.38, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div>
            <p className="text-muted-foreground text-xs">
              {"میانگین قیمت محصولات"}
            </p>

            <p className="mt-1 font-bold text-lg">{"۱,۱۶۳,۲۶۵ تومان"}</p>
          </div>

          <div className="text-left">
            <p className="text-muted-foreground text-xs">{"ارزش سرانه"}</p>

            <p className="mt-1 font-bold text-lg text-success">{"۱۶٪"}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
