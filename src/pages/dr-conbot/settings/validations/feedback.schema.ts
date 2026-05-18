import { z } from "zod";

export const feedbackSchema = z.object({
  document: z
    .any()
    .refine(
      (val) => val !== null && val !== undefined && val.length !== 0,
      "Document file is required",
    ),
  description: z.string().min(1, "Description is required"),
  kind: z.string().min(1, "Kind is required"),
});

export const editFeedbackSchema = z.object({
  description: z.string().min(1, "Description is required"),
  kind: z.string().min(1, "Kind is required"),
});

export type FeedbackForm = z.infer<typeof feedbackSchema>;
export type EditFeedbackForm = z.infer<typeof editFeedbackSchema>;
