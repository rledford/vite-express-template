import { z } from 'zod';

export type ErrorResponseDto = z.infer<typeof ErrorResponseSchema>;

export const ErrorResponseSchema = z.object({
  error: z.object({
    id: z.string(),
    statusCode: z.number().gte(400).default(500),
    message: z.string().default('An error occurred')
  })
});
