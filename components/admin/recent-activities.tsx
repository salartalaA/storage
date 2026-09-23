import {
  CircleArrowDown,
  CircleArrowUp,
  History,
  type LucideIcon,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";

interface Activity {
  amount: string;
  color: "success" | "destructive" | "normal";
  icon: LucideIcon;
  name: string;
  time: string;
  type: string;
}

const activities: Activity[] = [
  {
    amount: "۵۰ عدد",
    color: "success",
    icon: CircleArrowUp,
    name: "شیر کاله",
    time: "۱۰ دقیقه پیش",
    type: "افزایش موجودی",
  },
  {
    amount: "۲۳ عدد",
    color: "normal",
    icon: CircleArrowDown,
    name: "چیپس مزمز",
    time: "۳۵ دقیقه پیش",
    type: "کاهش موجودی",
  },
  {
    amount: "۶ عدد",
    color: "destructive",
    icon: Trash2,
    name: "ماست پگاه",
    time: "۱ ساعت پیش",
    type: "ثبت دورریز",
  },
  {
    amount: "۱۲ عدد",
    color: "normal",
    icon: SlidersHorizontal,
    name: "آب معدنی",
    time: "۲ ساعت پیش",
    type: "اصلاح موجودی",
  },
  {
    amount: "۸۰ عدد",
    color: "success",
    icon: CircleArrowUp,
    name: "بسکویت ساقه طلایی",
    time: "۳ ساعت پیش",
    type: "افزایش موجودی",
  },
];

const colorClasses = {
  destructive: {
    icon: "bg-destructive/10 text-destructive",
    text: "text-destructive",
  },
  normal: {
    icon: "bg-primary/10 text-primary",
    text: "text-primary",
  },
  success: {
    icon: "bg-success/10 text-success",
    text: "text-success",
  },
} as const;

export default function RecentActivities() {
  return (
    <div className="group overflow-hidden rounded-3xl border border-foreground/8 bg-card/4.5 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-[18px] transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/12 hover:bg-card/6.5 hover:shadow-[0_12px_45px_rgba(0,0,0,0.42)]">
      <div className="relative">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
              <History className="text-primary" size={18} />
            </div>

            <h3 className="font-semibold text-foreground text-sm">
              {"فعالیت‌های اخیر"}
            </h3>
          </div>

          <span className="text-[11px] text-muted-foreground">{"امروز"}</span>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute top-2 right-4.5 bottom-2 w-px bg-border/40" />

          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activity.icon;
              const colors = colorClasses[activity.color];

              return (
                <div
                  className="relative flex items-start gap-3"
                  key={`${activity.name}-${activity.type}`}
                >
                  <div
                    className={`relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full ring-1 ring-${colors.icon} ${colors.icon}`}
                  >
                    <Icon className="size-4" />
                  </div>

                  <div className="min-w-0 flex-1 pt-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate font-medium text-sm">
                        {activity.name}
                      </p>

                      <span
                        className={`shrink-0 font-semibold text-xs ${colors.text}`}
                      >
                        {activity.amount}
                      </span>
                    </div>

                    <div className="mt-0.5 flex items-center gap-2">
                      <span
                        className={`font-medium text-[11px] ${colors.text}`}
                      >
                        {activity.type}
                      </span>

                      <span className="text-[11px] text-muted-foreground/40">
                        •
                      </span>

                      <span className="text-[11px] text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
