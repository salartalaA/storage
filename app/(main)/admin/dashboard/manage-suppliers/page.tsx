import { redirect } from "next/navigation";
import { getCurrentStore } from "@/actions/auth";
import { getStoreSuppliers } from "@/actions/supplier";
import AdminHeader from "@/components/admin/admin-header";
import SuppliersExplorer from "@/components/admin/manage-suppliers/suppliers-explorer";

export default async function ManageSuppliersPage() {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return redirect("/auth/login");
  }

  const storeSuppliers = await getStoreSuppliers();

  const suppliers = (storeSuppliers ?? []).map((supplier) => ({
    address: supplier.address,
    contactName: supplier.contactName,
    name: supplier.name,
    phoneNumber: supplier.phoneNumber,
    supplierId: supplier.id,
  }));

  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden px-3">
      <div className="my-6 flex w-full max-w-sm flex-col gap-y-4">
        <AdminHeader />

        <SuppliersExplorer suppliers={suppliers} />
      </div>
    </main>
  );
}
