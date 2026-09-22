"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import zxcvbn from "zxcvbn";
import { createStore } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type RegisterData, registerSchema } from "@/schema/auth";

export default function RegisterPageForm() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const password = watch("storePassword") ?? "";

  const passwordStrength = zxcvbn(password).score;

  const passwordStrengthLabels = [
    "خیلی ضعیف",
    "ضعیف",
    "خوب",
    "خیلی خوب",
    "عالی",
  ] as const;

  const router = useRouter();

  const onsubmit = async (data: RegisterData) => {
    const result = await createStore(data);

    if (!result.success && result.error === "EMAIL_ALREADY_EXISTS") {
      return toast.error("این ایمیل قبلا ثبت شده است!");
    }

    toast.success("حساب ساخته شد!");

    router.push("/auth/login");
  };

  return (
    <form
      className="mt-6 flex flex-col gap-5"
      onSubmit={handleSubmit(onsubmit)}
    >
      {/* Store name */}
      <div className="flex flex-col gap-2.5">
        <Label
          className="font-semibold text-foreground text-sm"
          htmlFor="storeName"
        >
          {"نام فروشگاه"}
        </Label>

        <Input
          autoComplete="off"
          className="h-11 rounded-xl border border-foreground/10 bg-foreground/[0.035] px-4 text-foreground shadow-black/10 shadow-inner backdrop-blur-md transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:bg-foreground/6 focus:ring-2 focus:ring-primary/20"
          id="storeName"
          placeholder="افق کوروش"
          {...register("storeName")}
          type="text"
        />

        {errors.storeName ? (
          <div className="font-semibold text-destructive text-xs">
            {errors.storeName.message}
          </div>
        ) : null}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2.5">
        <Label
          className="font-semibold text-foreground text-sm"
          htmlFor="storeEmail"
        >
          {"ایمیل فروشگاه"}
        </Label>

        <Input
          autoComplete="off"
          className="h-11 rounded-xl border border-foreground/10 bg-foreground/[0.035] px-4 text-foreground shadow-black/10 shadow-inner backdrop-blur-md transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:bg-foreground/6 focus:ring-2 focus:ring-primary/20"
          id="storeEmail"
          placeholder="store@gmail.com"
          {...register("storeEmail")}
          dir="ltr"
          type="email"
        />

        {errors.storeEmail ? (
          <div className="font-semibold text-destructive text-xs">
            {errors.storeEmail.message}
          </div>
        ) : null}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2.5">
        <Label
          className="font-semibold text-foreground text-sm"
          htmlFor="storePassword"
        >
          {"رمز عبور فروشگاه"}
        </Label>

        <div className="relative">
          <Input
            autoComplete="off"
            className="h-11 rounded-xl border border-foreground/10 bg-foreground/[0.035] px-4 pr-12 text-foreground shadow-black/10 shadow-inner backdrop-blur-md transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:bg-foreground/6 focus:ring-2 focus:ring-primary/20"
            dir="ltr"
            id="storePassword"
            {...register("storePassword")}
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
          />

          <Button
            className="absolute top-1/2 right-1.5 size-8 -translate-y-1/2! rounded-lg border border-foreground/10 bg-foreground/6 text-muted-foreground backdrop-blur-md hover:bg-foreground/10 hover:text-foreground"
            onClick={handleShowPassword}
            type="button"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </div>

        {password.length > 0 && (
          <>
            <p className="text-muted-foreground text-sm">
              {passwordStrengthLabels[passwordStrength]}
            </p>

            <div className="flex items-center justify-between gap-x-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  className={`h-2 w-1/4 rounded-md transition-colors duration-100 ${
                    index < passwordStrength ? "bg-primary" : "bg-foreground/10"
                  }`}
                  // biome-ignore lint/suspicious/noArrayIndexKey: Intentional
                  key={index}
                />
              ))}
            </div>
          </>
        )}

        {errors.storePassword ? (
          <div className="font-semibold text-destructive text-xs">
            {errors.storePassword.message}
          </div>
        ) : null}
      </div>

      {/* Submit */}
      <Button
        className="mt-1 h-11 rounded-xl bg-primary font-semibold text-primary-foreground shadow-[0_0_35px_rgba(0,0,0,0.25)] transition-all hover:bg-primary/90 hover:shadow-[0_0_45px_rgba(0,0,0,0.35)]"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin" />
        ) : (
          <span>{"ساخت حساب"}</span>
        )}
      </Button>
    </form>
  );
}
