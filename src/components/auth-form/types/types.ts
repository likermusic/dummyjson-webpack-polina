import { z } from "zod";

export const authSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Minimum 3 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Minimum 6 characters"),
});

export type AuthCredentials = z.infer<typeof authSchema>;

export type AuthResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken?: string;
  refreshToken?: string;
};
