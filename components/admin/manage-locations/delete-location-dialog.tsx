"use client";

import { AlertTriangle, Trash2 } from "lucide-react";
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

export function DeleteLocationDialog() {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            className="h-9 flex-1 gap-2 rounded-xl border border-destructive/15 bg-destructive/5 font-medium text-destructive text-xs hover:bg-destructive/10 hover:text-destructive"
            variant="outline"
          >
            <Trash2 className="size-3.5" />
            حذف
          </Button>
        }
      />

      <DialogContent className="w-[calc(100%-1.5rem)] max-w-sm! gap-0 overflow-hidden rounded-3xl border-foreground/10 bg-background/95 p-0 text-popover-foreground shadow-[0_20px_80px_rgba(0,0,0,0.5)] sm:w-full">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-destructive/20 to-transparent" />

        <DialogHeader className="space-y-0 px-5 pt-5 pb-4 text-right">
          <div className="flex items-start gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-destructive/15 bg-destructive/8 text-destructive">
              <AlertTriangle className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <DialogTitle className="font-bold text-base text-foreground">
                حذف مکان
              </DialogTitle>

              <DialogDescription className="mt-1 text-muted-foreground text-xs">
                آیا از حذف این مکان اطمینان دارید؟
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-5 pb-5">
          <div className="rounded-xl border border-foreground/7 bg-card/4.5 p-4 backdrop-blur-[18px]">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-destructive/10 bg-destructive/5 text-destructive">
                <Trash2 className="size-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-foreground text-sm">
                  نام مکان
                </p>
                <p className="mt-1 text-muted-foreground text-xs">
                  این مکان برای حذف انتخاب شده است.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-3 px-1 text-muted-foreground text-xs leading-6">
            با حذف این مکان، این عملیات قابل بازگشت نخواهد بود.
          </p>

          <div className="mt-5 flex gap-2">
            <DialogClose
              render={
                <Button
                  className="h-9 flex-1 rounded-xl border-foreground/10 bg-card/4.5 text-xs hover:bg-card/8"
                  type="button"
                  variant="outline"
                >
                  انصراف
                </Button>
              }
            />

            <Button
              className="h-9 flex-1 gap-2 rounded-xl text-xs"
              variant="destructive"
            >
              <Trash2 className="size-3.5" />
              حذف مکان
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
