import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('categories')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('categoryName', 'varchar(256)', (col) => col.unique().notNull()).execute()
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('categories').ifExists().execute();
}
