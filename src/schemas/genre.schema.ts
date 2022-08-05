import { z } from "zod";

export const CreateGenreInput = z.object({
  name: z.string(),
}); 

export const CreateGenreOutput = z.object({
  id: z.string(),
  name: z.string(),
});

export const GetGenreOutput = z.array(CreateGenreOutput);

export const GetGenreByIdInput = z.object({
  id: z.string(),
});

export type CreateGenreForm = z.infer<typeof CreateGenreInput>;

