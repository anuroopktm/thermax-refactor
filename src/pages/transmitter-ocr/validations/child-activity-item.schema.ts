import { z } from "zod";

export const childActivityItemSchema = z.record(
  z.string(),
  z.string().min(1, "This field is required"),
);

export type ChildActivityItemFormValues = z.infer<
  typeof childActivityItemSchema
>;
