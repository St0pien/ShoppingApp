import { pgClient } from '../infrastructure/postgres/db';
import { CategoryModel } from '../models/CategoryModel';
import { CategoriesRepository } from './interfaces/CategoriesReopsitory';

export class CategoriesKyselyRepository implements CategoriesRepository {
  async fetchAll(): Promise<CategoryModel[]> {
    const rows = await pgClient
      .selectFrom('categories')
      .select(['id', 'categoryName as name'])
      .execute();

    return rows;
  }
}
