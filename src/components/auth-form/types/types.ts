import { z } from "zod";

export const authSchema = z.object({
  email: z.email("Enter a valid email").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Minimum 6 characters"),
});

export type AuthCredentials = z.infer<typeof authSchema>;
