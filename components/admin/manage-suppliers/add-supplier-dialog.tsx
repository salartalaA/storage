"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { addStoreSupplier } from "@/actions/supplier";
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
import { type SupplierData, supplierSchema } from "@/schema/supplier";

export function AddSupplierDialog() {
  const [open, setOpen] = useState(false);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<SupplierData>({
    resolver: zodResolver(supplierSchema),
  });

  const onsubmit = async (newSupplier: SupplierData) => {
    await addStoreSupplier(newSupplier);

    setOpen(false);
    reset();
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger
        render={
          <Button className="flex items-center gap-1 rounded-2xl text-xs">
            <Plus size={14} />
            <span>افزودن تامین‌کننده</span>
          </Button>
        }
      />

      <DialogContent className="max-h-[90dvh] w-[calc(100%-1.5rem)] max-w-sm! gap-0 overflow-hidden rounded-3xl border-foreground/10 bg-background/95 p-0 text-popover-foreground shadow-[0_20px_80px_rgba(0,0,0,0.5)] sm:w-full">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/12 to-transparent" />

        <DialogHeader className="space-y-0 px-5 pt-5 pb-3 text-right">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10">
              <Plus className="size-4 text-primary" />
            </div>

            <div className="min-w-0">
              <DialogTitle className="font-bold text-foreground text-sm">
                افزودن تامین‌کننده
              </DialogTitle>

              <DialogDescription className="mt-0.5 text-muted-foreground text-xs">
                اطلاعات تامین‌کننده جدید را وارد کنید.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form className="px-5 pb-5" onSubmit={handleSubmit(onsubmit)}>
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1.5">
              <Label
                className="font-medium text-muted-foreground text-xs"
                htmlFor="supplier-name"
              >
                نام تامین‌کننده
              </Label>

              <Input
                className="glass h-10 rounded-xl border-foreground/8 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-primary/40 focus-visible:ring-primary/20"
                id="supplier-name"
                placeholder="مثال: پگاه صنعت"
                {...register("name")}
                autoComplete="off"
              />

              {errors.name && (
                <p className="font-semibold text-destructive text-xs">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                className="font-medium text-muted-foreground text-xs"
                htmlFor="supplier-phone"
              >
                شماره تماس
              </Label>

              <Input
                className="glass h-10 rounded-xl border-foreground/8 text-left text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-primary/40 focus-visible:ring-primary/20"
                dir="ltr"
                id="supplier-phone"
                placeholder="مثال: 02188554477"
                {...register("phoneNumber")}
                autoComplete="off"
              />

              {errors.phoneNumber && (
                <p className="font-semibold text-destructive text-xs">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                className="font-medium text-muted-foreground text-xs"
                htmlFor="supplier-contact"
              >
                مسئول ارتباط
              </Label>

              <Input
                className="glass h-10 rounded-xl border-foreground/8 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-primary/40 focus-visible:ring-primary/20"
                id="supplier-contact"
                placeholder="مثال: محمد رضایی"
                {...register("contactName")}
                autoComplete="off"
              />

              {errors.contactName && (
                <p className="font-semibold text-destructive text-xs">
                  {errors.contactName.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                className="font-medium text-muted-foreground text-xs"
                htmlFor="supplier-address"
              >
                آدرس
              </Label>
              <Input
                className="glass h-10 rounded-xl border-foreground/8 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-primary/40 focus-visible:ring-primary/20"
                id="supplier-address"
                placeholder="مثال: تهران، خیابان آزادی، پلاک ۱۲۰"
                {...register("address")}
                autoComplete="off"
              />

              {errors.address && (
                <p className="font-semibold text-destructive text-xs">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <DialogClose
              render={
                <Button
                  className="h-9 flex-1 rounded-xl border-foreground/10 text-xs"
                  // biome-ignore lint/performance/noJsxPropsBind: No performance issue
                  onClick={() => reset()}
                  type="button"
                  variant="outline"
                >
                  انصراف
                </Button>
              }
            />

            <Button
              className="h-9 flex-1 rounded-xl text-xs"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "افزودن"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
