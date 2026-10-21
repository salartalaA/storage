"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PackagePlus, Plus, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { addStoreProduct } from "@/actions/product";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type ProductData,
  type ProductUnit,
  productCategories,
  productSchema,
  productUnits,
} from "@/schema/product";

const errorMessages = {
  BARCODE_ALREADY_EXISTS: "محصولی با این بارکد قبلا ثبت شده است",
  INVALID_DATA: "اطلاعات وارد شده معتبر نیست",
  INVALID_LOCATION: "مکان انتخاب شده معتبر نیست",
  INVALID_SUPPLIER: "تامین‌کننده انتخاب شده معتبر نیست",
  UNAUTHORIZED: "برای انجام این عملیات باید وارد حساب خود شوید",
} as const;

const defaultValues: ProductData = {
  barcode: "",
  category: "",
  image: "",
  inventories: [],
  reason: "",
  supplierId: "",
  title: "",
  unit: "" as ProductUnit,
};

export function AddProductDialog({
  locations,
  suppliers,
}: {
  locations: { id: string; name: string }[];
  suppliers: { id: string; name: string }[];
}) {
  const [open, setOpen] = useState(false);

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    watch,
  } = useForm<ProductData>({
    defaultValues,
    resolver: zodResolver(productSchema),
  });

  const { append, fields, remove } = useFieldArray({
    control,
    name: "inventories",
  });

  const selectedUnit = watch("unit");
  const watchedInventories = watch("inventories") ?? [];

  const categoryItems = productCategories.map((category) => ({
    label: category,
    value: category,
  }));

  const unitItems = productUnits.map((unit) => ({
    label: unit,
    value: unit,
  }));

  const supplierItems = suppliers.map((supplier) => ({
    label: supplier.name,
    value: supplier.id,
  }));

  const locationItems = locations.map((location) => ({
    label: location.name,
    value: location.id,
  }));

  const isLocationUsedByAnother = (index: number, locationId: string) =>
    watchedInventories.some(
      (inventory, inventoryIndex) =>
        inventoryIndex !== index && inventory.locationId === locationId
    );

  const addInventory = () => {
    append({
      expirationDate: "",
      locationId: "",
      productionDate: "",
      quantity: "0",
      unitPrice: "0",
    });
  };

  const onsubmit = async (newProduct: ProductData) => {
    const result = await addStoreProduct(newProduct);

    if (!result.success) {
      toast.error(errorMessages[result.error]);
      return;
    }

    toast.success("محصول با موفقیت افزوده شد");

    setOpen(false);
    reset();
  };

  const allLocationsUsed =
    locations.length > 0 && fields.length >= locations.length;

  const handleOpenChange = useCallback(
    (value: boolean) => {
      setOpen(value);

      if (!value) {
        reset();
      }
    },
    [reset]
  );

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger
        render={
          <Button className="flex items-center gap-1 rounded-2xl text-xs">
            <PackagePlus size={14} />
            <span>افزودن محصول</span>
          </Button>
        }
      />

      <DialogContent className="max-h-[90dvh] w-[calc(100%-1.5rem)] max-w-[480px] gap-0 overflow-hidden rounded-2xl border-foreground/10 bg-background/95 p-0 text-popover-foreground shadow-[0_20px_80px_rgba(0,0,0,0.5)] sm:w-full">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/12 to-transparent" />

        <DialogHeader className="space-y-0 px-5 pt-5 pb-3 text-right">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10">
              <PackagePlus className="size-4 text-primary" />
            </div>

            <div className="min-w-0">
              <DialogTitle className="font-bold text-foreground text-sm">
                افزودن محصول
              </DialogTitle>

              <DialogDescription className="mt-0.5 text-muted-foreground text-xs">
                اطلاعات محصول جدید را وارد کنید.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form className="px-5 pb-5" onSubmit={handleSubmit(onsubmit)}>
          <div className="flex max-h-[58dvh] flex-col gap-3.5 overflow-y-auto px-0.5">
            <div className="flex flex-col gap-1.5">
              <Label
                className="font-medium text-muted-foreground text-xs"
                htmlFor="product-title"
              >
                نام محصول
              </Label>

              <Input
                className="h-10 rounded-xl border-foreground/8 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-primary/40 focus-visible:ring-primary/20"
                id="product-title"
                placeholder="مثال: برنج طارم گلستان"
                {...register("title")}
                autoComplete="off"
              />

              {errors.title && (
                <p className="font-semibold text-destructive text-xs">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label
                  className="font-medium text-muted-foreground text-xs"
                  htmlFor="product-barcode"
                >
                  بارکد
                </Label>

                <Input
                  className="h-10 rounded-xl border-foreground/8 text-left font-mono text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-primary/40 focus-visible:ring-primary/20"
                  dir="ltr"
                  id="product-barcode"
                  placeholder="6266789012346"
                  {...register("barcode")}
                  autoComplete="off"
                />

                {errors.barcode && (
                  <p className="font-semibold text-destructive text-xs">
                    {errors.barcode.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-medium text-muted-foreground text-xs">
                  دسته‌بندی
                </span>

                <Controller
                  control={control}
                  name="category"
                  // biome-ignore lint/performance/noJsxPropsBind: No performance issue
                  render={({ field }) => (
                    <Select
                      items={categoryItems}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="h-10 w-full rounded-xl border-foreground/8 bg-card/4.5 text-xs">
                        <SelectValue placeholder="انتخاب دسته‌بندی" />
                      </SelectTrigger>

                      <SelectContent>
                        {categoryItems.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                {errors.category && (
                  <p className="font-semibold text-destructive text-xs">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <span className="font-medium text-muted-foreground text-xs">
                  واحد
                </span>

                <Controller
                  control={control}
                  name="unit"
                  // biome-ignore lint/performance/noJsxPropsBind: No performance issue
                  render={({ field }) => (
                    <Select
                      items={unitItems}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="h-10 w-full rounded-xl border-foreground/8 bg-card/4.5 text-xs">
                        <SelectValue placeholder="انتخاب واحد" />
                      </SelectTrigger>

                      <SelectContent>
                        {unitItems.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                {errors.unit && (
                  <p className="font-semibold text-destructive text-xs">
                    {errors.unit.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-medium text-muted-foreground text-xs">
                  تامین‌کننده
                </span>

                <Controller
                  control={control}
                  name="supplierId"
                  // biome-ignore lint/performance/noJsxPropsBind: No performance issue
                  render={({ field }) => (
                    <Select
                      items={supplierItems}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="h-10 w-full rounded-xl border-foreground/8 bg-card/4.5 text-xs">
                        <SelectValue placeholder="انتخاب تامین‌کننده" />
                      </SelectTrigger>

                      <SelectContent>
                        {supplierItems.map((supplier) => (
                          <SelectItem
                            key={supplier.value}
                            value={supplier.value}
                          >
                            {supplier.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />

                {suppliers.length === 0 && (
                  <p className="font-semibold text-warning text-xs">
                    ابتدا از صفحه تامین‌کننده‌ها یک تامین‌کننده اضافه کنید.
                  </p>
                )}

                {errors.supplierId && (
                  <p className="font-semibold text-destructive text-xs">
                    {errors.supplierId.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-muted-foreground text-xs">
                  موجودی در مکان‌ها
                </span>

                {fields.length > 0 && (
                  <span className="rounded-lg border border-foreground/7 bg-card/4.5 px-2 py-0.5 text-[10px] text-muted-foreground">
                    {fields.length.toLocaleString("fa-IR")} موجودی
                  </span>
                )}
              </div>

              {fields.map((field, index) => (
                <div
                  className="rounded-2xl border border-foreground/8 bg-card/4.5 p-2.5"
                  key={field.id}
                >
                  <div className="flex items-end gap-2">
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="text-[10px] text-muted-foreground">
                        مکان
                      </span>

                      <Controller
                        control={control}
                        name={`inventories.${index}.locationId`}
                        // biome-ignore lint/performance/noJsxPropsBind: No performance issue
                        render={({ field: locationField }) => (
                          <Select
                            items={locationItems}
                            onValueChange={locationField.onChange}
                            value={locationField.value}
                          >
                            <SelectTrigger className="h-9 w-full rounded-xl border-foreground/8 bg-background/60 text-xs">
                              <SelectValue placeholder="انتخاب مکان" />
                            </SelectTrigger>

                            <SelectContent>
                              {locations.map((location) => (
                                <SelectItem
                                  disabled={isLocationUsedByAnother(
                                    index,
                                    location.id
                                  )}
                                  key={location.id}
                                  value={location.id}
                                >
                                  {location.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />

                      {errors.inventories?.[index]?.locationId && (
                        <p className="font-semibold text-[10px] text-destructive">
                          {errors.inventories[index]?.locationId?.message}
                        </p>
                      )}
                    </div>

                    <Button
                      aria-label="حذف موجودی"
                      className="size-9 shrink-0 rounded-xl border border-destructive/15 bg-destructive/5 text-destructive hover:bg-destructive/10"
                      // biome-ignore lint/performance/noJsxPropsBind: No performance issue
                      onClick={() => remove(index)}
                      size="icon"
                      type="button"
                      variant="ghost"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="relative">
                      <Input
                        aria-label="مقدار موجودی"
                        className="h-9 rounded-xl border-foreground/8 pl-12 text-sm"
                        inputMode="numeric"
                        min="0"
                        type="number"
                        {...register(`inventories.${index}.quantity`)}
                        autoComplete="off"
                      />

                      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[10px] text-muted-foreground">
                        {selectedUnit || "واحد"}
                      </span>
                    </div>

                    <div className="relative">
                      <Input
                        aria-label="قیمت واحد"
                        className="h-9 rounded-xl border-foreground/8 pl-12 text-sm"
                        inputMode="numeric"
                        min="0"
                        type="number"
                        {...register(`inventories.${index}.unitPrice`)}
                        autoComplete="off"
                      />

                      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[10px] text-muted-foreground">
                        تومان
                      </span>
                    </div>
                  </div>

                  {errors.inventories?.[index]?.quantity && (
                    <p className="mt-1 font-semibold text-[10px] text-destructive">
                      {errors.inventories[index]?.quantity?.message}
                    </p>
                  )}

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                      <Label className="text-[10px] text-muted-foreground">
                        تاریخ تولید
                      </Label>

                      <Input
                        className="h-9 rounded-xl border-foreground/8 text-xs"
                        type="date"
                        {...register(`inventories.${index}.productionDate`)}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label className="text-[10px] text-muted-foreground">
                        تاریخ انقضا
                      </Label>

                      <Input
                        className="h-9 rounded-xl border-foreground/8 text-xs"
                        type="date"
                        {...register(`inventories.${index}.expirationDate`)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                className="h-9 w-full rounded-xl border-foreground/10 border-dashed text-xs"
                disabled={locations.length === 0 || allLocationsUsed}
                // biome-ignore lint/performance/noJsxPropsBind: No performance issue
                onClick={addInventory}
                type="button"
                variant="outline"
              >
                <Plus className="size-3.5" />
                افزودن موجودی
              </Button>

              {locations.length === 0 && (
                <p className="text-[10px] text-muted-foreground">
                  برای افزودن محصول ابتدا از صفحه لوکیشن‌ها یک مکان اضافه کنید.
                </p>
              )}

              {allLocationsUsed && (
                <p className="text-[10px] text-muted-foreground">
                  برای همه مکان‌ها موجودی ثبت شده است.
                </p>
              )}

              {!Array.isArray(errors.inventories) &&
                errors.inventories?.message && (
                  <p className="font-semibold text-destructive text-xs">
                    {errors.inventories.message}
                  </p>
                )}

              {fields.length === 0 && locations.length > 0 && (
                <p className="font-medium text-[10px] text-warning">
                  برای افزودن محصول، حداقل یک موجودی برای یکی از مکان‌ها ثبت
                  کنید.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                className="font-medium text-muted-foreground text-xs"
                htmlFor="product-reason"
              >
                دلیل ثبت محصول
              </Label>

              <Input
                className="h-10 rounded-xl border-foreground/8 text-sm"
                id="product-reason"
                placeholder="مثلاً خرید اولیه یا افزایش تنوع محصولات"
                {...register("reason")}
                autoComplete="off"
              />

              {errors.reason && (
                <p className="font-semibold text-destructive text-xs">
                  {errors.reason.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                className="font-medium text-muted-foreground text-xs"
                htmlFor="product-image"
              >
                آدرس تصویر (اختیاری)
              </Label>

              <Input
                className="h-10 rounded-xl border-foreground/8 text-left text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-primary/40 focus-visible:ring-primary/20"
                dir="ltr"
                id="product-image"
                placeholder="/golestan-rice.jpg"
                {...register("image")}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <DialogClose
              render={
                <Button
                  className="h-9 flex-1 rounded-xl border-foreground/10 text-xs"
                  type="button"
                  variant="outline"
                >
                  انصراف
                </Button>
              }
            />

            <Button
              className="h-9 flex-1 rounded-xl text-xs"
              disabled={
                isSubmitting || suppliers.length === 0 || fields.length === 0
              }
              type="submit"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "افزودن"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
