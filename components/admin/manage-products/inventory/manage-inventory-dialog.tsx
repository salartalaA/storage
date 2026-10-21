"use client";

import { cn } from "cn";
import { Check, ChevronLeft, Loader2, Minus, Plus } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { adjustStoreInventory } from "@/actions/product";
import IncreaseQuantityForm from "@/components/admin/manage-products/inventory/inventory-quantity-form";
import { InventorySelector } from "@/components/admin/manage-products/inventory/inventory-selector";
import IncreaseSummary from "@/components/admin/manage-products/inventory/inventory-summary";
import type { StockItem } from "@/components/admin/manage-products/stock-item-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  compareInventoryExpiration,
  getPriorityInventory,
} from "@/lib/inventory";

export interface Inventory {
  barcode: string;
  expirationDateTimestamp: number | null;
  expiredAt: string;
  id: string;
  isActive: boolean;
  location: string;
  producedAt: string;
  quantity: number;
}

const reasons = [
  { label: "RECEIVE_STOCK", value: "دریافت بار" },
  { label: "STOCK_ADJUSTMENT", value: "اصلاح موجودی" },
  { label: "RETURN", value: "برگشت کالا" },
  { label: "WASTE", value: "دور ریز" },
  { label: "ORDER_CANCELLATION", value: "کنسلی سفارش" },
] as const satisfies { label: string; value: string }[];

const modes = [
  {
    buttonClassName: "bg-success text-success-foreground hover:bg-success/90",
    className:
      "border-success/15 bg-success/6 text-success hover:bg-success/10",
    icon: <Plus className="size-3.5" />,
    label: "increase",
    stepClassName: "bg-success/60",
    value: "افزایش",
  },
  {
    buttonClassName: "bg-primary text-primary-foreground hover:bg-primary/90",
    className:
      "border-primary/15 bg-primary/6 text-primary hover:bg-primary/10",
    icon: <Minus className="size-3.5" />,
    label: "decrease",
    stepClassName: "bg-primary/60",
    value: "کاهش",
  },
] as const;

export type Reason = (typeof reasons)[number]["label"] | "";

export type ModeConfig = (typeof modes)[number];

export type ModeLabel = ModeConfig["label"];

export type ModeValue = ModeConfig["value"];

const errorMessages = {
  INSUFFICIENT_STOCK: "مقدار کاهش بیشتر از موجودی فعلی است",
  INVALID_AMOUNT: "مقدار وارد شده معتبر نیست",
  INVALID_DATA: "دلیل انجام عملیات را انتخاب کنید",
  NOT_FOUND: "موجودی مورد نظر پیدا نشد",
  UNAUTHORIZED: "برای انجام این عملیات باید وارد حساب خود شوید",
} as const;

function getSteps(mode: ModeConfig | undefined) {
  return [
    {
      label: "انتخاب",
      number: 1,
    },
    {
      label: mode?.value,
      number: 2,
    },
    {
      label: "تایید",
      number: 3,
    },
  ];
}

function getIsConfirmStep(step: number) {
  return step === 3;
}

function getCanContinue({
  amount,
  hasSelectedInventory,
  mode,
  reason,
  selectedQuantity,
  step,
}: {
  amount: number;
  hasSelectedInventory: boolean;
  mode: ModeConfig | undefined;
  reason: Reason;
  selectedQuantity: number;
  step: number;
}) {
  if (step === 1) {
    return hasSelectedInventory;
  }

  if (mode?.label === "decrease" && amount > selectedQuantity) {
    return false;
  }

  return Number(amount) > 0 && Boolean(reason);
}

function runInventoryAction(
  mode: ModeConfig | undefined,
  inventoryId: string,
  amount: number,
  reason: Reason
) {
  return adjustStoreInventory(
    inventoryId,
    Number(amount),
    mode?.label === "increase" ? "increase" : "decrease",
    reason
  );
}

function getSuccessMessage(mode: ModeConfig | undefined) {
  if (mode?.label === "increase") {
    return "موجودی افزایش یافت";
  }

  return "موجودی کاهش یافت";
}

function ContinueButtonContent({
  isConfirm,
  label,
}: {
  isConfirm: boolean;
  label: string;
}) {
  if (isConfirm) {
    return (
      <>
        <Check className="size-3.5" />
        {label}
      </>
    );
  }

  return (
    <>
      ادامه
      <ChevronLeft className="size-3.5" />
    </>
  );
}

