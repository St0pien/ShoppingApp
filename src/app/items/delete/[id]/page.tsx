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
      <h1 className='text-3xl text-primary-600 font-bold mb-4'>Delete item</h1>
      <ItemDelete item={item} />
    </>
  );
}
