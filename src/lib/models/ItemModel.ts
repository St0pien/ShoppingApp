export interface ItemModel {
  id: number;
  name: string;
  category?: {
    id: number;
    name: string;
  };
}
