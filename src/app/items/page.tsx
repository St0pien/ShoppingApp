import Item from '@/components/Item';
import { ItemsKyselyRepository } from '@/lib/repositories/ItemsKyselyRepository';

export default async function Items() {
  const items = await new ItemsKyselyRepository().fetchAll();
  return (
    <div className='flex min-h-screen flex-col items-center p-10'>
      {items.map((item) => (
        <Item key={item.name} item={item} />
      ))}
    </div>
  );
}
