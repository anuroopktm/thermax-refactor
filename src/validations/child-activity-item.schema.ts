import { z } from "zod";

export const childActivityItemSchema = z.object({
  modelNumber: z.string().min(1, "Model Number is required"),
  tagNumber: z.string().min(1, "Tag Number is required"),
  lowerCalibrationRange: z
    .string()
    .min(1, "Lower Calibration Range is required"),
});

export type ChildActivityItemFormValues = z.infer<
  typeof childActivityItemSchema
>;
