import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  masterActivityItemSchema,
  type MasterActivityItemFormValues,
} from "@/pages/transmitter-ocr/validations/master-activity-item.schema";
import { type DynamicField } from "@/services/query/transmitter-ocr/transmitter-ocr.types";
import { useMemo, useEffect } from "react";
import { DynamicFormFields } from "@/components/shared/ocr/dynamic-form-fields";
import { deriveDefaultValues, applyConfidenceErrors } from "@/lib/ocr-logic";

interface MasterActivityItemFormProps {
  fields?: DynamicField[];
}

export function MasterActivityItemForm({
  fields = [],
}: MasterActivityItemFormProps) {
  const defaultValues = useMemo(() => deriveDefaultValues(fields), [fields]);

  const form = useForm<MasterActivityItemFormValues>({
    resolver: zodResolver(masterActivityItemSchema),
    defaultValues: defaultValues as MasterActivityItemFormValues,
  });

  useEffect(() => {
    form.reset(defaultValues as MasterActivityItemFormValues);
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
