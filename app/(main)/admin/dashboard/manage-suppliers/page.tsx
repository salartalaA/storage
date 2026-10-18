import { redirect } from "next/navigation";
import { getCurrentStore } from "@/actions/auth";
import { getStoreSuppliers } from "@/actions/supplier";
import AdminHeader from "@/components/admin/admin-header";
import { AddSupplierDialog } from "@/components/admin/manage-suppliers/add-supplier-dialog";
import NoSupplierCards from "@/components/admin/manage-suppliers/no-suppliers-card";
import SearchSuppliers from "@/components/admin/manage-suppliers/search-suppliers";
import { SupplierItemCard } from "@/components/admin/manage-suppliers/supplier-item-card";

export default async function ManageSuppliersPage() {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return redirect("/auth/login");
  }

  const storeSuppliers = await getStoreSuppliers();

  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden px-3">
      <div className="my-6 flex w-full max-w-sm flex-col gap-y-4">
        <AdminHeader />

        <SearchSuppliers />

        <div className="flex flex-col gap-3">
          <div className="fade-in slide-in-from-bottom-2 flex animate-in items-center justify-between duration-500">
            <span className="text-muted-foreground text-xs">
              {storeSuppliers?.length} تامین کننده
            </span>

            <AddSupplierDialog />
          </div>

          {storeSuppliers && storeSuppliers.length > 0 ? (
            storeSuppliers.map((supplierInfo) => (
              <SupplierItemCard
                address={supplierInfo.address}
                contactName={supplierInfo.contactName}
                key={supplierInfo.id}
                name={supplierInfo.name}
                phoneNumber={supplierInfo.phoneNumber}
                supplierId={supplierInfo.id}
              />
            ))
          ) : (
            <NoSupplierCards />
          )}
        </div>
      </div>
    </main>
  );
}
