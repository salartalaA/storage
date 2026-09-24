"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    label: "ALL",
    value: "همه",
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
    label: "FOOD",
    value: "مواد غذایی",
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
    label: "LOW_STOCK",
    value: "کم موجود",
  },
  {
    label: "DISABLE",
    value: "غیرفعال",
  },
] as const;

type Category = (typeof categories)[number]["label"];

type Status = (typeof statuses)[number]["label"];

export default function ProductFilters() {
  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const [activeStatus, setActiveStatus] = useState<Status>("ALL");

  return (
    <div className="flex flex-col gap-2.5">
      {/* Categories */}
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto pb-0.5">
        {categories.map((category) => {
          const active = activeCategory === category.label;

          return (
            <Button
              className={`relative flex shrink-0 items-center gap-1.5 rounded-2xl px-3.5 py-1.5 font-medium text-xs transition-all duration-200 ${
                active
                  ? "text-primary-foreground"
                  : "border border-foreground/8 bg-card/4.5 text-muted-foreground backdrop-blur-[18px] hover:border-foreground/15 hover:bg-card/8 hover:text-foreground"
              }
              `}
              key={category.label}
              // biome-ignore lint/performance/noJsxPropsBind: No problem for performance
              onClick={() => setActiveCategory(category.label)}
            >
              {active && (
                <span className="absolute inset-0 rounded-2xl bg-primary/90" />
              )}

              <span className="relative z-10">{category.value}</span>
            </Button>
          );
        })}
      </div>

      {/* Status */}
      <div className="no-scrollbar flex items-center justify-between gap-2 overflow-x-auto pb-0.5">
        <div className="flex items-center gap-2">
          {statuses.map((status) => {
            const active = activeStatus === status.label;

            return (
              <Button
                className={`relative flex shrink-0 items-center gap-1.5 rounded-2xl px-3.5 py-1.5 font-medium text-xs transition-all duration-200 ${
                  active
                    ? "text-primary-foreground"
                    : "border border-foreground/8 bg-card/4.5 text-muted-foreground backdrop-blur-[18px] hover:border-foreground/15 hover:bg-card/8 hover:text-foreground"
                }
              `}
                key={status.label}
                // biome-ignore lint/performance/noJsxPropsBind: No problem for performance
                onClick={() => setActiveStatus(status.label)}
              >
                {active && (
                  <span className="absolute inset-0 rounded-2xl bg-primary/90" />
                )}

                <span className="relative z-10">{status.value}</span>
              </Button>
            );
          })}
        </div>

        {/* Products count badge */}
        <div className="flex w-fit items-center gap-1 rounded-full bg-primary/10 p-2 px-2.5 py-1 text-primary">
          <div className="flex items-center gap-1">
            <ShoppingCart size={14} />

            <span className="text-xs">{"محصولات"}</span>
          </div>

          <span className="font-bold text-sm">{"۱۵"}</span>
        </div>
      </div>
    </div>
  );
}
