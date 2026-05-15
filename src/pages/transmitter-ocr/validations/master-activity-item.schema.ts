import { z } from "zod";

export const masterActivityItemSchema = z.record(
  z.string(),
  z.string().min(1, "This field is required"),
);

export type MasterActivityModelFormValues = z.infer<
  typeof masterActivityItemSchema
>;
