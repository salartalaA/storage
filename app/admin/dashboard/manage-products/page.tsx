import { redirect } from "next/navigation";
import { getCurrentStore } from "@/actions/auth";
import AdminHeader from "@/components/admin/admin-header";
import ProductFilters from "@/components/admin/manage-products/product-filter";
import SearchBox from "@/components/admin/manage-products/search-box";
import type { StockItem } from "@/components/admin/manage-products/stock-item-card";
import { StockItemDialog } from "@/components/admin/manage-products/stock-item-dialog";

export default async function ManageProductsPage() {
  const currentStore = await getCurrentStore();

  if (!currentStore) {
    return redirect("/auth/login");
  }

  const stockItems: StockItem[] = [
    {
      barcode: "6266789012346",
      category: "مواد غذایی",
      id: "item-101",
      image: "/golestan-rice.jpg",
      lastUpdated: "۱۴۰۵/۰۶/۲۴",
      location: "انبار اصلی",
      quantity: 32,
      status: "IN_STOCK",
      title: "برنج طارم گلستان",
    },
    {
      barcode: "6261112223334",
      category: "لبنیات",
      id: "item-102",
      image: "/lighvan-cheese.png",
      lastUpdated: "۱۴۰۵/۰۶/۲۴",
      location: "سردخانه",
      quantity: 20,
      status: "LOW_STOCK",
      title: "پنیر سفید لیقوان",
    },
    {
      barcode: "6261234567891",
      category: "لبنیات",
      id: "item-103",
      image: "/pegah-milk.png",
      lastUpdated: "۱۴۰۵/۰۶/۲۳",
      location: "انبار اصلی",
      quantity: 32,
      status: "IN_STOCK",
      title: "شیر کم‌چرب پگاه",
    },
    {
      barcode: "6262345678902",
      category: "لبنیات",
      id: "item-104",
      image: "/yogurt-seven.jpg",
      lastUpdated: "۱۴۰۵/۰۶/۲۳",
      location: "سردخانه",
      quantity: 32,
      status: "IN_STOCK",
      title: "ماست کاله",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center overflow-hidden px-3">
      <div className="my-6 flex w-full max-w-2xl flex-col gap-y-4">
        <AdminHeader />

        <SearchBox />

        <ProductFilters />

        <div className="flex flex-col gap-3">
          {stockItems.map((item) => (
            <StockItemDialog item={item} key={item.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
