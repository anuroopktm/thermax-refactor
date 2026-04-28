import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  masterActivitySchema,
  type MasterActivityForm,
} from "@/validations/master-activity";
import { useId } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const ACTIVITY_TYPES = [
  { value: "Transmitter", label: "Transmitter" },
  { value: "Gauge", label: "Gauge" },
];

const MASTER_TEMPLATES = [
  { value: "template1", label: "Template 1" },
  { value: "template2", label: "Template 2" },
];

interface MasterActivityFormProps {
  onSubmit: (data: MasterActivityForm) => Promise<void>;
  onCancel: () => void;
  isSaving?: boolean;
}

export function MasterActivityForm({
  onSubmit,
  onCancel,
  isSaving = false,
}: MasterActivityFormProps) {
  const formId = useId();
  const form = useForm<MasterActivityForm>({
    resolver: zodResolver(masterActivitySchema),
    defaultValues: {
      title: "",
      type: "Transmitter",
      masterType: "",
    },
  });

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
            <Controller
              name="type"
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
            <FieldError errors={[form.formState.errors.type]} />
          </Field>

          {/* Master Type */}
          <Field>
            <Label>Master Type*</Label>
            <Controller
              name="masterType"
              control={form.control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select Master Template" />
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
            <FieldError errors={[form.formState.errors.masterType]} />
          </Field>

          {/* File Upload */}
          <Field>
            <FieldLabel htmlFor="picture">File Upload*</FieldLabel>
            <Input id="picture" type="file" {...form.register("file")} />
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
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </DialogFooter>
    </>
  );
}
