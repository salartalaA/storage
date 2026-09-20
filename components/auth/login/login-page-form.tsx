"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPageForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form className="mt-6 flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <Label className="font-semibold" htmlFor="email">
          {"ایمیل"}
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
          {"رمز عبور"}
        </Label>
        <div className="relative">
          <Input
            autoComplete="off"
            className="py-5"
            id="password"
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
      </div>

      <Button className={"mt-2 py-5"}>{"ورود"}</Button>
    </form>
  );
}
