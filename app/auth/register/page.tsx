import { ArrowLeft, Box } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentStore } from "@/actions/auth";
import RegisterPageForm from "@/components/auth/register/register-page-form";

export default async function RegisterPage() {
  const currentStore = await getCurrentStore();

  if (currentStore) {
    return redirect("/");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-3 text-foreground sm:px-0">
      {/* Card */}
      <div className="z-10 w-full max-w-sm rounded-[1.75rem] border border-foreground/8 bg-card/4.5 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-[18px] sm:p-9">
        {/* Brand */}
        <div className="flex flex-col items-center justify-center gap-3">
          <span className="rounded-2xl border border-primary/20 bg-primary/15 p-2.5 shadow-[0_0_25px_rgba(59,130,246,0.18)] backdrop-blur-md">
            <Box className="stroke-2 text-primary" />
          </span>

          <h1 className="font-bold text-foreground">{"انبار باز"}</h1>

          <p className="-mt-2 font-semibold text-muted-foreground text-sm">
            {"فروشگاهتو راحت تر مدیریت کن!"}
          </p>
        </div>

        {/* Title */}
        <div className="mt-8 flex flex-col gap-1">
          <h3 className="font-bold text-foreground">{"ساخت حساب"}</h3>

          <p className="text-muted-foreground text-sm">
            {"کمتر از یه دقیقه حساب بساز و شروع کن"}
          </p>
        </div>

        <RegisterPageForm />

        <div className="mt-6 flex items-center justify-center gap-x-1">
          <p className="text-muted-foreground">{"حساب داری؟"}</p>

          <Link
            className="flex items-center gap-x-1 font-semibold text-primary text-sm transition-colors hover:text-primary/80"
            href="/auth/login"
          >
            {"وارد شو"}
            <ArrowLeft size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
