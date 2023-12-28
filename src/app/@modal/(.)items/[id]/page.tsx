import { Modal } from '@/components/Modal';
import { ItemForm } from '@/components/items/ItemForm';
import { editItemAction } from '@/lib/actions/items/editItemAction';
import { repos } from '@/lib/repositories';

interface Props {
  params: {
    id: number;
  };
}

export default async function EditItemModalPage({ params: { id } }: Props) {
  const item = await repos.items.fetch(id);
  const categories = await repos.categories.fetchAll();

  const editItemWithId = editItemAction.bind(null, id);

  return (
    <Modal title='Edit item'>
      <ItemForm action={editItemWithId} item={item} categories={categories} />
    </Modal>
  );
}
