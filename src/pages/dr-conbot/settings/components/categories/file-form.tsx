import { useId } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { DialogFooter } from "@/components/ui/dialog";
import {
  attachFileSchema,
  type AttachFileForm,
} from "../../validations/categories.schema";

export const KIND_OPTIONS = [
  { value: "MANUAL", label: "Manual" },
  { value: "FAQ", label: "FAQ" },
  { value: "IMAGE", label: "Image" },
  { value: "VIDEO", label: "Video" },
  { value: "OTHER", label: "Other" },
];

interface FileFormProps {
  onSubmit: (data: AttachFileForm) => void;
  onCancel: () => void;
  isSaving?: boolean;
  submitLabel?: string;
}

export function FileForm({
  onSubmit,
  onCancel,
  isSaving = false,
  submitLabel = "Update",
}: FileFormProps) {
  const id = useId();
  const form = useForm<AttachFileForm>({
    resolver: zodResolver(attachFileSchema),
    defaultValues: {
      description: "",
      kind: "MANUAL",
    },
  });

  return (
    <>
      <form id={id} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Upload File */}
          <Field>
            <Label htmlFor="picture">File Upload*</Label>
            <Input
              id="picture"
              type="file"
              className="cursor-pointer"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  form.setValue("document", files);
                }
              }}
            />
            <FieldError errors={[form.formState.errors.document]} />
          </Field>

          {/* File type / Kind */}
          <Field>
            <Label>File type</Label>
            <Controller
              name="kind"
              control={form.control}
              render={({ field }) => (
                <>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="cursor-pointer bg-transparent">
                      <SelectValue placeholder="Select type">
                        {(value) =>
                          KIND_OPTIONS.find((opt) => opt.value === value)
                            ?.label ?? value
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {KIND_OPTIONS.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="cursor-pointer"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError errors={[form.formState.errors.kind]} />
                </>
              )}
            />
          </Field>

          {/* Description */}
          <Field>
            <Label>Description*</Label>
            <Textarea
              placeholder="Enter file description..."
              {...form.register("description")}
              className="bg-transparent min-h-[120px]"
            />
            <FieldError errors={[form.formState.errors.description]} />
          </Field>
        </FieldGroup>
      </form>

      <DialogFooter>
        <Button
          type="button"
          variant="ghost"
          className="cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          form={id}
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
