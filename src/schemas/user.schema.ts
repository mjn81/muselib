import { ROLES } from "constants/index";
import { z } from "zod";

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

// phase 2: adding image profile handler 

export const ProfileOutput = z.object({
  fullName: z.string(),
  userName: z.string(),
  email: z.string().email(),
  role: z.enum(ROLES),
  profile: z.string(),
});

// phase 3: add possiblity to see individual user details

export const GetUserOutput = z.object({
  id: z.string(),
  fullName: z.string(),
  userName: z.string(),
  email: z.string().email(),
  role: z.enum(ROLES),
  profile: z.string(),
  password: z.string(),
  likes: z.number(),
});

export const DeleteUserInput = z.object({
  id: z.string(),
})

export const UpdateUserInput = z.object({
  id: z.string(),
  fullName: z.string(),
  userName: z.string(),
  email: z.string().email(),
  role: z.enum(ROLES),
  profile: z.string(),
});  

export type UpdateUserForm = z.infer<typeof ProfileOutput>;


