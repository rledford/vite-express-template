import { z } from 'zod';

export type TestDocument = z.infer<typeof TestSchema>;

export const TestSchema = z.object({
  name: z.string().min(1).max(50)
});
