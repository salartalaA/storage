"use client";

import { useCallback, useMemo, useState } from "react";
import { AddProductDialog } from "@/components/admin/manage-products/add-product-dialog";
import NoProductsCard from "@/components/admin/manage-products/no-products-card";
import ProductFilters, {
  type Category,
  productFilterCategories,
  type Status,
} from "@/components/admin/manage-products/product-filter";
import SearchBox from "@/components/admin/manage-products/search-box";
import type { StockItem } from "@/components/admin/manage-products/stock-item-card";
import { StockItemDialog } from "@/components/admin/manage-products/stock-item-dialog";
import { normalizeSearchText } from "@/lib/search";

export function ProductsExplorer({
  items,
  locations,
  suppliers,
}: {
  items: StockItem[];
  locations: { id: string; name: string }[];
  suppliers: { id: string; name: string }[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const [activeStatus, setActiveStatus] = useState<Status>("ALL");

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query);
    const categoryValue = productFilterCategories.find(
      (category) => category.label === activeCategory
    )?.value;

    return items.filter((item) => {
      const matchesQuery =
        !normalizedQuery ||
        normalizeSearchText(item.title).includes(normalizedQuery) ||
        normalizeSearchText(item.barcode).includes(normalizedQuery);

      const matchesCategory =
        activeCategory === "ALL" || item.category === categoryValue;

      const matchesStatus =
        activeStatus === "ALL" || item.status === activeStatus;

      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [activeCategory, activeStatus, items, query]);

  const resetFilters = useCallback(() => {
    setQuery("");
    setActiveCategory("ALL");
    setActiveStatus("ALL");
  }, []);

  return (
    <>
      <SearchBox onChange={setQuery} value={query} />

      <ProductFilters
        activeCategory={activeCategory}
        activeStatus={activeStatus}
        onCategoryChange={setActiveCategory}
        onStatusChange={setActiveStatus}
        productCount={filteredItems.length}
      />

      <div className="fade-in slide-in-from-bottom-2 flex animate-in items-center justify-between duration-500">
        <span className="text-muted-foreground text-xs">
          {filteredItems.length.toLocaleString("fa-IR")} محصول
        </span>

        <AddProductDialog locations={locations} suppliers={suppliers} />
      </div>

      <div className="flex flex-col gap-3">
        {!items.length && <NoProductsCard />}

        {items.length > 0 && filteredItems.length === 0 && (
          <div className="mt-4 flex flex-col items-center justify-center gap-2 rounded-3xl border border-foreground/8 bg-card/4.5 p-3 py-6">
            <p className="font-semibold text-sm">
              محصولی با این مشخصات پیدا نشد.
            </p>

            <p className="text-muted-foreground text-xs">
              عبارت جستجو یا فیلترها را تغییر دهید.
            </p>

            <button
              className="mt-2 rounded-xl border border-foreground/8 bg-foreground/3 px-3 py-1.5 text-xs transition-colors hover:border-foreground/15 hover:bg-foreground/5"
              onClick={resetFilters}
              type="button"
            >
              پاک کردن فیلترها
            </button>
          </div>
        )}

        {filteredItems.map((item) => (
          <StockItemDialog
            item={item}
            key={item.id}
            locations={locations}
            suppliers={suppliers}
          />
        ))}
      </div>
    </>
  );
}
