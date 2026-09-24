import { CalendarDays, MapPin, Tag } from "lucide-react";

interface InventoryCardProps {
  getQuantityStyle: (quantity: number) => string;
  inventory: {
    id: string;
    location: string;
    quantity: number;
    unitPrice: string;
    productionDate: string;
    expirationDate: string;
  };
  itemUnit?: string;
  status: {
    className: string;
    label: string;
  };
}

export function InventoryCard({
  inventory,
  itemUnit,
  status,
  getQuantityStyle,
}: InventoryCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-foreground/7 bg-card/4.5 p-3.5 backdrop-blur-[18px] transition-colors duration-200 hover:border-foreground/12 hover:bg-card/6"
      key={inventory.id}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/8 to-transparent" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-primary/10 bg-primary/8 text-primary">
            <MapPin className="size-3.5" />
          </div>

          <span
            className={`rounded-md border px-1.5 py-0.5 font-medium text-xs ${status.className}`}
          >
            {status.label}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="flex items-center gap-1">
            <span
              className={`font-bold text-lg tabular-nums ${getQuantityStyle(
                inventory.quantity
              )}`}
            >
              {inventory.quantity}
            </span>

            <span className="text-muted-foreground text-xs">
              {itemUnit ?? "عدد"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-foreground/6 bg-foreground/2.5 px-2.5 py-2">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Tag className="size-3" />
            <span className="text-[9px]">قیمت واحد</span>
          </div>

          <p className="mt-1 font-semibold text-foreground text-xs tabular-nums">
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
            {inventory.location}
          </p>
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-2 border-foreground/6 border-t pt-2.5">
        <CalendarDays className="size-3 shrink-0 text-muted-foreground" />

        <div className="min‌-w-0 flex items-center gap-1.5 text-xs">
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
