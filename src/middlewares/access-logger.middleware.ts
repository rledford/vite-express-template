import morgan from 'morgan';

export const accessLoggerMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms'
);
