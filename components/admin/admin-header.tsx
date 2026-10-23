"use client";

import { Calendar, LogOut, Store } from "lucide-react";
import { motion } from "motion/react";
import { logOutStore } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export default function AdminHeader() {
  const handleLogOut = async () => {
    await logOutStore();
  };

  return (
    <motion.header
      animate={{ opacity: 1, y: 0 }}
      className="group relative overflow-hidden rounded-3xl border border-foreground/8 bg-card/4.5 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.25)] backdrop-blur-xs transition-colors duration-300 hover:border-foreground/12 sm:shadow-[0_8px_40px_rgba(0,0,0,0.35)] sm:backdrop-blur-[18px]"
      initial={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glass reflection line */}
      <motion.div
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/12 to-transparent"
        initial={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <motion.span
            animate={{ opacity: 1, scale: 1 }}
            className="flex size-11 items-center justify-center rounded-xl border border-foreground/6 bg-card/70 p-2.5 shadow-[0_3px_12px_rgba(0,0,0,0.18)] sm:shadow-[0_4px_18px_rgba(0,0,0,0.22)] sm:backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.85 }}
            transition={{
              delay: 0.1,
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ rotate: -8, scale: 1.05 }}
          >
            <Store className="text-primary" size={20} />
          </motion.span>
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -8 }}
            transition={{
              delay: 0.15,
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h3 className="font-bold text-foreground">
              {"وقت بخیر، فروشگاه افق کوروش"}
            </h3>
            <div className="mt-1 flex items-center gap-x-2 text-muted-foreground text-xs">
              <Calendar size={14} /> <span>{"شنبه، ۲۲ شهریور ۱۴۰۴"}</span>
            </div>
          </motion.div>
        </div>
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.2, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.94 }}
        >
          <Button
            className="group size-10 rounded-xl border border-foreground/5 bg-card/60 text-muted-foreground shadow-none backdrop-blur-xs transition-colors duration-200 hover:bg-card/90 hover:text-foreground sm:backdrop-blur-md"
            onClick={handleLogOut}
            variant="ghost"
          >
            <motion.span transition={{ duration: 0.2 }} whileHover={{ x: -2 }}>
              <LogOut size={18} />
            </motion.span>
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}
