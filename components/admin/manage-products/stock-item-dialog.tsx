"use client";

import Image from "next/image";
import {
  type StockItem,
  StockItemCard,
} from "@/components/admin/manage-products/stock-item-card";
import { InventoryCard } from "@/components/admin/manage-products/stock-item-stats/inventory-card";
import StockItemCards from "@/components/admin/manage-products/stock-item-stats/stock-item-cards";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export interface InventoryRecord {
  expirationDate: string;
  id: string;
  location: string;
  productionDate: string;
  quantity: number;
  unitPrice: string;
}

const inventories: InventoryRecord[] = [
  {
    expirationDate: "۱۴۰۷/۰۳/۰۱",
    id: "inventory-1",
    location: "انبار اصلی",
    productionDate: "۱۴۰۵/۰۳/۰۱",
    quantity: 20,
    unitPrice: "۸۵۰٬۰۰۰",
  },
  {
    expirationDate: "۱۴۰۷/۰۴/۱۵",
    id: "inventory-2",
    location: "انبار پشتی",
    productionDate: "۱۴۰۵/۰۴/۱۵",
    quantity: 12,
    unitPrice: "۸۲۰٬۰۰۰",
  },
  {
    expirationDate: "۱۴۰۷/۰۵/۲۰",
    id: "inventory-3",
    location: "قفسه فروش",
    productionDate: "۱۴۰۵/۰۵/۲۰",
    quantity: 0,
    unitPrice: "۸۹۰٬۰۰۰",
  },
];

const productStatusStyles = {
  ACTIVE: {
    className: "border-success/15 bg-success/8 text-success",
    label: "موجود",
  },
  INACTIVE: {
    className: "border-foreground/8 bg-foreground/5 text-muted-foreground",
    label: "غیرفعال",
  },
  LOW_STOCK: {
    className: "border-warning/15 bg-warning/8 text-warning",
    label: "کم موجود",
  },
};

const quantityStyles = {
  empty: "text-muted-foreground",
  low: "text-warning",
  normal: "text-success",
};

export function StockItemDialog({ item }: { item: StockItem }) {
  const totalQuantity = inventories.reduce(
    (total, inventory) => total + inventory.quantity,
    0
  );

  const getInventoryStatus = (quantity: number) => {
    if (quantity === 0) {
      return {
        className: "border-foreground/8 bg-foreground/5 text-muted-foreground",
        label: "غیرفعال",
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
  };

  const getProductStatus = () => {
    if (totalQuantity === 0) {
      return productStatusStyles.INACTIVE;
    }

    if (item.status === "LOW_STOCK") {
      return productStatusStyles.LOW_STOCK;
    }

    return productStatusStyles.ACTIVE;
  };

  const getQuantityStyle = (quantity: number) => {
    if (quantity === 0) {
      return quantityStyles.empty;
    }

    if (quantity <= 5) {
      return quantityStyles.low;
    }

    return quantityStyles.normal;
  };

  const productStatus = getProductStatus();

  return (
    <Dialog>
      <DialogTrigger
        nativeButton={false}
        render={
          <div className="w-full cursor-pointer text-right">
            <StockItemCard item={item} />
          </div>
        }
      />

      <DialogContent className="w-[calc(100%-1.5rem)] max-w-sm! gap-0 overflow-hidden rounded-3xl border-foreground/10 bg-background/95 p-0 shadow-[0_20px_80px_rgba(0,0,0,0.5)] sm:w-full">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/12 to-transparent" />
        <DialogHeader className="space-y-0 px-5 pt-5 pb-4 text-right">
          <div className="flex items-start gap-3">
            <Image
              alt={item.title}
              className="size-12 shrink-0 rounded-xl border border-foreground/8 object-cover"
              height={48}
              src={item.image}
              width={48}
            />

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <DialogTitle className="truncate font-bold text-base text-foreground">
                    {item.title}
                  </DialogTitle>

                  <DialogDescription className="mt-1 flex items-center gap-1.5 text-muted-foreground text-xs">
                    <span>{item.category}</span>
                    <span className="text-foreground/20">•</span>
                    <span className="font-mono">{item.barcode}</span>
                  </DialogDescription>
                </div>

                <span
                  className={`shrink-0 rounded-lg border px-2.5 py-1 font-medium text-xs ${productStatus.className}`}
                >
                  {productStatus.label}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <StockItemCards inventories={inventories} item={item} />

        <Separator className="bg-foreground/6" />

        <section className="px-5 pt-4 pb-5">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground text-sm">
                {"جزئیات موجودی"}
              </h3>

              <p className="mt-0.5 text-muted-foreground text-xs">
                {"موجودی محصول در مکان‌های مختلف"}
              </p>
            </div>

            <span className="rounded-lg border border-foreground/7 bg-card/4.5 px-2.5 py-1 text-muted-foreground text-xs">
              {inventories.length} {"رکورد"}
            </span>
          </div>

          <ScrollArea className="h-[300px] pr-1">
            <div className="flex flex-col gap-2.5 pl-1">
              {inventories.map((inventory) => {
                const status = getInventoryStatus(inventory.quantity);

                return (
                  <InventoryCard
                    // biome-ignore lint/performance/noJsxPropsBind: No performance impact
                    getQuantityStyle={getQuantityStyle}
                    inventory={inventory}
                    itemUnit={item.unit}
                    key={inventory.id}
                    status={status}
                  />
                );
              })}
            </div>
          </ScrollArea>
        </section>
      </DialogContent>
    </Dialog>
  );
}
