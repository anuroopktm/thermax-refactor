import { type UseFormReturn } from "react-hook-form";
import { useEffect } from "react";
import { DynamicFormFields } from "@/components/shared/ocr/dynamic-form-fields";
import { applyConfidenceErrors } from "@/lib/ocr-logic";
import { type ActivityItemFormValues } from "../../validations/activity-item.schema";
import { type DynamicField } from "@/services/query/transmitter-ocr/types";

interface Props {
  fields: DynamicField[];
  form: UseFormReturn<ActivityItemFormValues>;
}

export function ActivityItemForm({ fields, form }: Props) {
  // Apply confidence errors when fields change
  useEffect(() => {
    if (fields.length > 0) {
      applyConfidenceErrors(form as any, fields);
    }
  }, [fields, form]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <DynamicFormFields form={form as any} fields={fields} />
    </form>
  );
}
