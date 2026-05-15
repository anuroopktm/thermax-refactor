import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  childActivityItemSchema,
  type ChildActivityModelFormValues,
} from "@/pages/transmitter-ocr/validations/child-activity-item.schema";
import { type DynamicField } from "@/services/query/transmitter-ocr/types";
import { useMemo, useEffect } from "react";
import { DynamicFormFields } from "@/components/shared/ocr/dynamic-form-fields";
import { deriveDefaultValues, applyConfidenceErrors } from "@/lib/ocr-logic";

interface ChildActivityModelFormProps {
  fields?: DynamicField[];
}

export function ChildActivityModelForm({
  fields = [],
}: ChildActivityModelFormProps) {
  const defaultValues = useMemo(() => deriveDefaultValues(fields), [fields]);

  const form = useForm<ChildActivityModelFormValues>({
    resolver: zodResolver(childActivityItemSchema),
    defaultValues: defaultValues as ChildActivityModelFormValues,
  });

  useEffect(() => {
    form.reset(defaultValues as ChildActivityModelFormValues);
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
