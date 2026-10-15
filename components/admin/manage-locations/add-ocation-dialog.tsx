"use client";

import { MapPin, Plus } from "lucide-react";
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

export function AddLocationDialog() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button className="flex items-center gap-1 rounded-2xl text-xs">
            <Plus size={14} />
            <span>افزودن مکان</span>
          </Button>
        }
      />

      <DialogContent className="w-[calc(100%-1.5rem)] max-w-[480px] gap-0 overflow-hidden rounded-2xl border-foreground/10 bg-background/95 p-0 text-popover-foreground shadow-[0_20px_80px_rgba(0,0,0,0.5)] sm:w-full">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/12 to-transparent" />

        <DialogHeader className="space-y-0 px-5 pt-5 pb-3 text-right">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/10">
              <Plus className="size-4 text-primary" />
            </div>

            <div className="min-w-0">
              <DialogTitle className="font-bold text-foreground text-sm">
                افزودن مکان
              </DialogTitle>

              <DialogDescription className="mt-0.5 text-muted-foreground text-xs">
                نام مکان جدید را وارد کنید.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-5 pb-5">
          <div className="flex flex-col gap-1.5">
            <Label
              className="font-medium text-muted-foreground text-xs"
              htmlFor="location-name"
            >
              نام مکان
            </Label>

            <div className="relative">
              <MapPin className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                className="glass h-10 rounded-lg border-foreground/8 pr-10 text-sm transition-colors placeholder:text-muted-foreground focus-visible:border-primary/40 focus-visible:ring-primary/20"
                id="location-name"
                placeholder="مثال: انبار اصلی"
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

            <Button className="h-9 flex-1 rounded-xl text-xs">افزودن</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
