"use client";

import { cn } from "cn";
import { Check, ChevronLeft, Minus, Plus, Trash2 } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import InventoryDisableConfirmation from "@/components/admin/manage-products/inventory/inventory-disable-confirmation";
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

export interface Inventory {
  barcode: string;
  id: string;
  location: string;
  producedAt: string;
  quantity: number;
}

const inventories: Inventory[] = [
  {
    barcode: "62604562489751",
    id: "1",
    location: "انبار اصلی",
    producedAt: "۱۴۰۵/۰۶/۲۵",
    quantity: 20,
  },
  {
    barcode: "62604562489751",
    id: "2",
    location: "انبار پشتی",
    producedAt: "۱۴۰۵/۰۶/۲۴",
    quantity: 12,
  },
  {
    barcode: "62604562489751",
    id: "3",
    location: "قفسه فروش",
    producedAt: "۱۴۰۵/۰۶/۲۳",
    quantity: 0,
  },
];

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
  {
    buttonClassName:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    className:
      "border-destructive/15 bg-destructive/6 text-destructive hover:bg-destructive/10",
    icon: <Trash2 className="size-3.5" />,
    label: "disable",
    stepClassName: "bg-destructive/60",
    value: "غیرفعال سازی",
  },
] as const;

export type Reason = (typeof reasons)[number]["label"] | "";

export type ModeConfig = (typeof modes)[number];

export type ModeLabel = ModeConfig["label"];

export type ModeValue = ModeConfig["value"];

export default function ManageInventoryDialog({
  item,
  mode,
}: {
  item: StockItem;
  mode: ModeLabel;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<number>(1);
  const [selectedInventory, setSelectedInventory] = useState<string | null>(
    null
  );
  const [amount, setAmount] = useState<number>(1);
  const [reason, setReason] = useState<Reason>("");

  const currentMode = modes.find((modeItem) => modeItem.label === mode);

  const steps =
    currentMode?.label === "disable"
      ? [
          {
            label: "انتخاب",
            number: 1,
          },
          {
            label: "تایید",
            number: 2,
          },
        ]
      : [
          {
            label: "انتخاب",
            number: 1,
          },
          {
            label: currentMode?.value,
            number: 2,
          },
          {
            label: "تایید",
            number: 3,
          },
        ];

  const selected = inventories.find(
    (inventory) => inventory.id === selectedInventory
  );

  const newQuantity =
    selected && amount
      ? selected.quantity +
        (currentMode?.label === "increase" ? Number(amount) : -Number(amount))
      : null;

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

  const canContinue =
    step === 1
      ? !!selectedInventory
      : // biome-ignore lint/style/noNestedTernary: CHECK LATER
        currentMode?.label === "disable"
        ? true
        : Number(amount) > 0 &&
          !!reason &&
          (currentMode?.label !== "decrease" ||
            Number(amount) <= (selected?.quantity ?? 0));

  const isLastStep = currentMode?.label === "disable" ? step === 2 : step === 3;

  const handleContinue = () => {
    if (isLastStep) {
      setOpen(false);
      reset();
      return;
    }
    if (!canContinue) {
      return;
    }

    setStep((current) => Math.min(current + 1, 3));
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
                        itemStep.number
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
                inventories={inventories}
                selectedInventory={selectedInventory}
                setSelectedInventory={setSelectedInventory}
              />
            )}

            {step === 2 && currentMode?.label !== "disable" && (
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

            {step === 2 && currentMode?.label === "disable" && (
              <InventoryDisableConfirmation selected={selected} />
            )}

            {currentMode?.label !== "disable" && step === 3 && (
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
              // biome-ignore lint/performance/noJsxPropsBind: CHECK LATER
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
              disabled={!canContinue}
              onClick={handleContinue}
              type="button"
            >
              {(currentMode?.label === "disable" ? step === 2 : step === 3) ? (
                <>
                  <Check className="size-3.5" />
                  {"تایید "} {currentMode?.value}
                </>
              ) : (
                <>
                  {"ادامه"}
                  <ChevronLeft className="size-3.5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
