import { CategoriesKyselyRepository } from './CategoriesKyselyRepository';
import { ItemsKyselyRepository } from './ItemsKyselyRepository';
import { type CategoriesRepository } from './interfaces/CategoriesReopsitory';
import { type ItemsRepository } from './interfaces/ItemsRepository';

interface Repos {
  items: ItemsRepository;
  categories: CategoriesRepository;
}

export const repos: Repos = {
  items: new ItemsKyselyRepository(),
  categories: new CategoriesKyselyRepository()
};
