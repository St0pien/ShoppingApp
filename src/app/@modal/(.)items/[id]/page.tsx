import Modal from '@/components/Modal';
import ItemForm from '@/components/items/ItemForm';
import { editItem } from '@/lib/actions/items/editItem';
import { repos } from '@/lib/repositories';

interface Props {
  params: {
    id: number;
  };
}

export default async function PageModalEditItem({ params: { id } }: Props) {
  const item = await repos.items.fetch(id);
  const categories = await repos.categories.fetchAll();

  const editItemWithId = editItem.bind(null, id);

  return (
    <Modal title='Edit item'>
      <ItemForm action={editItemWithId} item={item} categories={categories} />
    </Modal>
  );
}
