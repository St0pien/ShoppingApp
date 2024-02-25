import { notFoundOnError } from '@/components/helpers';
import { ItemDelete } from '@/components/items/ItemDelete';
import { repos } from '@/lib/repositories';

interface Props {
  params: {
    id: number;
  };
}

export default async function DeleteItemPage({ params: { id } }: Props) {
  const item = await notFoundOnError(() => repos.items.fetch(id));

  return (
    <>
      <h1 className='mb-4 text-3xl font-bold text-primary-600'>Delete item</h1>
      <ItemDelete item={item} />
    </>
  );
}
