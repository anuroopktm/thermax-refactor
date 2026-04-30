import { z } from "zod";

export const activityItemSchema = z.record(
  z.string(),
  z.string().min(1, "This field is required"),
);

export type ActivityItemFormValues = z.infer<typeof activityItemSchema>;
