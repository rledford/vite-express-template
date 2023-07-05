import { z } from 'zod';

export type MongoConfig = {
  type: MongoType;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export type MongoType = z.infer<typeof MongoTypeSchema>;
export const MongoTypeSchema = z.union([
  z.literal('mongo'),
  z.literal('cloud'),
  z.literal('docdb')
]);
