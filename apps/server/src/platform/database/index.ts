import pg from 'pg';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { DatabaseConfig } from '../configuration/config.schema';
import { Logger } from '../logger';
import { NoteTable, UserTable } from './tables';

export interface DatabaseSchema {
  user: UserTable;
  note: NoteTable;
}

export type DatabaseConnection = Kysely<DatabaseSchema>;

type Deps = {
  config: DatabaseConfig;
  logger?: Logger;
};

export interface PlatformDatabase {
  connection: DatabaseConnection;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

export const database = (deps: Deps): PlatformDatabase => {
  const { config, logger } = deps;
  const pool = new pg.Pool({
    ...config,
  });

  const dialect = new PostgresDialect({
    pool,
  });

  const connection = new Kysely<DatabaseSchema>({
    dialect,
    plugins: [new CamelCasePlugin()],
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
                password: '*****',
              },
              null,
              2,
            )}`,
          );
          reject(err);
        });
    });

  return {
    connection,
    connect,
    disconnect: async () => {
      await connection.destroy();
      logger?.info('Database disconnected');
    },
  };
};
