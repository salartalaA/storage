"use client";

import { MapPin, Package } from "lucide-react";
import { motion } from "motion/react";
import { ChangeLocationNameDialog } from "@/components/admin/manage-locations/change-location-name-dialog";
import { DeleteLocationDialog } from "@/components/admin/manage-locations/delete-location-dialog";
import { Separator } from "@/components/ui/separator";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
      staggerChildren: 0.06,
    },
    y: 0,
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 6,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut" as const,
    },
    y: 0,
  },
};

export default function LocationItemCard({
  locationName,
  productCount,
  stockCount,
}: {
  locationName: string;
  productCount: number;
  stockCount: number;
}) {
  return (
    <motion.div
      animate="visible"
      className="rounded-3xl border border-foreground/8 bg-card/4.5 p-4 shadow-[0_5px_24px_rgba(0,0,0,0.25)] backdrop-blur-[6px] transition-[border-color,background-color,box-shadow] duration-300 hover:border-foreground/12 hover:bg-card/6 hover:shadow-[0_10px_42px_rgba(0,0,0,0.35)] sm:shadow-[0_8px_40px_rgba(0,0,0,0.3)] sm:backdrop-blur-[18px]"
      initial="hidden"
      variants={cardVariants}
      whileHover={{
        transition: { duration: 0.2, ease: "easeOut" },
        y: -2,
      }}
      whileTap={{ scale: 0.99 }}
    >
      <motion.div className="flex items-start gap-3" variants={itemVariants}>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <MapPin className="h-4 w-4 text-primary" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <h3 className="truncate font-bold text-foreground text-sm">
            {locationName}
          </h3>

          <div className="flex items-center gap-2 text-muted-foreground text-xs">
            <span className="flex items-center gap-1">
              <Package className="h-3.5 w-3.5" />
              {productCount} محصول
            </span>

            <span className="text-muted-foreground/30">•</span>

            <span>{stockCount} عدد موجودی</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Separator className="my-3 h-px shrink-0 bg-foreground/5" />
      </motion.div>

      <motion.div
        className="flex items-center gap-2"
        // biome-ignore lint/performance/noJsxPropsBind: Need for stop propagation on dialog trigger
        onClick={(e) => e.stopPropagation()}
        variants={itemVariants}
      >
        <ChangeLocationNameDialog />

        <DeleteLocationDialog />
      </motion.div>
    </motion.div>
  );
}
