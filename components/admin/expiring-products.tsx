import { CalendarClock, TriangleAlert } from "lucide-react";

const expiringProducts = [
  {
    color: "destructive",
    date: "۲۸ شهریور",
    days: "۶ روز",
    name: "شیر کاله",
    quantity: "۲۴ عدد",
  },
  {
    color: "warning",
    date: "۳۰ شهریور",
    days: "۸ روز",
    name: "ماست پگاه",
    quantity: "۱۸ عدد",
  },
  {
    color: "warning",
    date: "۲ مهر",
    days: "۱۰ روز",
    name: "نوشابه کوکا",
    quantity: "۴۸ عدد",
  },
  {
    color: "normal",
    date: "۵ مهر",
    days: "۱۳ روز",
    name: "پنیر لیقوان",
    quantity: "۱۲ عدد",
  },
] as const;

const colorClasses = {
  destructive: {
    badge: "border-destructive/20 bg-destructive/15 text-destructive",
    icon: "bg-destructive/10 text-destructive",
  },
  normal: {
    badge: "border-primary/20 bg-primary/15 text-primary",
    icon: "bg-primary/10 text-primary",
  },
  warning: {
    badge: "border-warning/20 bg-warning/15 text-warning",
    icon: "bg-warning/10 text-warning",
  },
};

export default function ExpiringProducts() {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-foreground/8 bg-card/4.5 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-[18px] transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/12 hover:bg-card/6.5 hover:shadow-[0_12px_45px_rgba(0,0,0,0.42)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/12 to-transparent" />

      <div className="pointer-events-none absolute -top-12 -right-12 size-28 rounded-full bg-primary/4.5 blur-3xl transition-all duration-300 group-hover:bg-primary/8" />

      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-warning/10">
              <TriangleAlert className="text-warning" size={18} />
            </div>

            <h3 className="font-semibold text-foreground text-sm">
              {"محصولات نزدیک به انقضا"}
            </h3>
          </div>

          <span className="flex size-6 items-center justify-center rounded-full bg-warning/10 font-bold text-[11px] text-warning">
            {"۴"}
          </span>
        </div>

        <div>
          {expiringProducts.map((product, index) => {
            const colors = colorClasses[product.color];

            return (
              <div key={product.name}>
                <div className="flex items-center gap-3 py-2">
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-xl ring-1 ring-${colors.icon} ${colors.icon}`}
                  >
                    <CalendarClock size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-sm">
                      {product.name}
                    </p>

                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="text-[11px] text-muted-foreground">
                        {product.date}
                      </span>

                      <span className="text-muted-foreground/40">•</span>

                      <span className="text-[11px] text-muted-foreground">
                        {product.quantity}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`shrink-0 rounded-full border px-2.5 py-0.5 font-semibold text-destructive text-xs ${colors.badge}`}
                  >
                    {product.days}
                  </div>
                </div>

                {index < expiringProducts.length - 1 && (
                  <div className="h-px w-full bg-border/60" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
