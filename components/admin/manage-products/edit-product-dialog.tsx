"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "cn";
import { Loader2, MapPin, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateStoreProduct } from "@/actions/product";
import type { StockItem } from "@/components/admin/manage-products/stock-item-card";
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
import { getPriorityInventory } from "@/lib/inventory";
import {
  type ProductEditFormData,
  type ProductUnit,
  productCategories,
  productEditFormSchema,
  productUnits,
} from "@/schema/product";

const errorMessages = {
  BARCODE_ALREADY_EXISTS: "محصولی با این بارکد قبلا ثبت شده است",
  INVALID_DATA: "اطلاعات وارد شده معتبر نیست",
  INVALID_LOCATION: "مکان انتخاب شده معتبر نیست یا قبلا استفاده شده است",
  INVALID_SUPPLIER: "تامین‌کننده انتخاب شده معتبر نیست",
  NOT_FOUND: "محصول مورد نظر پیدا نشد",
  UNAUTHORIZED: "برای انجام این عملیات باید وارد حساب خود شوید",
} as const;

function getDefaultValues(item: StockItem): ProductEditFormData {
  const unit = productUnits.includes(item.unit as ProductUnit)
    ? (item.unit as ProductUnit)
    : ("" as ProductUnit);

  return {
    barcode: item.barcode,
    category: item.category,
    image: item.image ?? "",
    newInventories: [],
    supplierId: item.supplierId ?? "",
    title: item.title,
    unit,
  };
}

function getInventoryStates(item: StockItem) {
  return Object.fromEntries(
    item.inventories.map((inventory) => [inventory.id, inventory.isActive])
  ) as Record<string, boolean>;
}

