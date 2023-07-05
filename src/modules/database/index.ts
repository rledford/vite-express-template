import { Logger } from '@/types';
import { MongoConfig } from '@/modules/config/types';
import { MongoClient, Db } from 'mongodb';

interface DatabaseModule {
  db: Db;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

type Deps = {
  config: MongoConfig;
  logger?: Logger;
};

export const databaseModule = (deps: Deps): DatabaseModule => {
  const { config, logger } = deps;

  const client = getClient(config);
  const db = client.db(config.database);

  return {
    db,
    connect: async () => {
      logger?.info(
        `Connecting to database [ ${config.type} | ${config.database} ]`
      );
      await client.connect();
      logger?.info(`Connected to database`);
    },
    disconnect: async () => {
      await client.close();
    }
  };
};

const getClient = (config: MongoConfig) => {
  if (config.type === 'docdb') return getDocumentDBClient(config);
  if (config.type === 'cloud') return getCloudDBClient(config);

  const { host, port, username, password } = config;

  return new MongoClient(`mongodb://${username}:${password}@${host}:${port}`);
};

const getCloudDBClient = (config: MongoConfig) => {
  const { host, username, password } = config;

  return new MongoClient(
    `mongodb+srv://${username}:${password}@${host}/?retryWrites=true&w=majority`
  );
};

const getDocumentDBClient = (config: MongoConfig) => {
  const { host, port, username, password } = config;

  return new MongoClient(
    `mongodb://${username}:${password}@${host}:${port}/?add-docdb-params`,
    { tlsCAFile: 'path-to-aws-public-ca.pem' }
  );
};
