"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import zxcvbn from "zxcvbn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPageForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const passwordStrength = zxcvbn(password).score;

  const passwordStrengthLabels = [
    "خیلی ضعیف",
    "ضعیف",
    "خوب",
    "خیلی خوب",
    "عالی",
  ] as const;

  return (
    <form className="mt-6 flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <Label className="font-semibold" htmlFor="storeName">
          {"نام فروشگاه"}
        </Label>
        <Input
          autoComplete="off"
          className="py-5"
          id="storeName"
          placeholder="افق کوروش"
          type="text"
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label className="font-semibold" htmlFor="email">
          {"ایمیل فروشگاه"}
        </Label>
        <Input
          autoComplete="off"
          className="py-5"
          id="email"
          placeholder="store@gmail.com"
          type="email"
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label className="font-semibold" htmlFor="password">
          {"رمز عبور فروشگاه"}
        </Label>
        <div className="relative">
          <Input
            autoComplete="off"
            className="py-5"
            id="password"
            onChange={handleSetPassword}
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
      </div>

      <Button className={"mt-2 py-5"}>{"ساخت حساب"}</Button>
    </form>
  );
}
