import { Boxes, CalendarDays, MapPin, Package } from "lucide-react";
import type { StockItem } from "@/components/admin/manage-products/stock-item-card";
import type { InventoryRecord } from "@/components/admin/manage-products/stock-item-dialog";

export default function StockItemCards({
  inventories,
  item,
}: {
  inventories: InventoryRecord[];
  item: StockItem;
}) {
  const totalQuantity = inventories.reduce(
    (total, inventory) => total + inventory.quantity,
    0
  );

  const activeInventories = inventories.filter(
    (inventory) => inventory.quantity > 0
  );

  const locationsCount = new Set(
    inventories.map((inventory) => inventory.location)
  ).size;

  return (
    <div className="px-5 pb-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="rounded-xl border border-foreground/7 bg-card/4.5 p-3 backdrop-blur-[18px]">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Boxes className="size-3.5" />
            <span className="text-xs">{"موجودی کل"}</span>
          </div>

          <p className="mt-1.5 font-bold text-lg tabular-nums">
            {totalQuantity}
            <span className="mr-1 font-normal text-muted-foreground text-xs">
              {item.unit ?? "عدد"}
            </span>
          </p>
        </div>

        <div className="rounded-xl border border-foreground/7 bg-card/4.5 p-3 backdrop-blur-[18px]">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Package className="size-3.5" />
            <span className="text-xs">{"رکورد فعال"}</span>
          </div>

          <p className="mt-1.5 font-bold text-foreground text-lg tabular-nums">
            {activeInventories.length}
          </p>
        </div>

        <div className="rounded-xl border border-foreground/7 bg-card/4.5 p-3 backdrop-blur-[18px]">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="size-3.5" />
            <span className="text-xs">{"مکان‌ها"}</span>
          </div>

          <p className="mt-1.5 font-bold text-foreground text-lg tabular-nums">
            {locationsCount}
          </p>
        </div>

        <div className="rounded-xl border border-foreground/7 bg-card/4.5 p-3 backdrop-blur-[18px]">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <CalendarDays className="size-3.5" />
            <span className="text-xs">{"آخرین بروزرسانی"}</span>
          </div>

          <p className="mt-1.5 font-semibold text-foreground">
            {item.lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
}
