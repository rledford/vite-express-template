import { z } from 'zod';

export const NoteDTO = z.object({
  id: z.string().uuid(),
  content: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type CreateNoteDTO = z.infer<typeof CreateNoteDTO>;
export const CreateNoteDTO = z.object({
  userId: z.string().uuid(),
  content: z.string().default(''),
});

export type UpdateNoteDTO = z.infer<typeof UpdateNoteDTO>;
export const UpdateNoteDTO = z
  .object({ id: z.number().int() })
  .merge(CreateNoteDTO);
