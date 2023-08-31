import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('user_profiles')
    // id is not auto-generated and is intended to be inserted using
    // the authenticated account claims when a client creates their user
    .addColumn('id', 'uuid', (col) => col.primaryKey().notNull())
    .addColumn('username', 'varchar(255)', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .createIndex('user_profiles_username_index')
    .on('user_profiles')
    .column('username')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('user_profiles').execute();
}
