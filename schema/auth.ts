import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("لطفا ایمیل خود را وارد کنید")
    .trim()
    .toLowerCase()
    .max(50, "تعداد کارکترهای مجاز: ۵۰ کارکتر"),

  password: z.string().trim().min(1, "لطفا پسورد خود را وارد کنید"),
});

export type LoginData = z.infer<typeof loginSchema>;
