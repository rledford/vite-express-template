type LoggerFunction = (message: string | unknown) => void;

export type Logger = {
  info: LoggerFunction;
  warn: LoggerFunction;
  error: LoggerFunction;
};
