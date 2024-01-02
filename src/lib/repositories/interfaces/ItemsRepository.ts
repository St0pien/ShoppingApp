import { ItemModel } from '@/lib/models/ItemModel';

export interface ItemsRepository {
  fetchAll(): Promise<ItemModel[]>;

  fetch(id: number): Promise<ItemModel>;

  update(
    id: number,
    data: {
      name?: string;
      category?: number | null;
    }
  ): Promise<void>;
}
