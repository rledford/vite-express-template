type LoggerFunction = (message: string | unknown) => void;

export type Logger = {
  debug: LoggerFunction;
  info: LoggerFunction;
  warn: LoggerFunction;
  error: LoggerFunction;
};
