import { z } from "zod";

export const CreateMusicInput = z.object({
  title: z.string(),
  year: z.date(),
  musicLink: z.string(),
  genres: z.array(z.object({
    id: z.string(),
  })),
  singers: z.array(z.object({
    id:z.string(),
  })),

});

export const CreateMusicValidator = z.object({
  title: z.string(),
  year: z.date(),
  musicLink: z.string(),
  genres: z.array(z.object({
    value: z.string(),
    label: z.string(),
  })),
  singers: z.array(z.object({
    value:z.string(),
    label:z.string(),
  })),

});

export type CreateMusicForm = z.infer<typeof CreateMusicValidator>;

export const DeleteMusicInput = z.object({
  id: z.string(),
});

export const UpdateMusicInput = CreateMusicInput.merge(DeleteMusicInput);

export type UpdateMusicForm = z.infer<typeof UpdateMusicInput>;