"use client";

import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteStoreSupplier } from "@/actions/supplier";
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

interface DeleteSupplierDialogProps {
  name: string;
  phoneNumber: string;
  supplierId: string;
}

export function DeleteSupplierDialog({
  name,
  phoneNumber,
  supplierId,
}: DeleteSupplierDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    await deleteStoreSupplier(supplierId);

    setIsDeleting(false);
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
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

      <DialogContent className="max-h-[90dvh] w-[calc(100%-1.5rem)] max-w-sm! gap-0 overflow-hidden rounded-3xl border-foreground/10 bg-background/95 p-0 text-popover-foreground shadow-[0_20px_80px_rgba(0,0,0,0.5)] sm:w-full">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-destructive/25 to-transparent" />

        <DialogHeader className="space-y-0 px-5 pt-5 pb-3 text-right">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-destructive/20 bg-destructive/10">
              <AlertTriangle className="size-4 text-destructive" />
            </div>

            <div className="min-w-0">
              <DialogTitle className="font-bold text-foreground text-sm">
                حذف تامین‌کننده
              </DialogTitle>

              <DialogDescription className="mt-0.5 text-muted-foreground text-xs">
                آیا از حذف این تامین‌کننده اطمینان دارید؟
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="px-5 pb-3">
          <div className="flex items-center gap-2.5 rounded-xl border border-destructive/15 bg-destructive/5 p-3">
            <Trash2 className="size-4 shrink-0 text-destructive" />

            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate font-semibold text-foreground text-sm">
                {name}
              </span>

              <span className="font-mono text-muted-foreground text-xs">
                {phoneNumber}
              </span>
            </div>
          </div>

          <p className="mt-2.5 text-muted-foreground text-xs leading-5">
            این عملیات قابل بازگشت نیست. تامین‌کننده و اطلاعات آن حذف خواهد شد.
          </p>
        </div>

        <div className="flex items-center gap-2 p-5 pt-1">
          <DialogClose
            render={
              <Button
                className="h-9 flex-1 rounded-xl border-foreground/10 px-4 text-xs sm:mt-0"
                type="button"
                variant="outline"
              >
                انصراف
              </Button>
            }
          />

          <Button
            className="h-9.5 flex-1 rounded-xl px-4 text-xs"
            disabled={isDeleting}
            // biome-ignore lint/performance/noJsxPropsBind: No performance issue
            onClick={handleDelete}
            type="button"
            variant="destructive"
          >
            {isDeleting ? (
              <Loader2 className="animate-spin" />
            ) : (
              "حذف تامین‌کننده"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
