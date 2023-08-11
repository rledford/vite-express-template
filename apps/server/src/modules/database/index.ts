import pg from 'pg';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Logger } from '@/types';
import { redactString } from '@/utils';
import { DatabaseConfig } from '@/modules/config/types';
import { Database, DatabaseSchema } from './types';

type Deps = {
  config: DatabaseConfig;
  logger?: Logger;
};

export interface DatabaseModule {
  db: Database;
  disconnect: () => Promise<void>;
}

export const databaseModule = (deps: Deps): DatabaseModule => {
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

  pool
    .connect()
    .then((c) => {
      logger?.info(`Connected to database [ ${config.database} ]`);

      c.release();
    })
    .catch((err) => {
      logger?.error(
        `Error connecting to database\n${err}\nconfig\n${JSON.stringify(
          {
            ...config,
            password: redactString(config.password)
          },
          null,
          2
        )}`
      );
      process.exit(1);
    });

  return {
    db,
    disconnect: async () => {
      await db.destroy();
      logger?.info('Database disconnected');
    }
  };
};
