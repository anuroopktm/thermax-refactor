import { useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { DialogFooter } from "@/components/ui/dialog";
import {
  categorySchema,
  type CategoryForm as CategoryFormType,
} from "../../validations/categories.schema";

interface CategoryFormProps {
  defaultValues?: Partial<CategoryFormType>;
  onSubmit: (data: CategoryFormType) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  isSaving?: boolean;
}

export function CategoryForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  isSaving = false,
}: CategoryFormProps) {
  const id = useId();
  const form = useForm<CategoryFormType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: defaultValues?.title || "",
      short_title: defaultValues?.short_title || "",
      description: defaultValues?.description || "",
    },
  });

  return (
    <>
      <form id={id} onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          {/* Title */}
          <Field>
            <Label>Full name*</Label>
            <Input placeholder="Full name" {...form.register("title")} />
            <FieldError errors={[form.formState.errors.title]} />
          </Field>

          {/* Short Title */}
          <Field>
            <Label>Aliases and abbrevaiations</Label>
            <Input
              placeholder="Enter aliases and abbreviations"
              {...form.register("short_title")}
            />
            <FieldError errors={[form.formState.errors.short_title]} />
          </Field>

          {/* Description */}
          <Field>
            <Label>Description*</Label>
            <Textarea
              placeholder="Description"
              {...form.register("description")}
              className="min-h-[120px]"
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
