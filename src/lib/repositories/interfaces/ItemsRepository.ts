import { Item } from '@/models/Item';

export interface ItemsRepository {
  fetchAll(): Promise<Item[]>;
}
