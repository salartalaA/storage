"use client";

import { Package, Truck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { DeleteProductDialog } from "@/components/admin/manage-products/delete-product-dialog";
import { EditProductDialog } from "@/components/admin/manage-products/edit-product-dialog";
import {
  type StockItem,
  StockItemCard,
  type StockItemInventory,
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
import { getPriorityInventory } from "@/lib/inventory";

export type InventoryRecord = StockItemInventory;

const productStatusStyles = {
  ACTIVE: {
    className: "border-success/15 bg-success/8 text-success",
    label: "موجود",
  },
  INACTIVE: {
    className: "border-foreground/8 bg-foreground/5 text-muted-foreground",
    label: "ناموجود",
  },
};

const quantityStyles = {
  empty: "text-muted-foreground",
  normal: "text-success",
};

export function StockItemDialog({
  item,
  locations,
  suppliers,
}: {
  item: StockItem;
  locations: { id: string; name: string }[];
  suppliers: { id: string; name: string }[];
}) {
  const [open, setOpen] = useState(false);

  const { inventories } = item;

  const priorityInventory = getPriorityInventory(inventories);

  const getInventoryStatus = (inventory: StockItemInventory) => {
    if (!inventory.isActive) {
      return {
        className: "border-foreground/8 bg-foreground/5 text-muted-foreground",
        label: "غیرفعال",
      };
    }

    if (inventory.quantity === 0) {
      return {
        className: "border-foreground/8 bg-foreground/5 text-muted-foreground",
        label: "ناموجود",
      };
    }

    return {
      className: "border-success/15 bg-success/8 text-success",
      label: "موجود",
    };
  };

  const getProductStatus = () => {
    if (!item.isProductActive) {
      return {
        className: "border-destructive/15 bg-destructive/8 text-destructive",
        label: "غیرفعال",
      };
    }

    if (item.status === "OUT_OF_STOCK") {
      return productStatusStyles.INACTIVE;
    }

    return productStatusStyles.ACTIVE;
  };

  const getQuantityStyle = (inventory: StockItemInventory) => {
    if (!inventory.isActive || inventory.quantity === 0) {
      return quantityStyles.empty;
    }

    return quantityStyles.normal;
  };

  const productStatus = getProductStatus();

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger
        nativeButton={false}
        render={
          <div className="w-full cursor-pointer text-right">
            <StockItemCard item={item} />
          </div>
        }
      />

      <DialogContent className="max-h-[90dvh] w-[calc(100%-1.5rem)] max-w-sm! gap-0 overflow-y-auto rounded-3xl border-foreground/10 bg-background/95 p-0 shadow-[0_20px_80px_rgba(0,0,0,0.5)] sm:w-full">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/12 to-transparent" />
        <DialogHeader className="space-y-0 px-5 pt-5 pb-4 text-right">
          <div className="flex items-start gap-3">
            {item.image ? (
              <Image
                alt={item.title}
                className="size-12 shrink-0 rounded-xl border border-foreground/8 object-cover"
                height={48}
                src={item.image}
                width={48}
              />
            ) : (
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary/8 text-primary">
                <Package className="size-5" />
              </span>
            )}

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

                  <div className="mt-1 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <Truck className="size-3 shrink-0" />
                    <span className="truncate">{item.supplierName}</span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  <span
                    className={`rounded-lg border px-2.5 py-1 font-medium text-xs ${productStatus.className}`}
                  >
                    {productStatus.label}
                  </span>

                  <EditProductDialog
                    item={item}
                    locations={locations}
                    suppliers={suppliers}
                  />

                  <DeleteProductDialog
                    barcode={item.barcode}
                    // biome-ignore lint/performance/noJsxPropsBind: No performance issue
                    onDeleted={() => setOpen(false)}
                    productId={item.id}
                    title={item.title}
                  />
                </div>
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
              {inventories.length.toLocaleString("fa-IR")} {"رکورد"}
            </span>
          </div>

          {inventories.length > 0 ? (
            <ScrollArea className="h-[300px] pr-1">
              <div className="flex flex-col gap-2.5 pl-1">
                {inventories.map((inventory) => {
                  const status = getInventoryStatus(inventory);

                  return (
                    <InventoryCard
                      // biome-ignore lint/performance/noJsxPropsBind: No performance impact
                      getQuantityStyle={getQuantityStyle}
                      inventory={inventory}
                      isPriority={inventory.id === priorityInventory?.id}
                      itemUnit={item.unit}
                      key={inventory.id}
                      status={status}
                    />
                  );
                })}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-foreground/7 border-dashed bg-foreground/2.5 px-4 py-8 text-center">
              <Package className="size-6 text-muted-foreground" />

              <p className="text-muted-foreground text-xs">
                هنوز موجودی برای این محصول در مکانی ثبت نشده است.
              </p>
            </div>
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
}
