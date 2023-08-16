import { z } from 'zod';
import { nanoid } from 'nanoid';
import { CustomError } from '@/platform/error';
import { AppLogger } from '@/platform/logger';

type Config = {
  logger?: AppLogger;
  scrubInternal?: boolean;
};

// TODO: add zod error handling to return cleaner messages
export type ErrorFormatter = (error: Error | CustomError) => FormattedError;

export const errorFormatter =
  (config?: Config): ErrorFormatter =>
  (err) => {
    const id = nanoid();
    const statusCode = getStatusCode(err);
    const message =
      statusCode === 500 && config?.scrubInternal
        ? 'Internal error'
        : err.message;

    if (config?.logger) {
      config.logger.error(`Error ${id}\n${err.message}\n${err.stack}`);
    }

    return {
      error: {
        id,
        statusCode,
        message
      }
    };
  };

export type FormattedError = z.infer<typeof FormattedErrorSchema>;
export const FormattedErrorSchema = z.object({
  error: z.object({
    id: z.string(),
    statusCode: z.number().gte(400).default(500),
    message: z.string().default('An error occurred')
  })
});

const getStatusCode = (err: Error | CustomError) => {
  if (err instanceof CustomError) {
    return err.statusCode;
  }

  return 500;
};
