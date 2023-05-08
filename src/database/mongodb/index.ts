import { MongoClient } from 'mongodb';
import { Database } from '../types/database';
import { testRepository } from './repositories/test.repository';
import { Logger } from '@/types';

type MongoUri = string;
type Deps = {
  uri: MongoUri;
  logger?: Logger;
};

export const mongoDatabase = ({ uri, logger }: Deps): Database => {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000
  });
  const db = client.db();

  let isConnected = false;

  const tests = testRepository(db);

  return {
    connect: async () => {
      if (isConnected) return;

      try {
        logger?.info('Connecting to database...');
        await client.connect();

        logger?.info('Connected to database');

        isConnected = true;
      } catch (err) {
        logger?.error('Unable to connect to database');
        logger?.error(`${err}`);
        process.exit(1);
      }
    },
    disconnect: async () => {
      try {
        await client.close();
        isConnected = false;
      } catch (err) {
        logger?.error('Disconnected from database');
      }
    },
    tests
  };
};
