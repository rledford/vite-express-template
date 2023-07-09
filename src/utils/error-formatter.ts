import { nanoid } from 'nanoid';
import { CustomError } from '@/errors';
import { ErrorFormatter, Logger } from '@/types';

type Deps = {
  logger?: Logger;
  scrubInternal?: boolean;
};

export const createErrorFormatter =
  ({ logger, scrubInternal }: Deps): ErrorFormatter =>
  (err) => {
    const id = nanoid();
    const statusCode = getStatusCode(err);
    const message =
      statusCode === 500 && scrubInternal ? 'Internal error' : err.message;

    if (logger) {
      logger.error(`Error ${id}\n${err.message}\n${err.stack}`);
    }

    return {
      error: {
        id,
        statusCode,
        message
      }
    };
  };

const getStatusCode = (err: Error | CustomError) => {
  if (err instanceof CustomError) {
    return err.statusCode;
  }

  return 500;
};
