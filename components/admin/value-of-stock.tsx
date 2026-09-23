import { TrendingUp, Wallet } from "lucide-react";
import { ChartAreaGradient } from "./chart-area-gradient";

export default function ValueOfStock() {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-foreground/8 bg-card/4.5 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-[18px] transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/12 hover:bg-card/6.5 hover:shadow-[0_12px_45px_rgba(0,0,0,0.42)]">
      {/* Glass reflection */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/12 to-transparent" />

      <div className="relative">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-success/10 text-success">
              <Wallet size={18} />
            </span>

            <h3 className="font-semibold text-base">{"ارزش موجودی"}</h3>
          </div>

          <span className="text-muted-foreground text-xs">{"۶ ماه اخیر"}</span>
        </div>

        {/* Main Value */}
        <div className="mb-5 flex items-end gap-x-3">
          <div>
            <p className="text-muted-foreground text-xs">{"ارزش کل موجودی"}</p>

            <p className="mt-1 font-bold text-2xl tracking-tight">
              {"۲۸۵ میلیون"}
            </p>

            <p className="text-muted-foreground text-xs">{"تومان"}</p>
          </div>

          <div className="ms-auto flex items-center gap-x-1 rounded-full bg-success/10 px-2.5 py-1 text-success">
            <TrendingUp size={13} />

            <span className="font-medium text-xs">{"۹.۶٪ رشد"}</span>
          </div>
        </div>

        <ChartAreaGradient />

        <div className="my-4 h-px bg-border" />

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-xs">
              {"میانگین قیمت محصولات"}
            </p>

            <p className="mt-1 font-bold text-lg">{"۱,۱۶۳,۲۶۵ تومان"}</p>
          </div>

          <div className="text-left">
            <p className="text-muted-foreground text-xs">{"ارزش سرانه"}</p>

            <p className="mt-1 font-bold text-lg text-success">{"۱۶٪"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
