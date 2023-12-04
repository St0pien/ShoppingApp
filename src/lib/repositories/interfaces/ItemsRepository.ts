import { ItemModel } from '@/models/ItemModel';

export interface ItemsRepository {
  fetchAll(): Promise<ItemModel[]>;
}
