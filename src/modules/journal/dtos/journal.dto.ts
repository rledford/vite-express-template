import { z } from 'zod';

export type JournalDTO = z.infer<typeof JournalDTOSchema>;
export const JournalDTOSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  calendarDate: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type CreateJournalDTO = z.infer<typeof CreateJournalDTOSchema>;
export const CreateJournalDTOSchema = z.object({
  title: z.string().trim().max(100).default(''),
  body: z.string().trim().max(5000).default(''),
  calendarDate: z
    .string()
    .datetime()
    .default(() => new Date().toISOString())
    .transform((value) => new Date(value))
});

export type UpdateJournalDTO = z.infer<typeof UpdateJournalDTOSchema>;
export const UpdateJournalDTOSchema = CreateJournalDTOSchema;
