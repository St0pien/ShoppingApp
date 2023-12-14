import ItemForm from '@/components/items/ItemForm';
import { editItemAction } from '@/lib/actions/items/editItemAction';
import { repos } from '@/lib/repositories';

interface Props {
  params: {
    id: number;
  };
}

export default async function EditItemPage({ params: { id } }: Props) {
  const item = await repos.items.fetch(id);
  const categories = await repos.categories.fetchAll();

  const editItemWithId = editItemAction.bind(null, id);

  return (
    <div>
      <h1 className='text-3xl text-primary-600 font-bold mb-10'>Edit item</h1>
      <ItemForm action={editItemWithId} item={item} categories={categories} />
    </div>
  );
}
