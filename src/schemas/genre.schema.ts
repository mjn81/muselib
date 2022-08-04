import { z } from "zod";

export const CreateGenreInput = z.object({
  name: z.string(),
}); 

export type CreateGenreForm = z.infer<typeof CreateGenreInput>;

export const CreateGenreOutput = z.object({
  id: z.string(),
  name: z.string(),
});

export const GetGenreOutput = z.array(z.object({
  id: z.string(),
  name: z.string(),
}));