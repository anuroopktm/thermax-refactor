import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  masterActivityItemSchema,
  type MasterActivityModelFormValues,
} from "@/pages/transmitter-ocr/validations/master-activity-item.schema";
import { type DynamicField } from "@/services/query/transmitter-ocr/types";
import { useMemo, useEffect } from "react";
import { DynamicFormFields } from "@/components/shared/ocr/dynamic-form-fields";
import { deriveDefaultValues, applyConfidenceErrors } from "@/lib/ocr-logic";

interface MasterActivityModelFormProps {
  fields?: DynamicField[];
}

export function MasterActivityModelForm({
  fields = [],
}: MasterActivityModelFormProps) {
  const defaultValues = useMemo(() => deriveDefaultValues(fields), [fields]);

  const form = useForm<MasterActivityModelFormValues>({
    resolver: zodResolver(masterActivityItemSchema),
    defaultValues: defaultValues as MasterActivityModelFormValues,
  });

  useEffect(() => {
    form.reset(defaultValues as MasterActivityModelFormValues);
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
