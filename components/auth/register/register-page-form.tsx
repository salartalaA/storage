"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import zxcvbn from "zxcvbn";
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
  } = useForm({ resolver: zodResolver(registerSchema) });

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
    await new Promise((resolver) => setTimeout(resolver, 500));
    console.log(data);
    toast.success("حساب ساخته شد!");

    router.push("/auth/login");
  };

  return (
    <form
      className="mt-6 flex flex-col gap-4"
      onSubmit={handleSubmit(onsubmit)}
    >
      <div className="flex flex-col gap-3">
        <Label className="font-semibold" htmlFor="storeName">
          {"نام فروشگاه"}
        </Label>
        <Input
          autoComplete="off"
          className="py-5"
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

      <div className="flex flex-col gap-3">
        <Label className="font-semibold" htmlFor="storeEmail">
          {"ایمیل فروشگاه"}
        </Label>
        <Input
          autoComplete="off"
          className="py-5"
          id="storeEmail"
          placeholder="store@gmail.com"
          {...register("storeEmail")}
          type="text"
        />
        {errors.storeEmail ? (
          <div className="font-semibold text-destructive text-xs">
            {errors.storeEmail.message}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        <Label className="font-semibold" htmlFor="storePassword">
          {"رمز عبور فروشگاه"}
        </Label>
        <div className="relative">
          <Input
            autoComplete="off"
            className="py-5"
            id="storePassword"
            {...register("storePassword")}
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
          />

          <Button
            className={"absolute top-[5px] left-1 bg-input!"}
            onClick={handleShowPassword}
            type="button"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
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
                  className={`w-1/4 rounded-md p-2 transition-colors duration-100 ${
                    index < passwordStrength ? "bg-primary" : "bg-background/20"
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

      <Button className={"mt-2 py-5"} disabled={isSubmitting} type="submit">
        {isSubmitting ? (
          <Loader2 className="animate-spin" />
        ) : (
          <span>{"ساخت حساب"}</span>
        )}
      </Button>
    </form>
  );
}
