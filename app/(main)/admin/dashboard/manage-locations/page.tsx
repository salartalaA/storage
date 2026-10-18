import { redirect } from "next/navigation";
import { getCurrentStore } from "@/actions/auth";
import { getStoreLocations } from "@/actions/location";
import AdminHeader from "@/components/admin/admin-header";
import { AddLocationDialog } from "@/components/admin/manage-locations/add-location-dialog";
import { LocationDetailDialog } from "@/components/admin/manage-locations/location-item-dialog";
import SearchLocation from "@/components/admin/manage-locations/search-location";

export interface LocationInventory {
  barcode: string;
  expirationDate: string;
  id: string;
  productionDate: string;
  productName: string;
  quantity: number;
  unitPrice: string;
}

export interface Location {
  id: string;
  inventories: LocationInventory[];
  name: string;
  productCount: number;
  stockCount: number;
}

// Template for locationInventories constant:
// const locationInventories: Record<string, LocationInventory[]> = {
//   "locationName": [
//     {
//       barcode: "string",
//       expirationDate: "string",
//       id: "string",
//       productionDate: "string",
//       productName: "string",
//       quantity: number,
//       unitPrice: "string",
//     },
//   ],
// };

// Template for locationStats constant:
// const locationStats: Record<string, { productCount: number; stockCount: number }> = {
//   "locationName": {
//     productCount: number,
//     stockCount: number,
//   },
// };

export default async function ManageLocationsPage() {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return redirect("/auth/login");
  }

  const storeLocations = await getStoreLocations();

  const locations: Location[] =
    storeLocations?.map((location) => ({
      id: location.id,
      inventories: [],
      name: location.name,
      productCount: 0,
      stockCount: 0,
    })) || [];

  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden px-3">
      <div className="my-6 flex w-full max-w-sm flex-col gap-y-4">
        <AdminHeader />

        <SearchLocation />

        <div className="flex flex-col gap-3">
          <div className="fade-in slide-in-from-bottom-2 flex animate-in items-center justify-between duration-500">
            <span className="text-muted-foreground text-xs">
              {locations.length} مکان
            </span>

            <AddLocationDialog />
          </div>

          {locations.map((location) => (
            <LocationDetailDialog key={location.id} location={location} />
          ))}
        </div>
      </div>
    </main>
  );
}
