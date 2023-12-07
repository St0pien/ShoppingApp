import { NODE_ENV } from '@/constant/env';
import { createKysely } from '@vercel/postgres-kysely';
import {
  Generated,
  Selectable,
  ColumnType,
  PostgresDialect,
  Kysely,
  Updateable
} from 'kysely';
import { Pool } from 'pg';

interface CategoriesTable {
  id: Generated<number>;
  categoryName: string;
}

export type Categories = Selectable<CategoriesTable>;
export type UpdateCategories = Updateable<CategoriesTable>;

interface ItemsTable {
  id: Generated<number>;
  itemName: string;
  category: number; // FK
}

interface ListsTable {
  id: Generated<number>;
  listName: string;
  createdAt: ColumnType<Date, string | undefined, never>;
}

interface ListContentsTable {
  listId: number; // FK
  itemId: number; // FK
}

export interface Database {
  categories: CategoriesTable;
  items: ItemsTable;
  lists: ListsTable;
  listContents: ListContentsTable;
}

function buildDB() {
  if (NODE_ENV == 'production') {
    return createKysely<Database>();
  }

  const dialect = new PostgresDialect({
    pool: new Pool({
      database: 'verceldb',
      host: 'localhost',
      user: 'postgres',
      password: 'root',
      port: 5434,
      max: 10
    })
  });

  return new Kysely<Database>({ dialect });
}

export const pgClient = buildDB();
