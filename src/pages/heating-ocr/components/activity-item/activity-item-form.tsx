import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  activityItemSchema,
  type ActivityItemFormValues,
} from "../../validations/activity-item.schema";
import { type DynamicField } from "@/services/query/transmitter-ocr/transmitter-ocr.types";
import { useMemo, useEffect } from "react";
import { DynamicFormFields } from "@/components/shared/ocr/dynamic-form-fields";
import { deriveDefaultValues, applyConfidenceErrors } from "@/lib/ocr-logic";

interface ActivityItemFormProps {
  fields?: DynamicField[];
}

export function ActivityItemForm({ fields = [] }: ActivityItemFormProps) {
  const defaultValues = useMemo(() => deriveDefaultValues(fields), [fields]);

  const form = useForm<ActivityItemFormValues>({
    resolver: zodResolver(activityItemSchema),
    values: defaultValues as ActivityItemFormValues,
  });

  // Apply confidence errors when fields change
  useEffect(() => {
    if (fields.length > 0) {
      applyConfidenceErrors(form, fields);
    }
  }, [fields, form]);

  return (
    <form>
      <DynamicFormFields form={form} fields={fields} />
    </form>
  );
}
