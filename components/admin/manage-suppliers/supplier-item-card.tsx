"use client";

import { MapPin, Pencil, Phone, Trash2, Truck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SupplierCardProps {
  address?: string;
  contact?: string;
  name?: string;
  phone?: string;
}

export function SupplierItemCard({
  name = "نوشیدنی کوکاکولا ایران",
  phone = "02133445566",
  address = "البرز، شهرک صنعتی sims، خیابان ۱۲",
  contact = "رضا صادقی",
}: SupplierCardProps) {
  return (
    <div className="rounded-3xl border border-foreground/8 bg-card/4.5 p-4 shadow-[0_5px_24px_rgba(0,0,0,0.25)] backdrop-blur-[6px] transition-[border-color,background-color,box-shadow] duration-300 hover:border-foreground/12 hover:bg-card/6 hover:shadow-[0_10px_42px_rgba(0,0,0,0.35)] sm:shadow-[0_8px_40px_rgba(0,0,0,0.3)] sm:backdrop-blur-[18px]">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Truck className="size-4 text-primary" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <h3 className="truncate font-bold text-foreground text-sm">{name}</h3>

          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <Phone className="size-3.5 shrink-0" />

            <span className="font-mono tracking-wide" dir="ltr">
              {phone}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <User className="size-3.5 shrink-0" />

            <span className="line-clamp-1" dir="ltr">
              {contact}
            </span>
          </div>

          <div className="flex items-start gap-1.5 text-muted-foreground text-xs">
            <MapPin className="mt-0.5 size-3.5 shrink-0" />

            <span className="line-clamp-1">{address}</span>
          </div>
        </div>
      </div>

      <Separator className="my-3 bg-foreground/5" />

      <div className="flex items-center gap-2">
        <Button
          aria-label={`ویرایش ${name}`}
          className="h-8 flex-1 gap-1.5 rounded-xl border border-primary/15 bg-primary/5 px-3 font-medium text-primary text-xs hover:bg-primary/10 hover:text-primary"
          type="button"
          variant="outline"
        >
          <Pencil className="size-3.5" />
          ویرایش
        </Button>

        <Button
          aria-label={`حذف ${name}`}
          className="h-8 flex-1 gap-1.5 rounded-xl border border-destructive/15 bg-destructive/5 px-3 font-medium text-destructive text-xs hover:bg-destructive/10 hover:text-destructive"
          type="button"
          variant="outline"
        >
          <Trash2 className="size-3.5" />
          حذف
        </Button>
      </div>
    </div>
  );
}
