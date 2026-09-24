"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface AnimatedStatCardProps {
  children: ReactNode;
  index: number;
}

const cardDirections = [
  { x: 0, y: -24 },
  { x: -24, y: 0 },
  { x: 24, y: 0 },
  { x: 0, y: 24 },
] as const;

export function AnimatedStatCard({ children, index }: AnimatedStatCardProps) {
  const direction = cardDirections[index % cardDirections.length];

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
        x: direction.x,
        y: direction.y,
      }}
      transition={{
        delay: 0.1 + index * 0.08,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
      }}
    >
      {children}
    </motion.div>
  );
}
