import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('user_credentials')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v1()`),
    )
    .addColumn('user_id', 'uuid', (col) =>
      col.notNull().defaultTo(sql`uuid_generate_v1()`),
    )
    .addColumn('email', 'varchar(255)', (col) => col.notNull())
    .addColumn('password', 'varchar(255)', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .addColumn('updated_at', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  await db.schema
    .alterTable('user_credentials')
    .addUniqueConstraint('user_credentials_email_unique', ['email'])
    .execute();

  await db.schema
    .createIndex('user_credentials_email_index')
    .on('user_credentials')
    .column('email')
    .execute();

  await db.schema
    .createIndex('user_credentials_user_id_index')
    .on('user_credentials')
    .column('user_id')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('user_credentials').execute();
}
