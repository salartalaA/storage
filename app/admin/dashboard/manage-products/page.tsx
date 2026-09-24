import AdminHeader from "@/components/admin/admin-header";
import ProductFilters from "@/components/admin/manage-products/product-filter";
import SearchBox from "@/components/admin/manage-products/search-box";

export default function ManageProductsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden px-3">
      <div className="my-6 flex w-full max-w-2xl flex-col gap-y-4">
        <AdminHeader />

        <SearchBox />

        <ProductFilters />
      </div>
    </main>
  );
}
