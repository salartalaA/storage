"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MapPin, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateStoreLocation } from "@/actions/location";
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
import { type LocationData, locationSchema } from "@/schema/location";

interface ChangeLocationNameDialogProps {
  locationId: string;
  name: string;
}

export function ChangeLocationNameDialog({
  locationId,
  name,
}: ChangeLocationNameDialogProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<LocationData>({
    defaultValues: {
      name,
    },
    resolver: zodResolver(locationSchema),
  });

  const onsubmit = async (updatedLocation: LocationData) => {
    await updateStoreLocation(locationId, updatedLocation);

    setOpen(false);
    reset();
  };

  useEffect(() => {
    if (open) {
      reset({
        name,
      });
    }
  }, [open, name, reset]);

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger
        render={
          <Button
            className="h-9 flex-1 gap-2 rounded-xl border border-primary/15 bg-primary/5 font-medium text-primary text-xs hover:bg-primary/10 hover:text-primary"
            variant="outline"
          >
            <Pencil className="size-3.5" />
            ویرایش
          </Button>
        }
      />

      <DialogContent className="w-[calc(100%-1.5rem)] max-w-sm! gap-0 overflow-hidden rounded-3xl border-foreground/10 bg-background/95 p-0 text-popover-foreground shadow-[0_20px_80px_rgba(0,0,0,0.5)] sm:w-full">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/12 to-transparent" />

        <DialogHeader className="space-y-0 px-5 pt-5 pb-4 text-right">
          <div className="flex items-start gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-foreground/8 bg-primary/8 text-primary">
              <Pencil className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <DialogTitle className="font-bold text-base text-foreground">
                ویرایش مکان
              </DialogTitle>

              <DialogDescription className="mt-1 text-muted-foreground text-xs">
                نام مکان نگهداری محصولات را تغییر دهید.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form className="px-5 pb-5" onSubmit={handleSubmit(onsubmit)}>
          <div className="rounded-xl border border-foreground/7 bg-card/4.5 p-4 backdrop-blur-[18px]">
            <Label
              className="mb-2 block font-medium text-muted-foreground text-xs"
              htmlFor="location-name"
            >
              نام مکان
            </Label>

            <div className="relative">
              <MapPin className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                className="h-10 rounded-xl border-foreground/8 bg-background/30 pr-10 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-primary/30 focus-visible:ring-primary/15"
                id="location-name"
                placeholder="مثال: انبار اصلی"
                {...register("name")}
                autoComplete="off"
              />
            </div>

            {errors.name && (
              <p className="mt-2 font-semibold text-destructive text-xs">
                {errors.name.message}
              </p>
            )}

            <p className="mt-2 text-[11px] text-muted-foreground">
              یک نام مشخص برای شناسایی آسان‌تر این مکان وارد کنید.
            </p>
          </div>

          <div className="mt-5 flex gap-2">
            <DialogClose
              render={
                <Button
                  className="h-9 flex-1 rounded-xl border-foreground/10 bg-card/4.5 text-xs hover:bg-card/8"
                  // biome-ignore lint/performance/noJsxPropsBind: No performance issue
                  onClick={() => reset()}
                  type="button"
                  variant="outline"
                >
                  انصراف
                </Button>
              }
            />

            <Button
              className="h-9 flex-1 gap-2 rounded-xl text-xs"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Pencil className="size-3.5" />
                  ذخیره تغییرات
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