export function EditProductDialog({
  item,
  locations,
  suppliers,
}: {
  item: StockItem;
  locations: { id: string; name: string }[];
  suppliers: { id: string; name: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [inventoryStates, setInventoryStates] = useState<
    Record<string, boolean>
  >(() => getInventoryStates(item));
  const [removedInventoryIds, setRemovedInventoryIds] = useState<string[]>([]);

  const {
    control,
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    watch,
  } = useForm<ProductEditFormData>({
    defaultValues: getDefaultValues(item),
    resolver: zodResolver(productEditFormSchema),
  });

  const {
    append: appendInventory,
    fields: newInventoryFields,
    remove: removeNewInventory,
  } = useFieldArray({
    control,
    name: "newInventories",
  });

  const watchedNewInventories = watch("newInventories") ?? [];
  const selectedUnit = watch("unit");

  useEffect(() => {
    if (open) {
      reset(getDefaultValues(item));
      setInventoryStates(getInventoryStates(item));
      setRemovedInventoryIds([]);
    }
  }, [open, item, reset]);

  const remainingInventories = item.inventories.filter(
    (inventory) => !removedInventoryIds.includes(inventory.id)
  );

  const draftInventories = remainingInventories.map((inventory) => ({
    ...inventory,
    isActive: inventoryStates[inventory.id] ?? inventory.isActive,
  }));

  const priorityInventoryId = getPriorityInventory(draftInventories)?.id;

  const remainingLocationIds = new Set(
    remainingInventories.map((inventory) => inventory.locationId)
  );

  const isLocationUsedByAnotherNewInventory = (
    index: number,
    locationId: string
  ) =>
    watchedNewInventories.some(
      (inventory, inventoryIndex) =>
        inventoryIndex !== index && inventory.locationId === locationId
    );

  const isLocationUnavailable = (index: number, locationId: string) =>
    remainingLocationIds.has(locationId) ||
    isLocationUsedByAnotherNewInventory(index, locationId);

  const availableLocationsCount = locations.filter(
    (location) => !remainingLocationIds.has(location.id)
  ).length;
  const allLocationsUsed =
    availableLocationsCount > 0 &&
    newInventoryFields.length >= availableLocationsCount;

  const toggleInventory = (inventoryId: string) => {
    setInventoryStates((currentStates) => {
      const fallbackState =
        item.inventories.find((inventory) => inventory.id === inventoryId)
          ?.isActive ?? false;

      return {
        ...currentStates,
        [inventoryId]: !(currentStates[inventoryId] ?? fallbackState),
      };
    });
  };

  const addInventory = () => {
    appendInventory({
      expirationDate: "",
      locationId: "",
      productionDate: "",
      quantity: "0",
      unitPrice: "0",
    });
  };

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

  const onsubmit = async (updatedProduct: ProductEditFormData) => {
    const { newInventories, ...productData } = updatedProduct;
    const result = await updateStoreProduct(item.id, productData, {
      inventoryStates: remainingInventories.map((inventory) => ({
        id: inventory.id,
        isActive: inventoryStates[inventory.id] ?? inventory.isActive,
      })),
      newInventories,
      removedInventoryIds,
    });

    if (!result.success) {
      toast.error(errorMessages[result.error]);
      return;
    }

    toast.success("محصول با موفقیت ویرایش شد");

    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger
        render={
          <Button
            aria-label="ویرایش محصول"
            className="size-7 rounded-lg border border-foreground/8 bg-foreground/3 text-muted-foreground hover:text-foreground"
            size="icon"
            variant="ghost"
          >
            <Pencil className="size-3.5" />
          </Button>
        }
      />

      <DialogContent className="max-h-[90dvh] w-[calc(100%-1.5rem)] max-w-[440px] gap-0 overflow-hidden rounded-2xl border-foreground/10 bg-background/95 p-0 text-popover-foreground shadow-[0_20px_80px_rgba(0,0,0,0.5)] sm:w-full">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/12 to-transparent" />

        <DialogHeader className="space-y-0 px-5 pt-5 pb-3 text-right">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10">
              <Pencil className="size-4 text-primary" />
            </div>

            <div className="min-w-0">
              <DialogTitle className="font-bold text-foreground text-sm">
                ویرایش محصول
              </DialogTitle>

              <DialogDescription className="mt-0.5 truncate text-muted-foreground text-xs">
                اطلاعات {item.title} را ویرایش کنید.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form className="px-5 pb-5" onSubmit={handleSubmit(onsubmit)}>
          <div className="flex max-h-[60dvh] flex-col gap-3.5 overflow-y-auto px-0.5">
            <div className="flex flex-col gap-1.5">
              <Label
                className="font-medium text-muted-foreground text-xs"
                htmlFor="edit-product-title"
              >
                نام محصول
              </Label>

              <Input
                className="h-10 rounded-xl border-foreground/8 text-sm"
                id="edit-product-title"
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
                  htmlFor="edit-product-barcode"
                >
                  بارکد
                </Label>

                <Input
                  className="h-10 rounded-xl border-foreground/8 text-left font-mono text-sm"
                  dir="ltr"
                  id="edit-product-barcode"
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

                {errors.supplierId && (
                  <p className="font-semibold text-destructive text-xs">
                    {errors.supplierId.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-medium text-muted-foreground text-xs">
                    موجودی در مکان‌ها
                  </span>

                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    وضعیت هر مکان را تغییر دهید، موجودی را حذف کنید یا موجودی
                    جدید اضافه کنید.
                  </p>
                </div>

                <span className="shrink-0 rounded-lg border border-foreground/7 bg-card/4.5 px-2 py-0.5 text-[10px] text-muted-foreground">
                  {(
                    remainingInventories.length + newInventoryFields.length
                  ).toLocaleString("fa-IR")}{" "}
                  مکان
                </span>
              </div>

              {remainingInventories.length === 0 &&
                newInventoryFields.length === 0 && (
                  <div className="rounded-xl border border-foreground/8 border-dashed bg-foreground/2.5 px-3 py-4 text-center text-[10px] text-muted-foreground">
                    هنوز موجودی برای این محصول در مکانی ثبت نشده است.
                  </div>
                )}

              {remainingInventories.map((inventory) => {
                const isActive =
                  inventoryStates[inventory.id] ?? inventory.isActive;
                const isPriority = inventory.id === priorityInventoryId;

                return (
                  <div
                    className={cn(
                      "rounded-xl border p-2.5 transition-colors",
                      isActive
                        ? "border-success/15 bg-success/4"
                        : "border-foreground/8 bg-foreground/2.5"
                    )}
                    key={inventory.id}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex min-w-0 items-center gap-1.5">
                        <MapPin
                          className={cn(
                            "size-3.5 shrink-0",
                            isActive ? "text-success" : "text-muted-foreground"
                          )}
                        />

                        <span className="truncate font-medium text-xs">
                          {inventory.location}
                        </span>

                        {isPriority && (
                          <span className="inline-flex shrink-0 items-center gap-0.5 rounded-md border border-warning/20 bg-warning/8 px-1.5 py-0.5 font-medium text-[9px] text-warning">
                            <Star className="size-2.5 fill-current" />
                            اولویت
                          </span>
                        )}
                      </div>

                      <div className="flex shrink-0 items-center gap-1.5">
                        <span
                          className={cn(
                            "text-[10px]",
                            isActive ? "text-success" : "text-muted-foreground"
                          )}
                        >
                          {isActive ? "فعال" : "غیرفعال"}
                        </span>

                        <button
                          aria-checked={isActive}
                          aria-label={`تغییر وضعیت موجودی ${inventory.location}`}
                          className={cn(
                            "relative h-5 w-9 rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                            isActive
                              ? "border-success/30 bg-success/25"
                              : "border-foreground/12 bg-foreground/8"
                          )}
                          disabled={isSubmitting}
                          // biome-ignore lint/performance/noJsxPropsBind: No performance issue
                          onClick={() => toggleInventory(inventory.id)}
                          role="switch"
                          type="button"
                        >
                          <span
                            className={cn(
                              "absolute top-0.5 size-3.5 rounded-full shadow-sm transition-all",
                              isActive
                                ? "left-0.5 bg-success"
                                : "right-0.5 bg-muted-foreground"
                            )}
                          />
                        </button>

                        <Button
                          aria-label={`حذف موجودی ${inventory.location}`}
                          className="size-6 rounded-lg border border-destructive/15 bg-destructive/5 text-destructive hover:bg-destructive/10"
                          disabled={isSubmitting}
                          // biome-ignore lint/performance/noJsxPropsBind: No performance issue
                          onClick={() =>
                            setRemovedInventoryIds((currentIds) => [
                              ...currentIds,
                              inventory.id,
                            ])
                          }
                          size="icon"
                          type="button"
                          variant="ghost"
                        >
                          <Trash2 className="size-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-1.5 flex items-center justify-between gap-2 text-[10px] text-muted-foreground">
                      <span>
                        {inventory.quantity.toLocaleString("fa-IR")} {item.unit}
                      </span>

                      <span
                        className={cn(isPriority && "font-medium text-warning")}
                      >
                        انقضا: {inventory.expirationDate}
                      </span>
                    </div>
                  </div>
                );
              })}

              {newInventoryFields.map((field, index) => (
                <div
                  className="rounded-2xl border border-primary/15 bg-primary/3 p-2.5"
                  key={field.id}
                >
                  <div className="flex items-end gap-2">
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="text-[10px] text-muted-foreground">
                        مکان جدید
                      </span>

                      <Controller
                        control={control}
                        name={`newInventories.${index}.locationId`}
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
                                  disabled={isLocationUnavailable(
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

                      {errors.newInventories?.[index]?.locationId && (
                        <p className="font-semibold text-[10px] text-destructive">
                          {errors.newInventories[index]?.locationId?.message}
                        </p>
                      )}
                    </div>

                    <Button
                      aria-label="حذف موجودی جدید"
                      className="size-9 shrink-0 rounded-xl border border-destructive/15 bg-destructive/5 text-destructive hover:bg-destructive/10"
                      // biome-ignore lint/performance/noJsxPropsBind: No performance issue
                      onClick={() => removeNewInventory(index)}
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
                        {...register(`newInventories.${index}.quantity`)}
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
                        {...register(`newInventories.${index}.unitPrice`)}
                        autoComplete="off"
                      />

                      <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[10px] text-muted-foreground">
                        تومان
                      </span>
                    </div>
                  </div>

                  {errors.newInventories?.[index]?.quantity && (
                    <p className="mt-1 font-semibold text-[10px] text-destructive">
                      {errors.newInventories[index]?.quantity?.message}
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
                        {...register(`newInventories.${index}.productionDate`)}
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label className="text-[10px] text-muted-foreground">
                        تاریخ انقضا
                      </Label>

                      <Input
                        className="h-9 rounded-xl border-foreground/8 text-xs"
                        type="date"
                        {...register(`newInventories.${index}.expirationDate`)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                className="h-9 w-full rounded-xl border-foreground/10 border-dashed text-xs"
                disabled={
                  locations.length === 0 ||
                  allLocationsUsed ||
                  availableLocationsCount === 0
                }
                // biome-ignore lint/performance/noJsxPropsBind: No performance issue
                onClick={addInventory}
                type="button"
                variant="outline"
              >
                <Plus className="size-3.5" />
                افزودن موجودی در مکان جدید
              </Button>

              {locations.length === 0 && (
                <p className="text-[10px] text-muted-foreground">
                  برای افزودن موجودی ابتدا از صفحه لوکیشن‌ها یک مکان اضافه کنید.
                </p>
              )}

              {locations.length > 0 && availableLocationsCount === 0 && (
                <p className="text-[10px] text-muted-foreground">
                  برای همه مکان‌ها موجودی ثبت شده است.
                </p>
              )}

              {allLocationsUsed && availableLocationsCount > 0 && (
                <p className="text-[10px] text-muted-foreground">
                  برای همه مکان‌های باقی‌مانده موجودی ثبت شده است.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                className="font-medium text-muted-foreground text-xs"
                htmlFor="edit-product-image"
              >
                آدرس تصویر (اختیاری)
              </Label>

              <Input
                className="h-10 rounded-xl border-foreground/8 text-left text-sm"
                dir="ltr"
                id="edit-product-image"
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
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "ذخیره"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
