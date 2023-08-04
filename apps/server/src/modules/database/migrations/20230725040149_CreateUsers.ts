import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('username', 32).notNullable();
    table.timestamps(true, true);

    table.unique('username', { indexName: 'uq__users__username' });
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
