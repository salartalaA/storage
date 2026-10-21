import { cn } from "cn";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";
import type { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { StockItem } from "../stock-item-card";
import type {
  Inventory,
  ModeLabel,
  ModeValue,
  Reason,
} from "./manage-inventory-dialog";

export default function IncreaseQuantityForm({
  item,
  selected,
  amount,
  setAmount,
  reasons,
  newQuantity,
  setReason,
  reason,
  currentModeValue,
  currentModeLabel,
}: {
  item: StockItem;
  selected: Inventory | undefined;
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
  reasons: {
    label: Reason;
    value: string;
  }[];
  newQuantity: number | null;
  setReason: Dispatch<SetStateAction<Reason>>;
  reason: string;
  currentModeValue: ModeValue;
  currentModeLabel: ModeLabel;
}) {
  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className="space-y-3"
      exit={{ opacity: 0, x: -20 }}
      initial={{ opacity: 0, x: 20 }}
      key="step-2"
      transition={{ duration: 0.25 }}
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-2xl border border-foreground/8 bg-card/4.5 p-3">
          <span className="text-[10px] text-muted-foreground">{"محصول"}</span>

          <p className="mt-1 truncate font-medium text-xs">{item.title}</p>

          <p className="mt-1 text-[10px] text-muted-foreground">
            {item.category}
          </p>
        </div>

        <div className="rounded-2xl border border-foreground/8 bg-card/4.5 p-3">
          <span className="text-[10px] text-muted-foreground">{"مکان"}</span>

          <p className="mt-1 flex items-center gap-1 truncate font-medium text-xs">
            <MapPin className="size-3 text-muted-foreground" />
            {selected?.location}
          </p>

          <p className="mt-1 text-[10px] text-muted-foreground">
            {"بارکد:"} {selected?.barcode}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label
            className="mb-1.5 block text-[10px] text-muted-foreground"
            htmlFor="increase-amount"
          >
            {"مقدار"} {currentModeValue}
          </label>

          <div className="relative">
            <Input
              className="h-10 rounded-xl border-foreground/8 bg-card/4.5 pl-10 text-sm"
              id="increase-amount"
              inputMode="numeric"
              max={
                currentModeLabel === "decrease" ? selected?.quantity : undefined
              }
              min="1"
              // biome-ignore lint/performance/noJsxPropsBind: CHECK LATER
              onChange={(event) => setAmount(Number(event.target.value))}
              placeholder="مثلاً ۱۰"
              type="number"
              value={amount}
            />

            <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[10px] text-muted-foreground">
              {item.unit}
            </span>
          </div>
        </div>

        <div>
          <span className="mb-1.5 block text-[10px] text-muted-foreground">
            {"دلیل"} {currentModeValue}
          </span>

          <Select
            // biome-ignore lint/performance/noJsxPropsBind: CHECK LATER
            onValueChange={(value) => setReason(value as Reason)}
            value={reason}
          >
            <SelectTrigger className="h-10 w-full rounded-xl border-foreground/8 bg-card/4.5 text-xs">
              <SelectValue placeholder="انتخاب دلیل" />
            </SelectTrigger>

            <SelectContent>
              {reasons.map((reasonItem) => (
                <SelectItem key={reasonItem.label} value={reasonItem.value}>
                  {reasonItem.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            {amount} {currentModeLabel === "increase" ? "+" : "-"}
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
    </motion.div>
  );
}
