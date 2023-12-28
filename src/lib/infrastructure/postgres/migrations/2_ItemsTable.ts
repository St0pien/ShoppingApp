import { type Kysely } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable('items')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('itemName', 'varchar(256)', (col) => col.unique().notNull())
    .addColumn('category', 'int4', (col) =>
      col.references('categories.id').onDelete('set null')
    )
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.dropTable('items').ifExists().execute();
}
