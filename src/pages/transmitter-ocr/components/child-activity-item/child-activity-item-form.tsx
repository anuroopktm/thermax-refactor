import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  childActivityItemSchema,
  type ChildActivityItemFormValues,
} from "@/validations/child-activity-item.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Info } from "lucide-react";

export function ChildActivityItemForm() {
  const form = useForm<ChildActivityItemFormValues>({
    resolver: zodResolver(childActivityItemSchema),
    defaultValues: {
      modelNumber: "BSPGV6",
      tagNumber: "12-PG-620sa",
      lowerCalibrationRange: "0",
    },
  });

  return (
    <form className="space-y-8">
      <FieldGroup className="space-y-8">
        {/* Model Number */}
        <Field className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Model Number
            </Label>
            <Info className="size-3.5 text-muted-foreground/50 cursor-pointer hover:text-muted-foreground transition-colors" />
          </div>
          <Input
            {...form.register("modelNumber")}
            className="h-12 text-base font-medium bg-muted/10 border-border focus-visible:ring-ring rounded-md px-4"
          />
          <div className="flex items-center gap-2 text-[11px] font-semibold text-amber-600">
            <div className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
            No value to compare in the master data
          </div>
          <FieldError errors={[form.formState.errors.modelNumber]} />
        </Field>

        {/* Tag Number */}
        <Field className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Tag Number
            </Label>
            <Info className="size-3.5 text-muted-foreground/50 cursor-pointer hover:text-muted-foreground transition-colors" />
          </div>
          <Input
            {...form.register("tagNumber")}
            className="h-12 text-base font-medium bg-muted/10 border-border focus-visible:ring-ring rounded-md px-4"
          />
          <div className="flex items-start gap-2 text-[11px] font-semibold text-amber-600">
            <div className="size-1.5 rounded-full bg-amber-500 mt-1 shrink-0 animate-pulse" />
            <p>Tag Number does not exist in master data</p>
          </div>
          <FieldError errors={[form.formState.errors.tagNumber]} />
        </Field>

        {/* Lower Calibration Range */}
        <Field className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Lower Calibration Range
            </Label>
            <Info className="size-3.5 text-muted-foreground/50 cursor-pointer hover:text-muted-foreground transition-colors" />
          </div>
          <Input
            {...form.register("lowerCalibrationRange")}
            className="h-12 text-base font-medium bg-muted/10 border-border focus-visible:ring-ring rounded-md px-4"
          />
          <div className="flex items-center gap-2 text-[11px] font-semibold text-amber-600">
            <div className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
            No value to compare in the master data
          </div>
          <FieldError errors={[form.formState.errors.lowerCalibrationRange]} />
        </Field>
      </FieldGroup>
    </form>
  );
}
