import winston from 'winston';
import { LogLevel } from '../configuration/config.schema';

export interface Logger {
  info: (msg?: string) => void;
  warn: (msg?: string) => void;
  error: (msg?: string) => void;
}

const format = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
  ),
);

export const createLogger = (logLevel?: LogLevel): Logger =>
  winston.createLogger({
    format,
    transports: [new winston.transports.Console()],
    level: logLevel,
  });

export const noopLogger = (): Logger => ({
  info: () => undefined,
  warn: () => undefined,
  error: () => undefined,
});
