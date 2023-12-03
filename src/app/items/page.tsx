import { ItemsKyselyRepository } from '@/lib/repositories/ItemsKyselyRepository';

export default async function Items() {
  const items = await new ItemsKyselyRepository().fetchAll();
  return (
    <div>
      <h1>Items</h1>
      {items.map((item) => (
        <div key={item.name}>
          {item.name} - {item.category}
        </div>
      ))}
    </div>
  );
}
