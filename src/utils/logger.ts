import winston from 'winston';

const format = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
  )
);

export const logger = winston.createLogger({
  format,
  transports: [new winston.transports.Console()]
});
