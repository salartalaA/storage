"use client";

import { useCallback, useMemo, useState } from "react";
import { AddSupplierDialog } from "@/components/admin/manage-suppliers/add-supplier-dialog";
import NoSupplierCards from "@/components/admin/manage-suppliers/no-suppliers-card";
import SearchSuppliers from "@/components/admin/manage-suppliers/search-suppliers";
import { SupplierItemCard } from "@/components/admin/manage-suppliers/supplier-item-card";
import { normalizeSearchText } from "@/lib/search";

export interface SupplierInfo {
  address: string;
  contactName: string;
  name: string;
  phoneNumber: string;
  supplierId: string;
}

export default function SuppliersExplorer({
  suppliers,
}: {
  suppliers: SupplierInfo[];
}) {
  const [query, setQuery] = useState("");

  const filteredSuppliers = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query);

    if (!normalizedQuery) {
      return suppliers;
    }

    return suppliers.filter(
      (supplier) =>
        normalizeSearchText(supplier.name).includes(normalizedQuery) ||
        normalizeSearchText(supplier.phoneNumber).includes(normalizedQuery) ||
        normalizeSearchText(supplier.contactName).includes(normalizedQuery)
    );
  }, [query, suppliers]);

  const clearSearch = useCallback(() => {
    setQuery("");
  }, []);

  return (
    <>
      <SearchSuppliers onChange={setQuery} value={query} />

      <div className="flex flex-col gap-3">
        <div className="fade-in slide-in-from-bottom-2 flex animate-in items-center justify-between duration-500">
          <span className="text-muted-foreground text-xs">
            {filteredSuppliers.length.toLocaleString("fa-IR")} تامین کننده
          </span>

          <AddSupplierDialog />
        </div>

        {!suppliers.length && <NoSupplierCards />}

        {suppliers.length > 0 && filteredSuppliers.length === 0 && (
          <div className="mt-4 flex flex-col items-center justify-center gap-2 rounded-3xl border border-foreground/8 bg-card/4.5 p-3 py-6">
            <p className="font-semibold text-sm">
              تامین‌کننده‌ای با این مشخصات پیدا نشد.
            </p>

            <button
              className="mt-2 rounded-xl border border-foreground/8 bg-foreground/3 px-3 py-1.5 text-xs transition-colors hover:border-foreground/15 hover:bg-foreground/5"
              onClick={clearSearch}
              type="button"
            >
              پاک کردن جستجو
            </button>
          </div>
        )}

        {filteredSuppliers.map((supplier) => (
          <SupplierItemCard
            address={supplier.address}
            contactName={supplier.contactName}
            key={supplier.supplierId}
            name={supplier.name}
            phoneNumber={supplier.phoneNumber}
            supplierId={supplier.supplierId}
          />
        ))}
      </div>
    </>
  );
}
