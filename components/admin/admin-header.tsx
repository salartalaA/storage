import { Calendar, LogOut, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminHeader() {
  return (
    <header className="mt-6 overflow-hidden rounded-3xl border border-foreground/8 bg-card/4.5 p-4 px-8 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-[18px]">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <span className="-ms-4 rounded-xl border border-foreground/6 bg-card/70 p-3 shadow-[0_4px_18px_rgba(0,0,0,0.22)] backdrop-blur-md">
            <Store className="text-primary" size={20} />
          </span>

          <div>
            <h3 className="font-bold text-foreground">
              {"صبح بخیر، فروشگاه افق کوروش"}
            </h3>

            <div className="mt-1 flex items-center gap-x-2 text-muted-foreground text-xs">
              <Calendar size={14} />
              <span>{"شنبه، ۲۲ شهریور ۱۴۰۴"}</span>
            </div>
          </div>
        </div>

        <Button
          className="-me-4 size-10 rounded-xl border border-foreground/5 bg-card/60 text-muted-foreground shadow-none backdrop-blur-md transition-all duration-200 hover:bg-card/90 hover:text-foreground"
          variant="ghost"
        >
          <LogOut size={18} />
        </Button>
      </div>
    </header>
  );
}
