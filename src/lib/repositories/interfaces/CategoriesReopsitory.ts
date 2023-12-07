import { CategoryModel } from '@/lib/models/CategoryModel';

export interface CategoriesRepository {
  fetchAll(): Promise<CategoryModel[]>;
}
