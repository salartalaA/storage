import { cn } from "cn";
import { MapPin, Package } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import type {
  Inventory,
  ModeLabel,
  ModeValue,
  Reason,
} from "@/components/admin/manage-products/inventory/manage-inventory-dialog";
import type { StockItem } from "@/components/admin/manage-products/stock-item-card";

export default function InventorySummary({
  item,
  amount,
  newQuantity,
  selected,
  reasons,
  reason,
  currentModeLabel,
  currentModeValue,
}: {
  item: StockItem;
  amount: number;
  newQuantity: number | null;
  selected: Inventory | undefined;
  reasons: {
    label: string;
    value: string;
  }[];
  reason: Reason;
  currentModeLabel: ModeLabel;
  currentModeValue: ModeValue;
}) {
  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className="space-y-3"
      exit={{ opacity: 0, x: -20 }}
      initial={{ opacity: 0, x: 20 }}
      key="step-3"
      transition={{ duration: 0.25 }}
    >
      <div
        className={cn(
          "rounded-2xl border p-3",
          currentModeLabel === "increase" && "border-success/10 bg-success/4",
          currentModeLabel === "decrease" && "border-primary/10 bg-primary/4"
        )}
      >
        <div className="flex items-center gap-3">
          {item.image ? (
            <Image
              alt={item.title}
              className="size-12 rounded-xl object-cover"
              height={48}
              src={item.image}
              width={48}
            />
          ) : (
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/8 text-primary">
              <Package className="size-5" />
            </span>
          )}

          <div className="min-w-0">
            <p className="truncate font-semibold text-sm">{item.title}</p>

            <div className="mt-1 flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span>{item.category}</span>
              <span>•</span>
              <span className="ltr font-mono">{item.barcode}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-foreground/6 bg-foreground/2.5 p-3">
          <span className="text-[10px] text-muted-foreground">{"مکان"}</span>
          <p className="mt-1 flex items-center gap-1 font-medium text-xs">
            <MapPin className="size-3" />
            {selected?.location}
          </p>
        </div>

        <div className="rounded-xl border border-foreground/6 bg-foreground/2.5 p-3">
          <span className="text-[10px] text-muted-foreground">{"دلیل"}</span>
          <p className="mt-1 font-medium text-xs">
            {reasons.find((reasonItem) => reasonItem.value === reason)?.value}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 rounded-2xl border border-foreground/8 bg-card/4.5 p-3 text-center">
        <div>
          <span className="text-[10px] text-muted-foreground">
            {"موجودی فعلی"}
          </span>
          <p className="mt-1 font-bold text-sm">
            {selected?.quantity.toLocaleString("fa-IR")}
            <span className="mr-1 font-normal text-[10px] text-muted-foreground">
              {item.unit}
            </span>
          </p>
        </div>

        <div className="border-foreground/8 border-x">
          <span className="text-[10px] text-muted-foreground">
            {currentModeValue}
          </span>
          <p
            className={cn(
              "mt-1 font-bold text-sm",
              currentModeLabel === "increase" && "text-success",
              currentModeLabel === "decrease" && "text-primary"
            )}
          >
            {amount.toLocaleString("fa-IR")}{" "}
            {currentModeLabel === "increase" ? "+" : "-"}
            <span className="mr-1 font-normal text-[10px] text-muted-foreground">
              {item.unit}
            </span>
          </p>
        </div>

        <div>
          <span className="text-[10px] text-muted-foreground">
            {"موجودی جدید"}
          </span>
          <p
            className={cn(
              "mt-1 font-bold text-sm",
              currentModeLabel === "increase" && "text-success",
              currentModeLabel === "decrease" && "text-primary"
            )}
          >
            {newQuantity?.toLocaleString("fa-IR")}
            <span className="mr-1 font-normal text-[10px] text-muted-foreground">
              {item.unit}
            </span>
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-foreground/6 bg-foreground/2.5 px-3 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-xs">{"تاریخ تولید:"}</span>

            <span className="text-muted-foreground text-xs">
              {selected?.producedAt ?? "—"}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xs">{"تاریخ انقضا:"}</span>

            <span className="text-muted-foreground text-xs">
              {selected?.expiredAt ?? "—"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
