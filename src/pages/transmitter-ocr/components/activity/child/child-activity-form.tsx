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
  childActivitySchema,
  type ChildActivityForm as ChildActivityFormType,
} from "../../../validations/child-activity.schema";
import { useId } from "react";

const MASTER_SHEETS = [
  { value: "sheet1", label: "Master Sheet 1" },
  { value: "sheet2", label: "Master Sheet 2" },
];

interface ChildActivityFormProps {
  onSubmit: (data: ChildActivityFormType) => Promise<void>;
  onCancel: () => void;
  isSaving?: boolean;
}

export function ChildActivityForm({
  onSubmit,
  onCancel,
  isSaving = false,
}: ChildActivityFormProps) {
  const formId = useId();

  const form = useForm<ChildActivityFormType>({
    resolver: zodResolver(childActivitySchema),
    defaultValues: {
      title: "",
      indexPagesToTrim: "",
      masterSheet: "",
    },
  });

  return (
    <>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FieldGroup>
          {/* Title */}
          <Field>
            <Label>Title*</Label>
            <Input placeholder="Enter title" {...form.register("title")} />
            <FieldError errors={[form.formState.errors.title]} />
          </Field>

          {/* Index Pages to Trim */}
          <Field>
            <Label>Index Pages to Trim</Label>
            <Input
              placeholder="Enter Page Numbers (e.g. 1-5)"
              {...form.register("indexPagesToTrim")}
            />
            <FieldError errors={[form.formState.errors.indexPagesToTrim]} />
          </Field>

          {/* Master Sheet */}
          <Field>
            <Label>Master Sheet</Label>
            <Controller
              name="masterSheet"
              control={form.control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="cursor-pointer">
                    <SelectValue placeholder="Select Master Sheet" />
                  </SelectTrigger>
                  <SelectContent>
                    {MASTER_SHEETS.map((sheet) => (
                      <SelectItem
                        key={sheet.value}
                        value={sheet.value}
                        className="cursor-pointer"
                      >
                        {sheet.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[form.formState.errors.masterSheet]} />
          </Field>

          {/* File Upload */}
          <Field>
            <FieldLabel htmlFor="picture">File Upload*</FieldLabel>
            <Input id="picture" type="file" {...form.register("file")} />
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
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </DialogFooter>
    </>
  );
}
