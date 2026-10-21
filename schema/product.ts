import { z } from "zod";

export const productCategories = [
  "مواد غذایی",
  "لبنیات",
  "نوشیدنی",
  "تنقلات",
  "بهداشتی",
] as const;

export const productUnits = ["گرم", "کیلوگرم", "بسته", "عدد"] as const;

export const productInventorySchema = z.object({
  expirationDate: z.string().trim(),
  locationId: z.string().trim().min(1, "لطفا مکان موجودی را انتخاب کنید"),
  productionDate: z.string().trim(),
  quantity: z
    .string()
    .trim()
    .regex(/^\d+$/, "مقدار موجودی باید یک عدد صحیح باشد"),
  unitPrice: z
    .string()
    .trim()
    .regex(/^\d*$/, "قیمت واحد باید یک عدد صحیح باشد"),
});

export const productInventoryStateSchema = z.object({
  id: z.string().trim().min(1),
  isActive: z.boolean(),
});

export const productInventoryStatesSchema = z
  .array(productInventoryStateSchema)
  .refine(
    (states) => new Set(states.map((state) => state.id)).size === states.length,
    {
      error: "وضعیت هر موجودی فقط یک بار قابل ثبت است",
    }
  );

const productInventoriesSchema = z
  .array(productInventorySchema)
  .min(1, "برای محصول حداقل یک موجودی در یک مکان ثبت کنید")
  .refine(
    (inventories) =>
      new Set(inventories.map((inventory) => inventory.locationId)).size ===
      inventories.length,
    {
      error: "برای هر مکان فقط می‌توانید یک موجودی ثبت کنید",
    }
  );

export const productSchema = z.object({
  barcode: z.string().trim().min(1, "لطفا بارکد محصول را وارد کنید"),
  category: z.string().trim().min(1, "لطفا دسته‌بندی محصول را انتخاب کنید"),
  image: z.string().trim(),
  inventories: productInventoriesSchema,
  reason: z.string().trim().min(1, "دلیل ثبت محصول را وارد کنید"),
  supplierId: z.string().trim().min(1, "لطفا تامین‌کننده محصول را انتخاب کنید"),
  title: z.string().trim().min(1, "لطفا نام محصول را وارد کنید"),
  unit: z.enum(productUnits, {
    error: "لطفا واحد محصول را انتخاب کنید",
  }),
});

export const productDetailsSchema = productSchema.pick({
  barcode: true,
  category: true,
  image: true,
  supplierId: true,
  title: true,
  unit: true,
});

export const productInventoryChangesSchema = z.object({
  inventoryStates: productInventoryStatesSchema,
  newInventories: z.array(productInventorySchema),
  removedInventoryIds: z
    .array(z.string().trim().min(1))
    .refine(
      (ids) => new Set(ids).size === ids.length,
      "شناسه موجودی تکراری است"
    ),
});

export const productEditFormSchema = productDetailsSchema.extend({
  newInventories: z.array(productInventorySchema),
});

export type ProductUnit = (typeof productUnits)[number];

export type ProductData = z.infer<typeof productSchema>;

export type ProductInventoryData = z.infer<typeof productInventorySchema>;

export type ProductInventoryState = z.infer<typeof productInventoryStateSchema>;

export type ProductInventoryChanges = z.infer<
  typeof productInventoryChangesSchema
>;

export type ProductEditFormData = z.infer<typeof productEditFormSchema>;

export type ProductDetailsData = z.infer<typeof productDetailsSchema>;
