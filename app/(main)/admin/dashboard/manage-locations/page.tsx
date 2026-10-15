import { redirect } from "next/navigation";
import { getCurrentStore } from "@/actions/auth";
import AdminHeader from "@/components/admin/admin-header";
import { AddLocationDialog } from "@/components/admin/manage-locations/add-ocation-dialog";
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

export default async function ManageLocationsPage() {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return redirect("/auth/login");
  }

  const locations: Location[] = [
    {
      id: "location-",
      inventories: [
        {
          barcode: "6261234567891",
          expirationDate: "۱۴۰۵/۰۷/۱۰",
          id: "inventory-1",
          productionDate: "۱۴۰۵/۰۶/۱۰",
          productName: "شیر کم‌چرب پگاه",
          quantity: 24,
          unitPrice: "۸۵٬۰۰۰",
        },
        {
          barcode: "6264567890124",
          expirationDate: "۱۴۰۷/۰۶/۰۱",
          id: "inventory-2",
          productionDate: "۱۴۰۵/۰۶/۰۱",
          productName: "آب معدنی دماوند",
          quantity: 60,
          unitPrice: "۱۵٬۰۰۰",
        },
        {
          barcode: "6266789012346",
          expirationDate: "۱۴۰۷/۰۳/۰۱",
          id: "inventory-3",
          productionDate: "۱۴۰۵/۰۳/۰۱",
          productName: "برنج طارم گلستان",
          quantity: 20,
          unitPrice: "۸۵۰٬۰۰۰",
        },
      ],
      name: "انبار اصلی",
      productCount: 4,
      stockCount: 3,
    },
    {
      id: "location-2",
      inventories: [
        {
          barcode: "6268901234568",
          expirationDate: "۱۴۰۸/۰۲/۰۱",
          id: "inventory-4",
          productionDate: "۱۴۰۵/۰۲/۰۱",
          productName: "دستمال کاغذی سافتلن",
          quantity: 4,
          unitPrice: "۹۵٬۰۰۰",
        },
        {
          barcode: "6265556667778",
          expirationDate: "۱۴۰۸/۰۱/۱۵",
          id: "inventory-5",
          productionDate: "۱۴۰۵/۰۱/۱۵",
          productName: "دستمال توالت بچه",
          quantity: 0,
          unitPrice: "۷۰٬۰۰۰",
        },
      ],
      name: "انبار پشتی",
      productCount: 5,
      stockCount: 4,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden px-3">
      <div className="my-6 flex w-full max-w-sm flex-col gap-y-4">
        <AdminHeader />

        <SearchLocation />

        <div className="flex flex-col gap-3">
          <div className="fade-in slide-in-from-bottom-2 flex animate-in items-center justify-between duration-500">
            <span className="text-muted-foreground text-xs">8 مکان</span>

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
