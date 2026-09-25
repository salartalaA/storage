import { AlertTriangle, MapPin, PackageOpen } from "lucide-react";
import type { Inventory } from "./manage-inventory-dialog";

export default function InventoryDisableConfirmation({
  selected,
}: {
  selected: Inventory | undefined;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-2xl border border-foreground/8 bg-card/4.5 p-3">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-foreground/5 text-muted-foreground">
            <PackageOpen className="size-4" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-medium text-xs">{"موجودی انتخاب شده"}</p>

            <div className="mt-1 flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <MapPin className="size-3" />
              <span>{selected?.location}</span>
              <span>•</span>
              <span>
                {selected?.quantity} {"عدد"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-destructive/15 bg-destructive/4 p-3">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
            <AlertTriangle className="size-5" />
          </div>

          <div className="min-w-0">
            <h3 className="font-semibold text-sm">
              {"از غیرفعال سازی این موجودی مطمئن هستید؟"}
            </h3>

            <p className="mt-1 text-muted-foreground text-xs leading-5">
              {"پس از غیرفعال سازی، این موجودی دیگر در دسترس نخواهد بود."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
