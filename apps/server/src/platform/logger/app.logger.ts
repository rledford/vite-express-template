import winston from 'winston';
import { LogLevel } from '../config/config.schema';

export interface AppLogger {
  info: (msg?: string) => void;
  warn: (msg?: string) => void;
  error: (msg?: string) => void;
}

const format = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
  )
);

export const appLogger = (logLevel: LogLevel): AppLogger =>
  winston.createLogger({
    format,
    transports: [new winston.transports.Console()],
    level: logLevel
  });

export const noopLogger = (): AppLogger => ({
  info: () => undefined,
  warn: () => undefined,
  error: () => undefined
});
