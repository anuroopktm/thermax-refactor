import { z } from "zod";

export const feedbackSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  status: z.string().optional(),
  source: z.string().optional(),
});

export type FeedbackForm = z.infer<typeof feedbackSchema>;
