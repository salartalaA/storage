import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ActionButtons() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Button
        className="h-9 rounded-xl border border-success/15 bg-success/6 font-medium text-success text-xs shadow-none hover:bg-success/10 hover:text-success"
        type="button"
        variant="ghost"
      >
        <Plus className="size-3.5" />
        {"افزایش"}
      </Button>

      <Button
        className="h-9 rounded-xl border border-primary/15 bg-primary/6 font-medium text-primary text-xs shadow-none hover:bg-primary/10 hover:text-primary"
        type="button"
        variant="ghost"
      >
        <Minus className="size-3.5" />
        {"کاهش"}
      </Button>

      <Button
        className="h-9 rounded-xl border border-destructive/15 bg-destructive/6 font-medium text-destructive text-xs shadow-none hover:bg-destructive/10 hover:text-destructive"
        type="button"
        variant="ghost"
      >
        <Trash2 className="size-3.5" />
        {"دورریز"}
      </Button>
    </div>
  );
}
