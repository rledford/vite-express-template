import { ObjectId } from 'mongodb';
import { z } from 'zod';

export type JournalEntity = z.infer<typeof JournalEntitySchema>;
export const JournalEntitySchema = z.object({
  _id: z.instanceof(ObjectId),
  title: z.string(),
  body: z.string(),
  calendarDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date()
});
