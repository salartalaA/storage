"use client";

import { motion, useReducedMotion } from "motion/react";

export default function NoLocationCard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="mt-4 flex flex-col items-center justify-center gap-2 rounded-3xl border border-foreground/8 bg-card/4.5 p-3 py-6"
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98, y: 12 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className="font-semibold text-sm"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        در حال حاضر مکانی ندارید!
      </motion.p>

      <motion.p
        animate={{ opacity: 1, y: 0 }}
        className="font-semibold text-muted-foreground text-xs"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
        transition={{ delay: 0.18, duration: 0.3 }}
      >
        با کلیک روی افزودن مکان می‌توانید اطلاعات مکان را وارد کنید.
      </motion.p>
    </motion.div>
  );
}
