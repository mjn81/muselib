import { z } from 'zod';

export const CreateSingerInput = z.object({
  name: z.string(),
});

export type CreateSingerForm = z.infer<
  typeof CreateSingerInput
>;

export const CreateSingerOutput = z.object({
  id: z.string(),
  name: z.string(),
});

export const GetSingerOutput = z.array(CreateSingerOutput);

export const GetSingerByIdInput = z.object({
  id: z.string(),
});
