"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type LoginData, loginSchema } from "@/schema/auth";

export default function LoginPageForm() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onsubmit = async (data: LoginData) => {
    await new Promise((resolver) => setTimeout(resolver, 500));
    console.log(data);
    toast.success("خوش آمدید!");
  };

  return (
    <form
      className="mt-6 flex flex-col gap-4"
      onSubmit={handleSubmit(onsubmit)}
    >
      <div className="flex flex-col gap-3">
        <Label className="font-semibold" htmlFor="email">
          {"ایمیل"}
        </Label>
        <Input
          autoComplete="off"
          className="py-5"
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

      <div className="flex flex-col gap-3">
        <Label className="font-semibold" htmlFor="password">
          {"رمز عبور"}
        </Label>
        <div className="relative">
          <Input
            autoComplete="off"
            className="py-5"
            id="password"
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />

          <Button
            className={"absolute top-[5px] left-1 bg-input!"}
            onClick={handleShowPassword}
            type="button"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </Button>
        </div>
        {errors.password ? (
          <div className="font-semibold text-destructive text-xs">
            {errors.password.message}
          </div>
        ) : null}
      </div>

      <Button className={"mt-2 py-5"} disabled={isSubmitting} type="submit">
        {isSubmitting ? (
          <Loader2 className="animate-spin" />
        ) : (
          <span>{"ورود"}</span>
        )}
      </Button>
    </form>
  );
}
