import pg from 'pg';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { NoteTable, UserTable } from './tables';
import { DatabaseConfig } from '../config/config.schema';
import { AppLogger } from '../logger';

export interface DatabaseSchema {
  user: UserTable;
  note: NoteTable;
}

export type Database = Kysely<DatabaseSchema>;

type Deps = {
  config: DatabaseConfig;
  logger?: AppLogger;
};

export interface PlatformDatabase {
  db: Database;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

export const platformDatabase = (deps: Deps): PlatformDatabase => {
  const { config, logger } = deps;
  const pool = new pg.Pool({
    ...config
  });

  const dialect = new PostgresDialect({
    pool
  });

  const db = new Kysely<DatabaseSchema>({
    dialect,
    plugins: [new CamelCasePlugin()]
  });

  logger?.info(`Connecting to database...`);

  const connect = () =>
    new Promise<void>((resolve, reject) => {
      pool
        .connect()
        .then((c) => {
          logger?.info(`Connected to database [ ${config.database} ]`);
          // release the connection back to the pool
          c.release();
          resolve();
        })
        .catch((err) => {
          logger?.error(
            `Error connecting to database\n${err}\nconfig\n${JSON.stringify(
              {
                ...config,
                password: '*****'
              },
              null,
              2
            )}`
          );
          reject(err);
        });
    });

  return {
    db,
    connect,
    disconnect: async () => {
      await db.destroy();
      logger?.info('Database disconnected');
    }
  };
};
