import { LogLevel } from '@/modules/config/types/log';
import { Logger } from '@/types';
import winston from 'winston';

const format = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
  )
);

export const createLogger = (logLevel: LogLevel): Logger =>
  winston.createLogger({
    format,
    transports: [new winston.transports.Console()],
    level: logLevel
  });

export const noopLogger = (): Logger => ({
  info: () => undefined,
  warn: () => undefined,
  error: () => undefined
});
