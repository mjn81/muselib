import { z } from 'zod';
import { ROLES } from 'constants/index';


export const RegisterInputSchema = z.object({
  fullName: z.string(),
  userName: z.string(),
  email: z.string().email(),
  password: z.string().min(5).max(8),
  role: z.enum(ROLES),
})

export const LoginInputUser = z.object({
  email: z.string().email(),
  pasword: z.string().min(5).max(8)
})

export const UserOutputSchema = z.object({
  userName: z.string(),
  token: z.string(),
})

//adding image profile handler (phase 2)

export const ProfileInputSchema = z.object({
	fullName: z.string(),
	userName: z.string(),
	email: z.string().email(),
	role: z.enum(ROLES),
});
