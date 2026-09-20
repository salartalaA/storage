import { z } from "zod";

export const registerSchema = z.object({
  storeEmail: z
    .email("لطفا ایمیل فروشگاهتان را وارد کنید")
    .trim()
    .toLowerCase()
    .max(70, "تعداد کرکترهای مجاز: ۷۰ کرکتر"),
  storeName: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "لطفا نام فروشگاهتان را وارد کنید")
    .max(100, "تعداد کرکترهای مجاز: ۱۰۰ کرکتر"),
  storePassword: z.string().trim().min(8, "رمزعبور باید حداقل ۸ کرکتر باشد"),
});

export const loginSchema = z.object({
  email: z
    .email("لطفا ایمیل خود را وارد کنید")
    .trim()
    .toLowerCase()
    .max(50, "تعداد کرکترهای مجاز: ۵۰ کرکتر"),

  password: z.string().trim().min(8, "لطفا رمزعبور خود را وارد کنید"),
});

export type RegisterData = z.infer<typeof registerSchema>;

export type LoginData = z.infer<typeof loginSchema>;
