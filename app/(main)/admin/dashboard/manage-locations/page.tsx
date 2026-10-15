import { redirect } from "next/navigation";
import { getCurrentStore } from "@/actions/auth";
import AdminHeader from "@/components/admin/admin-header";
import SearchLocation from "@/components/admin/manage-locations/search-location";

export default async function ManageProductsPage() {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return redirect("/auth/login");
  }

  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden px-3">
      <div className="my-6 flex w-full max-w-sm flex-col gap-y-4">
        <AdminHeader />

        <SearchLocation />
      </div>
    </main>
  );
}
