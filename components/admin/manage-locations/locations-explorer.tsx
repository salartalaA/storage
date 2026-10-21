"use client";

import { useCallback, useMemo, useState } from "react";
import type { Location } from "@/app/(main)/admin/dashboard/manage-locations/page";
import { AddLocationDialog } from "@/components/admin/manage-locations/add-location-dialog";
import { LocationDetailDialog } from "@/components/admin/manage-locations/location-item-dialog";
import NoLocationCard from "@/components/admin/manage-locations/no-locations-card";
import SearchLocation from "@/components/admin/manage-locations/search-location";
import { normalizeSearchText } from "@/lib/search";

export default function LocationsExplorer({
  locations,
}: {
  locations: Location[];
}) {
  const [query, setQuery] = useState("");

  const filteredLocations = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query);

    if (!normalizedQuery) {
      return locations;
    }

    return locations.filter((location) =>
      normalizeSearchText(location.name).includes(normalizedQuery)
    );
  }, [locations, query]);

  const clearSearch = useCallback(() => {
    setQuery("");
  }, []);

  return (
    <>
      <SearchLocation onChange={setQuery} value={query} />

      <div className="flex flex-col gap-3">
        <div className="fade-in slide-in-from-bottom-2 flex animate-in items-center justify-between duration-500">
          <span className="text-muted-foreground text-xs">
            {filteredLocations.length.toLocaleString("fa-IR")} مکان
          </span>

          <AddLocationDialog />
        </div>

        {!locations.length && <NoLocationCard />}

        {locations.length > 0 && filteredLocations.length === 0 && (
          <div className="mt-4 flex flex-col items-center justify-center gap-2 rounded-3xl border border-foreground/8 bg-card/4.5 p-3 py-6">
            <p className="font-semibold text-sm">مکانی با این نام پیدا نشد.</p>

            <button
              className="mt-2 rounded-xl border border-foreground/8 bg-foreground/3 px-3 py-1.5 text-xs transition-colors hover:border-foreground/15 hover:bg-foreground/5"
              onClick={clearSearch}
              type="button"
            >
              پاک کردن جستجو
            </button>
          </div>
        )}

        {filteredLocations.map((location) => (
          <LocationDetailDialog key={location.id} location={location} />
        ))}
      </div>
    </>
  );
}
