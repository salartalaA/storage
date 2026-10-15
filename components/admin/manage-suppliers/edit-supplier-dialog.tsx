"use client";

import { Pencil } from "lucide-react";
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

interface EditSupplierDialogProps {
  address?: string;
  contact?: string;
  name?: string;
  phone?: string;
}

export function EditSupplierDialog({
  name = "نوشیدنی کوکاکولا ایران",
  phone = "02133445566",
  contact = "رضا صادقی",
  address = "البرز، شهرک صنعتی sims، خیابان ۱۲",
}: EditSupplierDialogProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            className="h-9 flex-1 gap-2 rounded-xl border border-primary/15 bg-primary/5 font-medium text-primary text-xs hover:bg-primary/10 hover:text-primary"
            variant="outline"
          >
            <Pencil className="size-3.5" />
            ویرایش
          </Button>
        }
      />

      <DialogContent className="max-h-[90dvh] w-[calc(100%-1.5rem)] max-w-sm! gap-0 overflow-hidden rounded-3xl border-foreground/10 bg-background/95 p-0 text-popover-foreground shadow-[0_20px_80px_rgba(0,0,0,0.5)] sm:w-full">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/12 to-transparent" />

        <DialogHeader className="space-y-0 px-5 pt-5 pb-3 text-right">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10">
              <Pencil className="size-4 text-primary" />
            </div>

            <div className="min-w-0">
              <DialogTitle className="font-bold text-foreground text-sm">
                ویرایش تامین‌کننده
              </DialogTitle>

              <DialogDescription className="mt-0.5 text-muted-foreground text-xs">
                اطلاعات تامین‌کننده را ویرایش کنید.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-5 pb-5">
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
                defaultValue={name}
                id="supplier-name"
                placeholder="مثال: پگاه صنعت"
              />
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
                defaultValue={phone}
                dir="ltr"
                id="supplier-phone"
                placeholder="مثال: 02188554477"
              />
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
                defaultValue={contact}
                id="supplier-contact"
                placeholder="مثال: محمد رضایی"
              />
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
                defaultValue={address}
                id="supplier-address"
                placeholder="مثال: تهران، خیابان آزادی، پلاک ۱۲۰"
              />
            </div>
          </div>

          <div className="mt-5 flex gap-2">
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

            <Button className="h-9 flex-1 rounded-xl text-xs" type="button">
              ذخیره تغییرات
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
