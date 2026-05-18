import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import {
  productSchema,
  type ProductForm as ProductFormType,
} from "@/pages/dr-conbot/settings/validations/products.schema";
import { DialogFooter } from "@/components/ui/dialog";

interface ProductFormProps {
  defaultValues?: Partial<ProductFormType>;
  onSubmit: (data: ProductFormType) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
  isSaving?: boolean;
}

export function ProductForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  isSaving = false,
}: ProductFormProps) {
  const form = useForm<ProductFormType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      short_title: defaultValues?.short_title || "",
      description: defaultValues?.description || "",
    },
  });

  return (
    <>
      <form
        id="settings-products-add-edit-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FieldGroup>
          <FieldGroup className="flex-row">
            {/* Title */}
            <Field>
              <Label>Title*</Label>
              <Input
                placeholder="Product title"
                {...form.register("title")}
                className="bg-transparent"
              />
              <FieldError errors={[form.formState.errors.title]} />
            </Field>

            {/* Short Title */}
            <Field>
              <Label>Short title*</Label>
              <Input
                placeholder="Product short title"
                {...form.register("short_title")}
                className="bg-transparent"
              />
              <FieldError errors={[form.formState.errors.short_title]} />
            </Field>
          </FieldGroup>

          {/* Description */}
          <Field>
            <Label>Description*</Label>
            <Textarea
              placeholder="Description"
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
          form="settings-products-add-edit-form"
          type="submit"
          className="cursor-pointer"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : submitLabel}
        </Button>
      </DialogFooter>
    </>
  );
}
