import { cn } from "cn";
import { Check, MapPin, PackageOpen, Star } from "lucide-react";
import { motion } from "motion/react";
import type { Dispatch, SetStateAction } from "react";
import type {
  Inventory,
  ModeLabel,
} from "@/components/admin/manage-products/inventory/manage-inventory-dialog";

function getSelectedButtonClassName(mode: ModeLabel) {
  if (mode === "increase") {
    return "border-success/25 bg-success/6";
  }

  return "border-primary/25 bg-primary/6";
}

function getCheckClassName(mode: ModeLabel) {
  if (mode === "increase") {
    return "bg-success text-success-foreground";
  }

  return "bg-primary text-primary-foreground";
}

export function InventorySelector({
  inventories,
  priorityInventoryId,
  selectedInventory,
  setSelectedInventory,
  currentModeLabel,
  itemUnit,
}: {
  inventories: Inventory[];
  priorityInventoryId: string | null;
  selectedInventory: string | null;
  setSelectedInventory: Dispatch<SetStateAction<string | null>>;
  currentModeLabel: ModeLabel;
  itemUnit: string;
}) {
  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className="space-y-3"
      exit={{ opacity: 0, x: -20 }}
      initial={{ opacity: 0, x: 20 }}
      key="step-1"
      transition={{ duration: 0.25 }}
    >
      <div className="mb-3 flex items-center gap-1.5 text-muted-foreground text-xs">
        <PackageOpen className="size-3.5" />
        {"انتخاب موجودی مورد نظر"}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {inventories.map((inventory) => {
          const isSelected = selectedInventory === inventory.id;
          const isPriority = inventory.id === priorityInventoryId;
          const disabled =
            currentModeLabel === "decrease" && inventory.quantity === 0;

          return (
            <button
              className={`relative flex min-h-20 flex-col justify-between rounded-2xl border p-3 text-right transition ${
                isSelected
                  ? getSelectedButtonClassName(currentModeLabel)
                  : "border-foreground/8 bg-card/4.5 hover:border-foreground/15"
              } ${disabled ? "cursor-not-allowed opacity-40" : ""}`}
              disabled={disabled}
              key={inventory.id}
              // biome-ignore lint/performance/noJsxPropsBind: CHECK LATER
              onClick={() => setSelectedInventory(inventory.id)}
              type="button"
            >
              <div className="flex items-center gap-2">
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-foreground/5 text-muted-foreground">
                  <MapPin className="size-3.5" />
                </div>

                <span className="truncate font-medium text-xs">
                  {inventory.location}
                </span>

                {isPriority && (
                  <Star
                    aria-label="در اولویت"
                    className="size-2.5 shrink-0 fill-warning text-warning"
                  />
                )}
              </div>

              <div className="mt-2 space-y-1.5">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] text-muted-foreground">
                    {inventory.isActive ? "فعال" : "غیرفعال"}
                  </span>

                  <span className="font-bold text-xs">
                    {inventory.quantity.toLocaleString("fa-IR")}{" "}
                    <span className="font-normal text-muted-foreground">
                      {itemUnit}
                    </span>
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>انقضا: {inventory.expiredAt}</span>
                </div>
              </div>

              {isSelected && (
                <div
                  className={cn(
                    "absolute top-2 left-2 flex size-5 items-center justify-center rounded-full",
                    getCheckClassName(currentModeLabel)
                  )}
                >
                  <Check className="size-3" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
