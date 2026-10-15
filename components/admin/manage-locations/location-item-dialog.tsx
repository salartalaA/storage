"use client";

import { CalendarDays, MapPin, Package, X } from "lucide-react";
import type { Location } from "@/app/(main)/admin/dashboard/manage-locations/page";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import LocationCard from "./location-card";
import LocationItemCard from "./location-item-card";

function getQuantityStatus(quantity: number) {
  if (quantity === 0) {
    return {
      className: "border-foreground/8 bg-foreground/5 text-muted-foreground",
      label: "ناموجود",
    };
  }

  if (quantity <= 5) {
    return {
      className: "border-warning/15 bg-warning/8 text-warning",
      label: "کم موجود",
    };
  }

  return {
    className: "border-success/15 bg-success/8 text-success",
    label: "موجود",
  };
}

export function LocationDetailDialog({ location }: { location: Location }) {
  const totalQuantity = location.inventories.reduce(
    (total, inventory) => total + inventory.quantity,
    0
  );

  const activeRecords = location.inventories.filter(
    (inventory) => inventory.quantity > 0
  ).length;

  return (
    <Dialog>
      <DialogTrigger
        nativeButton={false}
        render={
          <div className="w-full cursor-pointer text-right">
            <LocationItemCard
              locationName={location.name}
              productCount={location.productCount}
              stockCount={location.stockCount}
            />
          </div>
        }
      />

      <DialogContent className="max-h-[90dvh] w-[calc(100%-1.5rem)] max-w-sm! gap-0 overflow-hidden rounded-3xl border-foreground/10 bg-background/95 p-0 text-popover-foreground shadow-[0_20px_80px_rgba(0,0,0,0.5)] sm:w-full">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/12 to-transparent" />

        <DialogHeader className="space-y-0 px-5 pt-5 pb-4 text-right">
          <div className="flex items-start gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-foreground/8 bg-primary/8 text-primary">
              <MapPin className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <DialogTitle className="truncate font-bold text-base text-foreground">
                {location.name}
              </DialogTitle>

              <DialogDescription className="mt-1 flex items-center gap-1.5 text-muted-foreground text-xs">
                <span>مکان نگهداری محصولات</span>
                <span className="text-foreground/20">•</span>
                <span>
                  {location.inventories.length.toLocaleString("fa-IR")} رکورد
                </span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-5 pb-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-foreground/7 bg-card/4.5 p-3 backdrop-blur-[18px]">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Package className="size-3.5" />
                <span className="text-xs">موجودی کل</span>
              </div>

              <p className="mt-1.5 font-bold text-lg">
                {totalQuantity.toLocaleString("fa-IR")}
                <span className="mr-1 font-normal text-muted-foreground text-xs">
                  عدد
                </span>
              </p>
            </div>

            <div className="rounded-xl border border-foreground/7 bg-card/4.5 p-3 backdrop-blur-[18px]">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Package className="size-3.5" />
                <span className="text-xs">رکورد فعال</span>
              </div>

              <p className="mt-1.5 font-bold text-foreground text-lg">
                {activeRecords.toLocaleString("fa-IR")}
              </p>
            </div>

            <div className="rounded-xl border border-foreground/7 bg-card/4.5 p-3 backdrop-blur-[18px]">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="size-3.5" />
                <span className="text-xs">تعداد رکوردها</span>
              </div>

              <p className="mt-1.5 font-bold text-foreground text-lg">
                {location.inventories.length.toLocaleString("fa-IR")}
              </p>
            </div>

            <div className="rounded-xl border border-foreground/7 bg-card/4.5 p-3 backdrop-blur-[18px]">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <CalendarDays className="size-3.5" />
                <span className="text-xs">آخرین انقضا</span>
              </div>

              <p className="mt-1.5 font-bold text-foreground text-sm">
                {location.inventories.length > 0
                  ? location.inventories.reduce((latest, inventory) =>
                      inventory.expirationDate > latest.expirationDate
                        ? inventory
                        : latest
                    ).expirationDate
                  : "—"}
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-foreground/6" />

        <section className="px-5 pt-4 pb-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground text-sm">
                جزئیات موجودی
              </h3>
              <p className="mt-0.5 text-muted-foreground text-xs">
                محصولات موجود در این مکان
              </p>
            </div>

            <span className="rounded-lg border border-foreground/7 bg-card/4.5 px-2.5 py-1 text-muted-foreground text-xs">
              {location.inventories.length.toLocaleString("fa-IR")} رکورد
            </span>
          </div>

          <ScrollArea className="h-[300px] pr-1">
            <div className="flex flex-col gap-2.5 pl-1">
              {location.inventories.map((inventory) => {
                const status = getQuantityStatus(inventory.quantity);

                return (
                  <LocationCard
                    inventory={inventory}
                    key={inventory.id}
                    locationName={location.name}
                    status={status}
                  />
                );
              })}
            </div>
          </ScrollArea>
        </section>

        <DialogClose
          aria-label="بستن"
          className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-[min(var(--radius-md),12px)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="size-4" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
