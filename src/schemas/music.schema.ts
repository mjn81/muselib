import { z } from 'zod';

const BaseMusicSchema = z.object({
  title: z.string(),
  year: z.date(),
  musicLink: z.string(),
  length: z.string().regex(/^\d{2}:\d{2}:\d{2}$/),
});

export const CreateMusicInput = z
  .object({
    genres: z.array(
      z.object({
        id: z.string(),
      })
    ),
    singers: z.array(
      z.object({
        id: z.string(),
      })
    ),
  })
  .merge(BaseMusicSchema);

export const CreateMusicValidator = z
  .object({
    genres: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    ),
    singers: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    ),
  })
  .merge(BaseMusicSchema);

export type CreateMusicForm = z.infer<
  typeof CreateMusicValidator
>;

export const DeleteMusicInput = z.object({
  id: z.string(),
});

export const UpdateMusicInput = CreateMusicInput.merge(
  DeleteMusicInput
);

export type UpdateMusicForm = z.infer<
  typeof UpdateMusicInput
>;
