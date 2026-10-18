import { z } from "zod";

export const supplierSchema = z.object({
  address: z.string().trim().min(1, "لطفا آدرس تامین‌کننده را وارد کنید"),
  contactName: z.string().trim().min(1, "لطفا نام مسئول ارتباط را وارد کنید"),
  name: z.string().trim().min(1, "لطفا نام تامین‌کننده را وارد کنید"),
  phoneNumber: z.string().trim().min(1, "لطفا شماره تامین‌کننده را وارد کنید"),
});

export type SupplierData = z.infer<typeof supplierSchema>;
