"use client";
import ManageInventoryDialog from "@/components/admin/manage-products/inventory/manage-inventory-dialog";
import type { StockItem } from "@/components/admin/manage-products/stock-item-card";

export default function ActionButtons({ item }: { item: StockItem }) {
  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    // biome-ignore lint/a11y/noNoninteractiveElementInteractions: intentional interaction
    // biome-ignore lint/a11y/noStaticElementInteractions: intentional interaction
    // biome-ignore lint/a11y/useKeyWithClickEvents: intentional interaction
    <div
      className="grid grid-cols-3 gap-2"
      onClick={handleActionClick}
      onPointerDown={handleActionClick}
    >
      <ManageInventoryDialog item={item} mode="increase" />

      <ManageInventoryDialog item={item} mode="decrease" />

      <ManageInventoryDialog item={item} mode="disable" />
    </div>
  );
}
