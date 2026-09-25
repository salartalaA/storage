"use client";

import { Barcode, CalendarDays, MapPin } from "lucide-react";
import { motion, type Transition } from "motion/react";
import Image from "next/image";
import ActionButtons from "@/components/admin/manage-products/action-buttons";

export interface StockItem {
  barcode: string;
  category: string;
  id: string;
  image: string;
  lastUpdated: string;
  location: string;
  quantity: number | string;
  status: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  title: string;
  unit?: string;
}

const statusStyles = {
  IN_STOCK: {
    badge: "border-success/15 bg-success/8 text-success",
    label: "موجود",
    quantity: "text-success",
    text: "text-success",
  },
  LOW_STOCK: {
    badge: "border-warning/15 bg-warning/8 text-warning",
    label: "کم موجود",
    quantity: "text-warning",
    text: "text-warning",
  },
  OUT_OF_STOCK: {
    badge: "border-foreground/8 bg-foreground/5 text-muted-foreground",
    label: "ناموجود",
    quantity: "text-muted-foreground",
    text: "text-muted-foreground",
  },
};

const viewport = {
  amount: 0.15,
  once: true,
};

const transition: Transition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1],
};

export function StockItemCard({ item }: { item: StockItem }) {
  const status = statusStyles[item.status] ?? statusStyles.OUT_OF_STOCK;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl border border-foreground/8 bg-card/4.5 p-4 shadow-[0_8px_40px_rgba(0,0,0,0.3)] backdrop-blur-[18px] transition-all duration-300 hover:border-foreground/12 hover:bg-card/6 hover:shadow-[0_10px_42px_rgba(0,0,0,0.35)]"
      initial={{ opacity: 0 }}
      transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
      viewport={viewport}
      whileInView={{ opacity: 1 }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent" />

      <div className="flex flex-col gap-3.5">
        <div className="flex items-start justify-between gap-4">
          <motion.div
            className="flex min-w-0 items-center gap-2.5"
            initial={{ opacity: 0, x: -30 }}
            transition={{ ...transition, delay: 0.15 }}
            viewport={viewport}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7, x: -20 }}
              transition={{ ...transition, delay: 0.19 }}
              viewport={viewport}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
            >
              <Image
                alt={item.title}
                className="pointer-events-none rounded-xl object-cover"
                height={40}
                src={item.image}
                width={40}
              />
            </motion.div>

            <motion.div
              className="min-w-0"
              initial={{ opacity: 0, y: -12 }}
              transition={{ ...transition, delay: 0.23 }}
              viewport={viewport}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h3 className="truncate font-semibold text-foreground text-sm">
                {item.title}
              </h3>

              <div className="mt-1 flex items-center gap-1.5">
                <motion.span
                  className="text-muted-foreground text-xs"
                  initial={{ opacity: 0, y: 8 }}
                  transition={{ ...transition, delay: 0.27 }}
                  viewport={viewport}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  {item.category}
                </motion.span>

                <span className="text-foreground/20">•</span>

                <motion.span
                  className={`rounded-lg border px-1.5 py-0.5 font-medium text-xs ${status.badge}`}
                  initial={{ opacity: 0, scale: 0.8, x: 12 }}
                  transition={{ ...transition, delay: 0.31 }}
                  viewport={viewport}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                >
                  {status.label}
                </motion.span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center justify-end gap-1"
            initial={{ opacity: 0, x: 30 }}
            transition={{ ...transition, delay: 0.18 }}
            viewport={viewport}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <span
              className={`font-bold text-xl tabular-nums leading-none ${status.quantity}`}
            >
              {item.quantity}
            </span>

            <motion.span
              className="text-muted-foreground text-xs"
              initial={{ opacity: 0, y: 8 }}
              transition={{ ...transition, delay: 0.22 }}
              viewport={viewport}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {item.unit ?? "عدد"}
            </motion.span>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-2 rounded-xl border border-foreground/6 bg-foreground/2.5 px-3 py-2.5 sm:grid-cols-2"
          initial={{ opacity: 0, y: 20 }}
          transition={{ ...transition, delay: 0.25 }}
          viewport={viewport}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className="flex min-w-0 items-center gap-1.5"
            initial={{ opacity: 0, x: -18 }}
            transition={{ ...transition, delay: 0.31 }}
            viewport={viewport}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <Barcode className="size-3.5 shrink-0 text-muted-foreground" />

            <span className="ltr truncate font-mono text-muted-foreground text-xs tracking-wide">
              {item.barcode}
            </span>
          </motion.div>

          <motion.div
            className="flex min-w-0 items-center gap-1.5 sm:justify-end"
            initial={{ opacity: 0, x: 18 }}
            transition={{ ...transition, delay: 0.35 }}
            viewport={viewport}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <MapPin className="size-3.5 shrink-0 text-muted-foreground" />

            <span className="truncate text-muted-foreground text-xs">
              {item.location}
            </span>
          </motion.div>

          <motion.div
            className="flex min-w-0 items-center gap-1.5 sm:col-span-2"
            initial={{ opacity: 0, y: 12 }}
            transition={{ ...transition, delay: 0.39 }}
            viewport={viewport}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <CalendarDays className="size-3.5 shrink-0 text-muted-foreground" />

            <span className="text-muted-foreground text-xs">
              {"آخرین بروزرسانی:"}
            </span>

            <span className="text-foreground/70 text-xs">
              {item.lastUpdated}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          transition={{ ...transition, delay: 0.3 }}
          viewport={viewport}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <ActionButtons item={item} />
        </motion.div>
      </div>
    </motion.div>
  );
}
