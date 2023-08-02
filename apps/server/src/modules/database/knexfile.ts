import type { Knex } from 'knex';

/**
 * TODO: use or create config module to pull values from env
 * instead of using hardcoded values
 * */

const config: { [key: string]: Knex.Config } = {
  test: {
    client: 'postgres',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'notes_app',
      user: 'dev',
      password: 'postgres'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    },
    pool: {
      min: 1,
      max: 8
    }
  },
  development: {
    client: 'postgres',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'notes_app',
      user: 'dev',
      password: 'postgres'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    },
    pool: {
      min: 1,
      max: 8
    }
  },

  staging: {
    client: 'postgres',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'notes_app',
      user: 'dev',
      password: 'postgres'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    },
    pool: {
      min: 2,
      max: 16
    }
  },

  production: {
    client: 'postgres',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'notes_app',
      user: 'dev',
      password: 'postgres'
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    },
    pool: {
      min: 2,
      max: 32
    }
  }
};

export default config;
