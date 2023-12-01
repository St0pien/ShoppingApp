import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('lists')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('listName', 'varchar(256)')
    .addColumn('createdAt', 'timestamp', (col) =>
      col.defaultTo(sql`now()`).notNull()
    )
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('lists').ifExists().execute();
}
