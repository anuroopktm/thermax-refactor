import { Controller, type UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { type MasterActivityForm as MasterActivityFormType } from "../../../validations/master-activity.schema";
import { useId } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ACTIVITY_TYPES = [
  { value: "TRANSMITTER", label: "Transmitter" },
  { value: "GAUGE", label: "Gauge" },
];

const MASTER_TEMPLATES = [
  { value: "EMERSON", label: "Emerson" },
  { value: "HONEYWELL", label: "Honeywell" },
  { value: "YOKOGAWA", label: "Yokogawa" },
];

interface MasterActivityFormProps {
  form: UseFormReturn<MasterActivityFormType>;
  onSubmit: (data: MasterActivityFormType) => Promise<void> | void;
  onCancel: () => void;
  isSaving?: boolean;
  submitLabel?: string;
  isEdit?: boolean;
  currentFilename?: string;
}

export function MasterActivityForm({
  form,
  onSubmit,
  onCancel,
  isSaving = false,
  submitLabel = "Create Activity",
  isEdit = false,
  currentFilename,
}: MasterActivityFormProps) {
  const formId = useId();

  return (
    <>
      <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Title */}
          <Field>
            <Label>Title*</Label>
            <Input placeholder="Enter title" {...form.register("title")} />
            <FieldError errors={[form.formState.errors.title]} />
          </Field>

          {/* Type (Radio Group) */}
          <Field>
            <Label>Type*</Label>
            <Controller
              name="device_type"
              control={form.control}
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-row gap-6"
                >
                  {ACTIVITY_TYPES.map((type) => (
                    <div key={type.value} className="flex items-center gap-3">
                      <RadioGroupItem
                        value={type.value}
                        id={`${formId}-${type.value}`}
                        className="cursor-pointer"
                      />
                      <Label
                        htmlFor={`${formId}-${type.value}`}
                        className="cursor-pointer"
                      >
                        {type.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            <FieldError errors={[form.formState.errors.device_type]} />
          </Field>

          {/* Master Type */}
          <Field>
            <Label>Master Type*</Label>
            <Controller
              name="template"
              control={form.control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select Master Template">
                      {
                        MASTER_TEMPLATES.find(
                          (tpl) => tpl.value === field.value,
                        )?.label
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {MASTER_TEMPLATES.map((tpl) => (
                      <SelectItem
                        key={tpl.value}
                        value={tpl.value}
                        className="cursor-pointer"
                      >
                        {tpl.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[form.formState.errors.template]} />
          </Field>

          {/* File Upload */}
          <Field>
            <FieldLabel htmlFor="picture">
              File Upload{isEdit ? "" : "*"}
            </FieldLabel>
            <Input
              id="picture"
              type="file"
              className="cursor-pointer"
              {...form.register("file")}
            />
            {currentFilename && (
              <p className="mt-1 text-xs text-muted-foreground">
                Current file:{" "}
                <span className="font-medium">{currentFilename}</span>
              </p>
            )}
            <FieldError errors={[form.formState.errors.file]} />
          </Field>
        </FieldGroup>
      </form>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          form={formId}
          type="submit"
          className="cursor-pointer"
          disabled={isSaving}
        >
          {submitLabel}
        </Button>
      </DialogFooter>
    </>
  );
}
