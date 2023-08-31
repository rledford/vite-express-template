import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await sql<void>`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql<void>`DROP EXTENSION IF EXISTS "uuid-ossp"`.execute(db);
}
