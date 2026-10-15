import { Barcode, CalendarDays, MapPin, Tag } from "lucide-react";
import type { LocationInventory } from "@/app/(main)/admin/dashboard/manage-locations/page";
import { cn } from "@/lib/utils";

export default function LocationCard({
  inventory,
  locationName,
  status,
}: {
  inventory: LocationInventory;
  locationName: string;
  status: {
    className: string;
    label: string;
  };
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-foreground/7 bg-card/4.5 p-3.5 transition-colors duration-200 hover:border-foreground/12 hover:bg-card/6 sm:backdrop-blur-[18px]"
      key={inventory.id}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/8 to-transparent" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <h4 className="truncate font-semibold text-foreground text-sm">
            {inventory.productName}
          </h4>

          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Barcode className="size-3 shrink-0" />

            <span className="font-mono tracking-wide" dir="ltr">
              {inventory.barcode}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1">
          <span
            className={`rounded-md border px-1.5 py-0.5 font-medium text-xs ${status.className}`}
          >
            {status.label}
          </span>

          <div className="flex items-baseline gap-1">
            <span
              className={cn(
                "font-bold text-lg text-success",
                inventory.quantity === 0 && "text-muted-foreground"
              )}
            >
              {inventory.quantity.toLocaleString("fa-IR")}
            </span>

            <span className="text-muted-foreground text-xs">عدد</span>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-foreground/6 bg-foreground/2.5 px-2.5 py-2">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Tag className="size-3" />
            <span className="text-[9px]">قیمت واحد</span>
          </div>

          <p className="mt-1 font-semibold text-foreground text-xs">
            {inventory.unitPrice}
            <span className="mr-1 font-normal text-[9px] text-muted-foreground">
              تومان
            </span>
          </p>
        </div>

        <div className="rounded-lg border border-foreground/6 bg-foreground/2.5 px-2.5 py-2">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="size-3" />
            <span className="text-[9px]">مکان</span>
          </div>

          <p className="mt-1 truncate font-medium text-foreground text-xs">
            {locationName}
          </p>
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-2 border-foreground/6 border-t pt-2.5">
        <CalendarDays className="size-3 shrink-0 text-muted-foreground" />

        <div className="flex min-w-0 flex-wrap items-center gap-1.5 text-xs">
          <span className="text-muted-foreground">تولید</span>
          <span className="text-foreground/70">{inventory.productionDate}</span>

          <span className="text-foreground/20">•</span>

          <span className="text-muted-foreground">انقضا</span>
          <span className="text-foreground/70">{inventory.expirationDate}</span>
        </div>
      </div>
    </div>
  );
}
