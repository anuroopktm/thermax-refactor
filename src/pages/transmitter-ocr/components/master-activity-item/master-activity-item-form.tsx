import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  masterActivityItemSchema,
  type MasterActivityItemFormValues,
} from "@/validations/master-activity-item.schema";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { type DynamicField } from "@/services/query/transmitter-ocr/transmitter-ocr.types";
import { useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MasterActivityItemFormProps {
  fields?: DynamicField[];
}

const DEFAULT_FIELDS: DynamicField[] = [
  {
    name: "modelNumber",
    label: "Model Number",
    value: "BSPGV6",
    confidence: 0.8,
    message: "No value to compare in the master data",
  },
  {
    name: "tagNumber",
    label: "Tag Number",
    value: "12-PG-620SA",
    confidence: 0.75,
    message: "Tag Number does not exist in master data",
  },
  {
    name: "serialNumber",
    label: "Serial Number",
    value: "SN-987654",
    confidence: 0.6,
    message: "Serial Number mismatch detected",
  },
];

export function MasterActivityItemForm({
  fields = DEFAULT_FIELDS,
}: MasterActivityItemFormProps) {
  // ✅ derive default values
  const defaultValues = useMemo(() => {
    return fields.reduce(
      (acc, field) => {
        acc[field.name] = field.value ?? "";
        return acc;
      },
      {} as Record<string, string>,
    );
  }, [fields]);

  const form = useForm<MasterActivityItemFormValues>({
    resolver: zodResolver(masterActivityItemSchema),
    defaultValues: defaultValues as MasterActivityItemFormValues,
  });

  // ✅ reset form when fields change
  useEffect(() => {
    form.reset(defaultValues as MasterActivityItemFormValues);
  }, [defaultValues, form]);

  // ✅ derive error from confidence + push to RHF
  useEffect(() => {
    fields.forEach((field) => {
      if (field.confidence !== undefined && field.confidence < 0.7) {
        form.setError(field.name as any, {
          type: "manual",
          message: field.message || "Low confidence value",
        });
      }
    });
  }, [fields, form]);

  return (
    <form>
      <FieldGroup>
        {fields.map((field) => {
          const error = form.formState.errors[field.name];

          return (
            <Field key={field.name}>
              <FieldLabel>{field.label}</FieldLabel>

              <Input
                {...form.register(field.name)}
                className={cn(
                  "h-10",
                  field.confidence < 0.7 && "ring-2 ring-amber-500",
                )}
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
    </form>
  );
}
