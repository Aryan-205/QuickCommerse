import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('customers', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.string('phone').notNullable();
    table.string('address').notNullable();
    table.string('city').notNullable().defaultTo('New York');
    table.string('state').notNullable().defaultTo('NY');
    table.string('zip').notNullable().defaultTo('10001');
    table.string('country').notNullable().defaultTo('USA');
    table.string('role').notNullable().defaultTo('customer');
    table.string('status').notNullable().defaultTo('active');
    table.string('created_at').notNullable().defaultTo(knex.fn.now());
    table.string('updated_at').notNullable().defaultTo(knex.fn.now());
  });
}


export async function down(knex: Knex): Promise<void> {
}

