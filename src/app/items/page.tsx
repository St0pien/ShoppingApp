import { ItemDisplay } from '@/components/items/ItemDisplay';
import { repos } from '@/lib/repositories';

export default async function ItemsPage() {
  const items = await repos.items.fetchAll();

  return (
    <>
      {items.map((item) => (
        <ItemDisplay key={item.name} item={item} />
      ))}
    </>
  );
}
