import { z } from "zod";

export const memberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.string().min(1, "Role is required"),
});

export type MemberForm = z.infer<typeof memberSchema>;
