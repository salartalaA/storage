"use client";

import { Search } from "lucide-react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";

export default function SearchLocation() {
  return (
    <motion.div
      className="group relative"
      initial={{
        opacity: 0,
        y: 12,
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      viewport={{
        amount: 0.2,
        once: true,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
    >
      <Search className="pointer-events-none absolute top-1/2 right-3.5 z-10 size-4 -translate-y-1/2 text-muted-foreground transition-colors duration-200 group-focus-within:text-primary" />

      <Input
        className="h-11 rounded-2xl border-foreground/8 bg-card/4.5 pr-10 text-sm shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-[18px] transition-all duration-300 placeholder:text-muted-foreground/80 hover:border-foreground/12 hover:bg-card/6 focus-visible:border-primary/40 focus-visible:bg-card/8 focus-visible:ring-4 focus-visible:ring-primary/10"
        placeholder="جستجوی نام مکان ..."
      />
    </motion.div>
  );
}
