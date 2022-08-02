import { z } from "zod";
import { ROLES } from "constants/index";

export const RegisterInput = z.object({
  fullName: z.string(),
  userName: z.string(),
  email: z.string().email(),
  password: z.string().min(5).max(9),
});

export type RegisterInputForm = z.infer<
  typeof RegisterInput
  >;

export const LoginInput = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(9),
});

export type LoginInputForm = z.infer<typeof LoginInput>;

export const UserOutput = z.object({
  userName: z.string(),
  token: z.string(),
});

//adding image profile handler (phase 2)

export const ProfileOutput = z.object({
  fullName: z.string(),
  userName: z.string(),
  email: z.string().email(),
  role: z.enum(ROLES),
});
