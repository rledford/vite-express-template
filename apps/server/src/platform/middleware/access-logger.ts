import morgan from 'morgan';
import { Middleware } from '../types';

export const accessLogger = (): Middleware =>
  morgan(':method :url :status :res[content-length] - :response-time ms');
