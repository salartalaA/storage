"use client";

import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export const productFilterCategories = [
  {
    label: "ALL",
    value: "همه",
  },
  {
    label: "FOOD",
    value: "مواد غذایی",
  },
  {
    label: "DAIRY",
    value: "لبنیات",
  },
  {
    label: "BEVERAGE",
    value: "نوشیدنی",
  },
  {
    label: "SNACKS",
    value: "تنقلات",
  },
  {
    label: "SANITARY",
    value: "بهداشتی",
  },
] as const;

const statuses = [
  {
    label: "ALL",
    value: "همه",
  },
  {
    label: "IN_STOCK",
    value: "موجود",
  },
  {
    label: "OUT_OF_STOCK",
    value: "ناموجود",
  },
] as const;

export type Category = (typeof productFilterCategories)[number]["label"];

export type Status = (typeof statuses)[number]["label"];

const itemVariants = {
  hidden: {
    opacity: 0,
    x: 10,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

export default function ProductFilters({
  activeCategory,
  activeStatus,
  onCategoryChange,
  onStatusChange,
  productCount,
}: {
  activeCategory: Category;
  activeStatus: Status;
  onCategoryChange: (category: Category) => void;
  onStatusChange: (status: Status) => void;
  productCount: number;
}) {
  return (
    <motion.div
      animate="visible"
      className="flex flex-col gap-2.5"
      initial="hidden"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.02,
          },
        },
      }}
    >
      {/* Categories */}
      <motion.div
        className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-0.5"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.02,
            },
          },
        }}
      >
        {productFilterCategories.map((category) => {
          const active = activeCategory === category.label;

          return (
            <motion.div
              key={category.label}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              variants={itemVariants}
            >
              <Button
                className={`relative flex shrink-0 items-center gap-1.5 rounded-2xl px-3.5 py-1.5 font-medium text-xs transition-colors duration-200 ${
                  active
                    ? "text-primary-foreground"
                    : "border border-foreground/8 bg-card/4.5 text-muted-foreground hover:border-foreground/15 hover:bg-card/8 hover:text-foreground"
                }`}
                // biome-ignore lint/performance/noJsxPropsBind: No problem for performance
                onClick={() => onCategoryChange(category.label)}
              >
                {active && (
                  <motion.span
                    className="absolute inset-0 rounded-2xl bg-primary/90"
                    layoutId="active-category"
                    transition={{
                      damping: 35,
                      stiffness: 500,
                      type: "spring",
                    }}
                  />
                )}

                <span className="relative z-10">{category.value}</span>
              </Button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Status */}
      <div className="flex items-center justify-between gap-2">
        <motion.div
          className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-0.5"
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 0.04,
                staggerChildren: 0.02,
              },
            },
          }}
        >
          {statuses.map((status) => {
            const active = activeStatus === status.label;

            return (
              <motion.div
                key={status.label}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                variants={itemVariants}
              >
                <Button
                  className={`relative flex shrink-0 items-center gap-1.5 rounded-2xl px-3.5 py-1.5 font-medium text-xs transition-colors duration-200 ${
                    active
                      ? "text-primary-foreground"
                      : "border border-foreground/8 bg-card/4.5 text-muted-foreground hover:border-foreground/15 hover:bg-card/8 hover:text-foreground"
                  }`}
                  // biome-ignore lint/performance/noJsxPropsBind: No problem for performance
                  onClick={() => onStatusChange(status.label)}
                >
                  {active && (
                    <motion.span
                      className="absolute inset-0 rounded-2xl bg-primary/90"
                      layoutId="active-status"
                      transition={{
                        damping: 35,
                        stiffness: 500,
                        type: "spring",
                      }}
                    />
                  )}

                  <span className="relative z-10">{status.value}</span>
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Products count badge */}
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="flex w-fit shrink-0 items-center gap-1 rounded-full bg-primary/10 p-2 px-2.5 py-1 text-primary"
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{
            delay: 0.1,
            duration: 0.2,
            ease: "easeOut",
          }}
        >
          <div className="flex items-center gap-1">
            <ShoppingCart size={14} />

            <span className="text-xs">{"محصولات"}</span>
          </div>

          <span className="font-bold text-sm">
            {productCount.toLocaleString("fa-IR")}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
