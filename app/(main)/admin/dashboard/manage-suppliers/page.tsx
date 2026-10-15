import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { getCurrentStore } from "@/actions/auth";
import AdminHeader from "@/components/admin/admin-header";
import SearchSuppliers from "@/components/admin/manage-suppliers/search-suppliers";
import { SupplierItemCard } from "@/components/admin/manage-suppliers/supplier-item-card";
import { Button } from "@/components/ui/button";

export default async function ManageSuppliersPage() {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return redirect("/auth/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden px-3">
      <div className="my-6 flex w-full max-w-sm flex-col gap-y-4">
        <AdminHeader />

        <SearchSuppliers />

        <div className="flex flex-col gap-3">
          <div className="fade-in slide-in-from-bottom-2 flex animate-in items-center justify-between duration-500">
            <span className="text-muted-foreground text-xs">10 تامین‌کننده</span>

            <Button className="flex items-center gap-1 rounded-2xl text-xs">
              <Plus size={14} />
              <span>افزودن تامین‌کننده</span>
            </Button>
          </div>

          <SupplierItemCard />
        </div>
      </div>
    </main>
  );
}
