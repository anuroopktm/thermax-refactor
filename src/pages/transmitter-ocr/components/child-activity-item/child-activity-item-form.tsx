import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  childActivityItemSchema,
  type ChildActivityItemFormValues,
} from "@/pages/transmitter-ocr/validations/child-activity-item.schema";
import { type DynamicField } from "@/services/query/transmitter-ocr/transmitter-ocr.types";
import { useMemo, useEffect } from "react";
import { DynamicFormFields } from "@/components/shared/ocr/dynamic-form-fields";
import { deriveDefaultValues, applyConfidenceErrors } from "@/lib/ocr-logic";

interface ChildActivityItemFormProps {
  fields?: DynamicField[];
}

export function ChildActivityItemForm({
  fields = [],
}: ChildActivityItemFormProps) {
  const defaultValues = useMemo(() => deriveDefaultValues(fields), [fields]);

  const form = useForm<ChildActivityItemFormValues>({
    resolver: zodResolver(childActivityItemSchema),
    defaultValues: defaultValues as ChildActivityItemFormValues,
  });

  useEffect(() => {
    form.reset(defaultValues as ChildActivityItemFormValues);
  }, [defaultValues, form]);

  useEffect(() => {
    applyConfidenceErrors(form, fields);
  }, [fields, form]);

  return (
    <form>
      <DynamicFormFields form={form} fields={fields} />
    </form>
  );
}
