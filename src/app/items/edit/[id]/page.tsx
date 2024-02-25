import { notFoundOnError } from '@/components/helpers';
import { ItemForm } from '@/components/items/ItemForm';
import { repos } from '@/lib/repositories';

interface Props {
  params: {
    id: number;
  };
}

export default async function EditItemPage({ params: { id } }: Props) {
  const item = await notFoundOnError(() => repos.items.fetch(id));

  const categories = await repos.categories.fetchAll();

  return (
    <div className='w-full'>
      <h1 className='mb-10 text-3xl font-bold text-primary-600'>Edit item</h1>
      <ItemForm item={item} categories={categories} />
    </div>
  );
}
