import { type Kysely } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable('listContents')
    .addColumn('listId', 'int4', (col) =>
      col.references('lists.id').onDelete('cascade').notNull()
    )
    .addColumn('itemId', 'int4', (col) =>
      col.references('items.id').onDelete('restrict').notNull()
    )
    .execute();
}

export async function down(db: Kysely<unknown>) {
  await db.schema.dropTable('listContents').ifExists().execute();
}
