"use client";

import { cn } from "cn";
import { Loader2, Power, PowerOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { setStoreProductActive } from "@/actions/product";
import type { StockItem } from "@/components/admin/manage-products/stock-item-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const errorMessages = {
  INVALID_DATA: "برای غیرفعال‌سازی محصول، دلیل را وارد کنید",
  NOT_FOUND: "محصول مورد نظر پیدا نشد",
  UNAUTHORIZED: "برای انجام این عملیات باید وارد حساب خود شوید",
} as const;

export function ProductActiveDialog({ item }: { item: StockItem }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isActive = item.isProductActive;
  const nextActive = !isActive;
  const submitLabel = isActive ? "تایید غیرفعال‌سازی" : "تایید فعال‌سازی";

  const reset = () => {
    setReason("");
  };

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    if (!value) {
      reset();
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting || (isActive && !reason.trim())) {
      return;
    }

    setIsSubmitting(true);

    const result = await setStoreProductActive(item.id, nextActive, reason);

    setIsSubmitting(false);

    if (!result.success) {
      toast.error(errorMessages[result.error]);
      return;
    }

    toast.success(nextActive ? "محصول فعال شد" : "محصول غیرفعال شد");
    setOpen(false);
    reset();
  };

  return (
    // biome-ignore lint/performance/noJsxPropsBind: intentional dialog handler
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger
        render={
          <Button
            className={cn(
              "h-9 rounded-xl border px-3 text-xs",
              isActive
                ? "border-destructive/15 bg-destructive/6 text-destructive hover:bg-destructive/10"
                : "border-success/15 bg-success/6 text-success hover:bg-success/10"
            )}
            variant="ghost"
          >
            {isActive ? (
              <PowerOff className="size-3.5" />
            ) : (
              <Power className="size-3.5" />
            )}
            {isActive ? "غیرفعال سازی" : "فعال سازی"}
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
                isActive
                  ? "border-destructive/15 bg-destructive/6 text-destructive"
                  : "border-success/15 bg-success/6 text-success"
              )}
            >
              {isActive ? (
                <PowerOff className="size-4" />
              ) : (
                <Power className="size-4" />
              )}
            </div>

            <div className="min-w-0">
              <DialogTitle className="font-bold text-sm">
                {isActive ? "غیرفعال‌سازی محصول" : "فعال‌سازی محصول"}
              </DialogTitle>

              <DialogDescription className="mt-1 truncate text-xs">
                {item.title}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-5 pb-5">
          <div
            className={cn(
              "rounded-2xl border p-3",
              isActive
                ? "border-destructive/15 bg-destructive/4"
                : "border-success/15 bg-success/4"
            )}
          >
            <p className="font-medium text-xs">
              {isActive
                ? "کل محصول غیرفعال می‌شود"
                : "کل محصول دوباره فعال می‌شود"}
            </p>

            <p className="mt-1 text-[10px] text-muted-foreground leading-5">
              {isActive
                ? "موجودی و وضعیت فعال یا غیرفعال بودن لوکیشن‌ها تغییری نمی‌کند؛ فقط خود محصول از دسترس خارج می‌شود."
                : "موجودی و وضعیت فعال یا غیرفعال بودن لوکیشن‌ها حفظ می‌شود؛ فقط خود محصول دوباره در دسترس قرار می‌گیرد."}
            </p>
          </div>

          {isActive && (
            <div className="mt-3 flex flex-col gap-1.5">
              <Label
                className="font-medium text-muted-foreground text-xs"
                htmlFor="product-disable-reason"
              >
                دلیل غیرفعال‌سازی
              </Label>

              <Input
                className="h-10 rounded-xl border-foreground/8 text-sm"
                id="product-disable-reason"
                // biome-ignore lint/performance/noJsxPropsBind: intentional input handler
                onChange={(event) => setReason(event.target.value)}
                placeholder="مثلاً توقف فروش یا اتمام موجودی"
                value={reason}
              />

              {!reason.trim() && (
                <p className="text-[10px] text-muted-foreground">
                  برای ثبت در گزارش فعالیت‌ها، دلیل الزامی است.
                </p>
              )}
            </div>
          )}

          <div className="mt-4 flex gap-2 border-foreground/6 border-t pt-4">
            <DialogClose
              render={
                <Button
                  className="h-9 flex-1 rounded-xl border-foreground/10 text-xs"
                  type="button"
                  variant="outline"
                >
                  انصراف
                </Button>
              }
            />

            <Button
              className={cn(
                "h-9 flex-1 rounded-xl text-xs",
                isActive
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : "bg-success text-success-foreground hover:bg-success/90"
              )}
              disabled={isSubmitting || (isActive && !reason.trim())}
              // biome-ignore lint/performance/noJsxPropsBind: intentional submit handler
              onClick={handleSubmit}
              type="button"
            >
              {isSubmitting ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                submitLabel
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
