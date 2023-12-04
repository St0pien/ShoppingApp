import { ItemModel } from '@/models/ItemModel';
import { db } from '../infrastructure/postgres/db';
import { ItemsRepository } from './interfaces/ItemsRepository';

export class ItemsKyselyRepository implements ItemsRepository {
  async fetchAll(): Promise<ItemModel[]> {
    const rows = await db
      .selectFrom('items')
      .leftJoin('categories', 'items.category', 'categories.id')
      .select(['itemName as name', 'categories.categoryName as category'])
      .execute();
    return rows.map((row) => new ItemModel(row));
  }
}
