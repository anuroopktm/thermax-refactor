import { type DynamicField } from "@/services/query/transmitter-ocr/types";
import type { UseFormReturn, FieldValues } from "react-hook-form";

export const CONFIDENCE_THRESHOLD = 0.7;

/**
 * Derives default values for the dynamic form from the provided fields.
 */
export function deriveDefaultValues(fields: DynamicField[] = []) {
  return fields.reduce(
    (acc, field) => {
      acc[field.name] = field.value ?? "";
      return acc;
    },
    {} as Record<string, string>,
  );
}

/**
 * Validates confidence scores and sets manual errors on the form if below threshold.
 */
export function applyConfidenceErrors(
  form: UseFormReturn<FieldValues>,
  fields: DynamicField[] = [],
) {
  fields.forEach((field) => {
    if (
      field.confidence !== undefined &&
      field.confidence < CONFIDENCE_THRESHOLD
    ) {
      form.setError(field.name, {
        type: "manual",
        message: field.message || "Low confidence value",
      });
    }
  });
}

/**
 * Determines if a field should be highlighted based on confidence.
 */
export function isLowConfidence(field: DynamicField) {
  return (
    field.confidence !== undefined && field.confidence < CONFIDENCE_THRESHOLD
  );
}
