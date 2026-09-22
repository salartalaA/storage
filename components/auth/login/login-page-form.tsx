"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginStore } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type LoginData, loginSchema } from "@/schema/auth";

export default function LoginPageForm() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onsubmit = async (data: LoginData) => {
    const result = await loginStore(data);

    if (
      !result.success &&
      (result.error === "INVALID_EMAIL" || result.error === "INVALID_PASSWORD")
    ) {
      return toast.error("اطلاعات وارد شده معتبر نیستند!");
    }

    toast.success("خوش آمدید!");
  };

  return (
    <form
      className="mt-6 flex flex-col gap-5"
      onSubmit={handleSubmit(onsubmit)}
    >
      {/* Email */}
      <div className="flex flex-col gap-2.5">
        <Label
          className="font-semibold text-foreground text-sm"
          htmlFor="email"
        >
          {"ایمیل"}
        </Label>

        <Input
          autoComplete="off"
          className="h-11 rounded-xl border border-foreground/10 bg-foreground/[0.035] px-4 text-foreground shadow-black/10 shadow-inner backdrop-blur-md transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:bg-foreground/6 focus:ring-2 focus:ring-primary/20"
          dir="ltr"
          id="email"
          placeholder="store@gmail.com"
          type="text"
          {...register("email")}
        />

        {errors.email ? (
          <div className="font-semibold text-destructive text-xs">
            {errors.email.message}
          </div>
        ) : null}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2.5">
        <Label
          className="font-semibold text-foreground text-sm"
          htmlFor="password"
        >
          {"رمز عبور"}
        </Label>

        <div className="relative">
          <Input
            autoComplete="off"
            className="h-11 rounded-xl border border-foreground/10 bg-foreground/[0.035] px-4 pr-12 text-foreground shadow-black/10 shadow-inner backdrop-blur-md transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:bg-foreground/6 focus:ring-2 focus:ring-primary/20"
            dir="ltr"
            id="password"
            {...register("password")}
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

        {errors.password ? (
          <div className="font-semibold text-destructive text-xs">
            {errors.password.message}
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
          <span>{"ورود"}</span>
        )}
      </Button>
    </form>
  );
}
