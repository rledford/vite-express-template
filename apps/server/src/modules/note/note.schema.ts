import { z } from 'zod';

export const WithNoteIdSchema = z.object({
  id: z.number().int()
});

export const NoteSchema = z
  .object({
    content: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
  })
  .merge(WithNoteIdSchema);

export type CreateNote = z.infer<typeof CreateNoteSchema>;
export const CreateNoteSchema = z.object({
  content: z.string()
});

export type CreateNoteWithUser = z.infer<typeof CreateNoteWithUserSchema>;
export const CreateNoteWithUserSchema = z
  .object({
    userId: z.number().int()
  })
  .merge(CreateNoteSchema);

export type UpdateNote = z.infer<typeof UpdateNoteSchema>;
export const UpdateNoteSchema = z
  .object({})
  .merge(WithNoteIdSchema)
  .merge(CreateNoteSchema);
