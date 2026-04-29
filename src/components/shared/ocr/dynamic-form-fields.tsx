import type { UseFormReturn, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { type DynamicField } from "@/services/query/transmitter-ocr/transmitter-ocr.types";
import { cn } from "@/lib/utils";
import { isLowConfidence } from "@/lib/ocr-logic";

interface DynamicFormFieldsProps {
  form: UseFormReturn<FieldValues>;
  fields: DynamicField[];
}

export function DynamicFormFields({ form, fields }: DynamicFormFieldsProps) {
  return (
    <FieldGroup>
      {fields.map((field) => {
        const error = form.formState.errors[field.name];
        const lowConfidence = isLowConfidence(field);

        return (
          <Field key={field.name}>
            <FieldLabel>{field.label}</FieldLabel>

            <Input
              {...form.register(field.name)}
              className={cn("h-10", lowConfidence && "ring-2 ring-amber-500")}
            />

            {/* Non-error info only */}
            {!error && field.message && (
              <FieldDescription className="text-blue-500">
                {field.message}
              </FieldDescription>
            )}

            {/* Single source of error */}
            <FieldError className="text-amber-500" errors={[error]} />
          </Field>
        );
      })}
    </FieldGroup>
  );
}
