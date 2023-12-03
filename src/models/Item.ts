export class Item {
  readonly name: string;
  readonly category: string | null;
  constructor({ name, category }: { name: string; category: string | null }) {
    this.name = name;
    this.category = category;
  }
}
