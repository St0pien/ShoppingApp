import { ItemModel } from '@/lib/models/ItemModel';
import { pgClient } from '../infrastructure/postgres/db';
import { ItemsRepository } from './interfaces/ItemsRepository';

export class ItemsKyselyRepository implements ItemsRepository {
  async fetchAll(): Promise<ItemModel[]> {
    const rows = await pgClient
      .selectFrom('items')
      .leftJoin('categories', 'items.category', 'categories.id')
      .select([
        'items.id',
        'itemName as name',
        'categories.id as categoryId',
        'categories.categoryName'
      ])
      .execute();
    return rows.map(({ id, name, categoryId, categoryName }) => ({
      id,
      name,
      category:
        categoryId && categoryName
          ? {
              id: categoryId,
              name: categoryName
            }
          : undefined
    }));
  }

  async fetch(id: number): Promise<ItemModel> {
    const { itemId, name, categoryId, categoryName } = await pgClient
      .selectFrom('items')
      .leftJoin('categories', 'items.category', 'categories.id')
      .select([
        'items.id as itemId',
        'itemName as name',
        'categories.id as categoryId',
        'categories.categoryName'
      ])
      .where('items.id', '=', id)
      .executeTakeFirstOrThrow();

    return {
      id: itemId,
      name,
      category:
        categoryId && categoryName
          ? {
              id: categoryId,
              name: categoryName
            }
          : undefined
    };
  }

  async update(
    id: number,
    {
      name,
      category
    }: { name?: string | undefined; category?: number | undefined }
  ): Promise<void> {
    await pgClient
      .updateTable('items')
      .set({
        itemName: name,
        category
      })
      .where('id', '=', id)
      .executeTakeFirstOrThrow();
  }
}
