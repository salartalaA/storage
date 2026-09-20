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
    <main className="mx-3 flex min-h-screen items-center justify-center overflow-hidden bg-background text-foreground sm:mx-0">
      <div className="w-full max-w-md rounded-2xl border border-border/60 bg-card p-6 shadow-card backdrop-blur-md sm:p-9">
        <div className="flex flex-col items-center justify-center gap-3">
          <span className="rounded-xl bg-linear-to-br from-primary to-accent p-2.5">
            <Box className="stroke-2" />
          </span>
          <h1 className="font-bold text-foreground">{"انبار باز"}</h1>
          <p className="-mt-2 font-semibold text-muted-foreground text-sm">
            {"فروشگاهتو راحت تر مدیریت کن!"}
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-1">
          <h3 className="font-bold">{"خوش برگشتی!"}</h3>
          <p className="text-muted-foreground text-sm">
            {"وارد شو تا فروشگاهتو مدیریت کنی."}
          </p>
        </div>

        <LoginPageForm />

        <div className="mt-6 flex items-center justify-center gap-x-1">
          <p className="text-muted-foreground">{"حساب نداری؟"} </p>
          <Link
            className="flex items-center gap-x-1 font-semibold text-primary text-sm"
            href={"/auth/register"}
          >
            {"یدونه بساز"} <ArrowLeft size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
