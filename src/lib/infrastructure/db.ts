import { createKysely } from '@vercel/postgres-kysely';
import { Generated, Selectable, ColumnType } from 'kysely';

interface CategoriesTable {
  id: Generated<number>;
  categoryName: string;
}

export type Categories = Selectable<CategoriesTable>;

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

interface Database {
  categories: CategoriesTable;
  items: ItemsTable;
  lists: ListsTable;
  listContents: ListContentsTable;
}

export const db = createKysely<Database>();
