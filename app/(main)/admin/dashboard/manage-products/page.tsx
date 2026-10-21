import { redirect } from "next/navigation";
import { getCurrentStore } from "@/actions/auth";
import { getStoreLocationOptions } from "@/actions/location";
import { getStoreProducts } from "@/actions/product";
import { getStoreSupplierOptions } from "@/actions/supplier";
import AdminHeader from "@/components/admin/admin-header";
import { ProductsExplorer } from "@/components/admin/manage-products/products-explorer";
import type {
  StockItem,
  StockItemInventory,
} from "@/components/admin/manage-products/stock-item-card";
import { formatPersianDate } from "@/lib/date";
import {
  getPriorityInventory,
  sortInventoriesByPriority,
} from "@/lib/inventory";

function getProductStatus(totalQuantity: number): StockItem["status"] {
  return totalQuantity > 0 ? "IN_STOCK" : "OUT_OF_STOCK";
}

export default async function ManageProductsPage() {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return redirect("/auth/login");
  }

  const storeProducts = await getStoreProducts();
  const locationOptions = await getStoreLocationOptions();
  const supplierOptions = await getStoreSupplierOptions();

  const stockItems: StockItem[] = (storeProducts ?? []).map((product) => {
    const inventories = sortInventoriesByPriority(
      product.inventories.map(
        (inventory): StockItemInventory => ({
          barcode: product.barcode,
          expirationDate: formatPersianDate(inventory.expirationDate),
          expirationDateTimestamp: inventory.expirationDate?.getTime() ?? null,
          id: inventory.id,
          isActive: inventory.isActive,
          location: inventory.location.name,
          locationId: inventory.locationId,
          productionDate: formatPersianDate(inventory.productionDate),
          quantity: inventory.quantity,
          unitPrice: inventory.unitPrice.toLocaleString("fa-IR"),
        })
      )
    );

    const totalQuantity = inventories
      .filter((inventory) => inventory.isActive)
      .reduce((total, inventory) => total + inventory.quantity, 0);

    const timestamps = [
      product.updatedAt,
      ...product.inventories.map((inventory) => inventory.updatedAt),
    ];

    const lastUpdated = new Date(
      Math.max(...timestamps.map((timestamp) => timestamp.getTime()))
    );

    const activeInventories = inventories.filter(
      (inventory) => inventory.isActive
    );

    const priorityInventory = getPriorityInventory(inventories);

    return {
      barcode: product.barcode,
      category: product.category,
      id: product.id,
      image: product.image,
      inventories,
      isProductActive: product.isActive,
      lastUpdated: formatPersianDate(lastUpdated),
      location:
        priorityInventory?.location ??
        activeInventories.at(0)?.location ??
        inventories.at(0)?.location ??
        "بدون مکان",
      quantity: totalQuantity,
      status: getProductStatus(totalQuantity),
      supplierId: product.supplier?.id ?? null,
      supplierName: product.supplier?.name ?? "بدون تامین‌کننده",
      title: product.title,
      unit: product.unit,
    };
  });

  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden px-3">
      <div className="my-6 flex w-full max-w-sm flex-col gap-y-4">
        <AdminHeader />

        <ProductsExplorer
          items={stockItems}
          locations={locationOptions}
          suppliers={supplierOptions}
        />
      </div>
    </main>
  );
}
