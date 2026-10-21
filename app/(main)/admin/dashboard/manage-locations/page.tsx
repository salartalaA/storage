import { redirect } from "next/navigation";
import { getCurrentStore } from "@/actions/auth";
import { getStoreLocations } from "@/actions/location";
import AdminHeader from "@/components/admin/admin-header";
import LocationsExplorer from "@/components/admin/manage-locations/locations-explorer";
import { formatPersianDate } from "@/lib/date";

export interface LocationInventory {
  barcode: string;
  expirationDate: string;
  id: string;
  isActive: boolean;
  productionDate: string;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: string;
}

export interface Location {
  id: string;
  inventories: LocationInventory[];
  name: string;
  productCount: number;
  stockCount: number;
}

export default async function ManageLocationsPage() {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return redirect("/auth/login");
  }

  const storeLocations = await getStoreLocations();

  const locations: Location[] =
    storeLocations?.map((location) => {
      const inventories: LocationInventory[] = location.inventories.map(
        (inventory) => ({
          barcode: inventory.product.barcode,
          expirationDate: formatPersianDate(inventory.expirationDate),
          id: inventory.id,
          isActive: inventory.isActive,
          productionDate: formatPersianDate(inventory.productionDate),
          productName: inventory.product.title,
          quantity: inventory.quantity,
          unit: inventory.product.unit,
          unitPrice: inventory.unitPrice.toLocaleString("fa-IR"),
        })
      );

      const activeInventories = location.inventories.filter(
        (inventory) => inventory.isActive
      );

      return {
        id: location.id,
        inventories,
        name: location.name,
        productCount: new Set(
          activeInventories.map((inventory) => inventory.product.id)
        ).size,
        stockCount: activeInventories.reduce(
          (total, inventory) => total + inventory.quantity,
          0
        ),
      };
    }) || [];

  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden px-3">
      <div className="my-6 flex w-full max-w-sm flex-col gap-y-4">
        <AdminHeader />

        <LocationsExplorer locations={locations} />
      </div>
    </main>
  );
}
