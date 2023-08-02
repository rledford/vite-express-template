import knex, { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import { Logger } from '@/types';
import { Config } from '@/modules/config/types';
import knexConfig from './knexfile';

interface DatabaseModule {
  db: Knex;
  disconnect: () => Promise<void>;
}

type Deps = {
  config: Config;
  logger?: Logger;
};

export const databaseModule = (deps: Deps): DatabaseModule => {
  const { config, logger } = deps;

  const db = knex({
    ...knexConfig[config.mode],
    ...knexSnakeCaseMappers()
  });

  logger?.info(`Database initialized`);

  return {
    db,
    disconnect: async () => {
      await db.destroy();
      logger?.info('Database disconnected');
    }
  };
};
