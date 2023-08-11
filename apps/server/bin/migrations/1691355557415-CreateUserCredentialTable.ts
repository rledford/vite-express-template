import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('user_credential')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('hash', 'varchar(255)', (col) => col.notNull())
    .addColumn('user_id', 'serial')
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();

  await db.schema
    .alterTable('user_credential')
    .addUniqueConstraint('user_credential_user_id_unique', ['user_id'])
    .execute();

  await db.schema
    .alterTable('user_credential')
    .addForeignKeyConstraint(
      'user_credential_user_id_fkey',
      ['user_id'],
      'user',
      ['id']
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('user_credential').execute();
}
