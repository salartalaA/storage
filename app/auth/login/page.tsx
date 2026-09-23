import { ArrowLeft, Box } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentStore } from "@/actions/auth";
import LoginPageForm from "@/components/auth/login/login-page-form";

export default async function LoginPage() {
  const currentStore = await getCurrentStore();

  if (currentStore) {
    return redirect("/");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-3 text-foreground sm:px-0">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 size-96 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute -bottom-40 -left-32 size-105 rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute top-1/3 -right-40 size-105 rounded-full bg-primary/10 blur-[130px]" />
        <div className="absolute -right-24 -bottom-48 size-96 rounded-full bg-primary/20 blur-[130px]" />

        {/* Soft glass shapes */}
        <div className="absolute top-1/3 -left-16 h-56 w-40 rotate-12 rounded-4xl border border-primary/10 bg-primary/5 blur-[1px] backdrop-blur-sm" />
        <div className="absolute top-1/4 -right-20 h-64 w-44 -rotate-12 rounded-4xl border border-primary/10 bg-primary/5 blur-[1px] backdrop-blur-sm" />
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md rounded-[1.75rem] border border-foreground/8 bg-card/4.5 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-[18px] sm:p-9">
        {/* Subtle card glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-[1.75rem] bg-primary/[0.035] blur-2xl" />

        <div className="flex flex-col items-center justify-center gap-3">
          <span className="rounded-2xl border border-primary/20 bg-primary/15 p-2.5 shadow-[0_0_25px_rgba(59,130,246,0.18)] backdrop-blur-md">
            <Box className="stroke-2 text-primary" />
          </span>

          <h1 className="font-bold text-foreground">{"انبار باز"}</h1>

          <p className="-mt-2 font-semibold text-muted-foreground text-sm">
            {"فروشگاهتو راحت تر مدیریت کن!"}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-1">
          <h3 className="font-bold text-foreground">{"خوش برگشتی!"}</h3>

          <p className="text-muted-foreground text-sm">
            {"وارد شو تا فروشگاهتو مدیریت کنی."}
          </p>
        </div>

        <LoginPageForm />

        <div className="mt-6 flex items-center justify-center gap-x-1">
          <p className="text-muted-foreground">{"حساب نداری؟"}</p>

          <Link
            className="flex items-center gap-x-1 font-semibold text-primary text-sm transition-colors hover:text-primary/80"
            href="/auth/register"
          >
            {"یدونه بساز"}
            <ArrowLeft size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
