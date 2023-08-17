import * as path from 'path';
import dotenv from 'dotenv';
import pg from 'pg';
import { promises as fs } from 'fs';
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from 'kysely';

type MigrationCommand = 'up' | 'down' | 'latest';
type ExecuteMigrationProps = {
  command: MigrationCommand;
  migrator: Migrator;
};

async function migrate() {
  const command = process.argv[2];

  if (!isValidCommand(command)) {
    console.error(`Invalid migrator command "${command}"`);
    process.exit(1);
  }

  const env = Object.assign({}, process.env, dotenv.config().parsed);
  const db = new Kysely<any>({
    dialect: new PostgresDialect({
      pool: new pg.Pool({
        database: env.DB_DATABASE,
        host: env.DB_HOST,
        port: Number(env.DB_PORT),
        user: env.DB_USER,
        password: env.DB_PASS,
      }),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, '../migrations'),
    }),
  });

  const { error, results } = await executeMigration({ command, migrator });

  if (results && results.length > 0) {
    results.forEach((it) => {
      if (it.status === 'Success') {
        console.log(`Migrate [ ${command} ] "${it.migrationName}" executed`);
      } else if (it.status === 'Error') {
        console.error(`Failed to execute migration "${it.migrationName}"`);
      }
    });
  } else {
    console.log('No migrations to execute');
  }

  if (error) {
    console.error('Failed to migrate');
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

const executeMigration = ({ command, migrator }: ExecuteMigrationProps) => {
  if (command === 'up') return migrator.migrateUp();
  if (command === 'down') return migrator.migrateDown();
  if (command === 'latest') return migrator.migrateToLatest();

  throw new Error(`No method for command "${command}"`);
};

const isValidCommand = (arg: string): arg is MigrationCommand => {
  return ['up', 'down', 'latest'].includes(arg);
};

migrate();