export default function ManageInventoryDialog({
  item,
  mode,
}: {
  item: StockItem;
  mode: ModeLabel;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState<string | null>(
    null
  );
  const [amount, setAmount] = useState<number>(1);
  const [reason, setReason] = useState<Reason>("");

  const inventories: Inventory[] = item.inventories.map((inventory) => ({
    barcode: inventory.barcode,
    expirationDateTimestamp: inventory.expirationDateTimestamp,
    expiredAt: inventory.expirationDate,
    id: inventory.id,
    isActive: inventory.isActive,
    location: inventory.location,
    producedAt: inventory.productionDate,
    quantity: inventory.quantity,
  }));

  const currentMode = modes.find((modeItem) => modeItem.label === mode);

  const availableInventories = inventories
    .filter((inventory) => inventory.isActive)
    .sort(compareInventoryExpiration);

  const priorityInventory = getPriorityInventory(
    currentMode?.label === "decrease"
      ? availableInventories.filter((inventory) => inventory.quantity > 0)
      : availableInventories
  );

  const steps = getSteps(currentMode);

  const selected = availableInventories.find(
    (inventory) => inventory.id === selectedInventory
  );

  const newQuantity =
    selected &&
    amount &&
    (currentMode?.label === "increase" || currentMode?.label === "decrease")
      ? Math.max(
          0,
          selected.quantity +
            (currentMode.label === "increase"
              ? Number(amount)
              : -Number(amount))
        )
      : null;

  const canContinue = getCanContinue({
    amount,
    hasSelectedInventory: Boolean(selectedInventory),
    mode: currentMode,
    reason,
    selectedQuantity: selected?.quantity ?? 0,
    step,
  });

  const isConfirm = getIsConfirmStep(step);

  const reset = () => {
    setStep(1);
    setSelectedInventory(null);
    setAmount(1);
    setReason("");
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    if (!value) {
      reset();
    }
  };

  const handleContinue = async () => {
    if (!(canContinue && selectedInventory) || isSubmitting) {
      return;
    }

    if (!isConfirm) {
      setStep((current) => Math.min(current + 1, 3));
      return;
    }

    setIsSubmitting(true);

    const result = await runInventoryAction(
      currentMode,
      selectedInventory,
      amount,
      reason
    );

    setIsSubmitting(false);

    if (!result.success) {
      toast.error(errorMessages[result.error]);
      return;
    }

    toast.success(getSuccessMessage(currentMode));

    setOpen(false);
    reset();
  };

  const previousStep = () => {
    setStep((current) => Math.max(current - 1, 1));
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger
        render={
          <Button
            className={cn(
              "h-9 rounded-xl border px-3 text-xs",
              currentMode?.className
            )}
            disabled={availableInventories.length === 0}
            variant="ghost"
          >
            {currentMode?.icon}
            {currentMode?.value}
          </Button>
        }
      />

      <DialogContent
        className="w-[calc(100%-1.5rem)] max-w-sm! gap-0 overflow-hidden rounded-3xl border-foreground/10 bg-background/95 p-0 shadow-[0_20px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
        dir="rtl"
      >
        <DialogHeader className="px-5 pt-5 pb-4 text-right">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl border",
                currentMode?.className
              )}
            >
              {currentMode?.icon}
            </div>

            <div className="min-w-0">
              <DialogTitle className="font-bold text-sm">
                {currentMode?.value} {""}
                {"موجودی"}
              </DialogTitle>

              <DialogDescription className="mt-1 truncate text-xs">
                {item.title}
              </DialogDescription>
            </div>
          </div>

          {/* Steps */}
          <div className="mx-auto mt-5 flex w-fit max-w-full items-start">
            {steps.map((itemStep, index) => {
              const active = step === itemStep.number;
              const completed = step > itemStep.number;

              return (
                <div className="flex items-start" key={itemStep.number}>
                  <div className="flex shrink-0 flex-col items-center">
                    <div
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full border font-semibold text-[11px] transition-all duration-300",
                        active || completed
                          ? currentMode?.className
                          : "border-foreground/10 bg-foreground/4 text-muted-foreground",
                        active && "ring-4 ring-current/5"
                      )}
                    >
                      {completed ? (
                        <Check className="size-3.5" />
                      ) : (
                        itemStep.number.toLocaleString("fa-IR")
                      )}
                    </div>

                    <span
                      className={cn(
                        "mt-1.5 whitespace-nowrap text-[10px] transition-colors",
                        active || completed
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {itemStep.label}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="mx-3 mt-4 h-px w-12 shrink-0 overflow-hidden rounded-full bg-foreground/8">
                      <div
                        className={cn(
                          "h-full w-0 origin-right rounded-full transition-all duration-500",
                          step > itemStep.number &&
                            cn("w-full", currentMode?.stepClassName)
                        )}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </DialogHeader>

        <div className="px-5 pb-5">
          <AnimatePresence initial={false} mode="wait">
            {step === 1 && (
              <InventorySelector
                currentModeLabel={currentMode?.label as ModeLabel}
                inventories={availableInventories}
                itemUnit={item.unit}
                priorityInventoryId={priorityInventory?.id ?? null}
                selectedInventory={selectedInventory}
                setSelectedInventory={setSelectedInventory}
              />
            )}

            {step === 2 && (
              <IncreaseQuantityForm
                amount={amount}
                currentModeLabel={currentMode?.label as ModeLabel}
                currentModeValue={currentMode?.value as ModeValue}
                item={item}
                newQuantity={newQuantity}
                reason={reason}
                reasons={reasons}
                selected={selected}
                setAmount={setAmount}
                setReason={setReason}
              />
            )}

            {step === 3 && (
              <IncreaseSummary
                amount={amount}
                currentModeLabel={currentMode?.label as ModeLabel}
                currentModeValue={currentMode?.value as ModeValue}
                item={item}
                newQuantity={newQuantity}
                reason={reason}
                reasons={reasons}
                selected={selected}
              />
            )}
          </AnimatePresence>

          <div className="mt-4 flex gap-2 border-foreground/6 border-t pt-4">
            <Button
              className="h-9 flex-1 rounded-xl border border-foreground/8 bg-foreground/3 text-xs"
              // biome-ignore lint/performance/noJsxPropsBind: No performance issue
              onClick={() => {
                if (step === 1) {
                  setOpen(false);
                } else {
                  previousStep();
                }
              }}
              type="button"
              variant="ghost"
            >
              {step === 1 ? "انصراف" : "بازگشت"}
            </Button>

            <Button
              className={cn(
                "h-9 flex-1 rounded-xl text-xs",
                currentMode?.buttonClassName
              )}
              disabled={!canContinue || isSubmitting}
              onClick={handleContinue}
              type="button"
            >
              {isSubmitting ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <ContinueButtonContent
                  isConfirm={isConfirm}
                  label={`تایید ${currentMode?.value ?? ""}`}
                />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
