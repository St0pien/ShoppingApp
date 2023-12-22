import { ItemModel } from '@/lib/models/ItemModel';
import { pgClient } from '../infrastructure/postgres/db';
import { ItemsRepository } from './interfaces/ItemsRepository';
import { kyselyErrorAdapter } from '../adapters/kyselyErrorAdapter';

export class ItemsKyselyRepository implements ItemsRepository {
  fetchAll(): Promise<ItemModel[]> {
    return kyselyErrorAdapter(async () => {
      const rows = pgClient
        .selectFrom('items')
        .leftJoin('categories', 'items.category', 'categories.id')
        .select([
          'items.id',
          'itemName as name',
          'categories.id as categoryId',
          'categories.categoryName'
        ]);

      const rowss = await rows.execute();
      return rowss.map(({ id, name, categoryId, categoryName }) => ({
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
    });
  }

  fetch(id: number): Promise<ItemModel> {
    return kyselyErrorAdapter(async () => {
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
    });
  }

  update(
    id: number,
    {
      name,
      category
    }: { name?: string | undefined; category?: number | undefined }
  ): Promise<void> {
    return kyselyErrorAdapter(async () => {
      await pgClient
        .updateTable('items')
        .set({
          itemName: name,
          category
        })
        .where('id', '=', id)
        .executeTakeFirstOrThrow();
    });
  }
}
