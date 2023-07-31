import { z } from 'zod';

export type DbConfig = {
  type: DbType;
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

export type DbType = z.infer<typeof DbTypeSchema>;
export const DbTypeSchema = z.literal('postgres');
