import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('notes', function (table) {
    table.increments('id').primary();
    table.string('title', 255).defaultTo('');
    table.string('content', 1020).defaultTo('');
    table.integer('author_id').notNullable();
    table.timestamps(true, true);

    table
      .foreign('author_id', 'fk__notes__users')
      .references('id')
      .inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('notes');
}
