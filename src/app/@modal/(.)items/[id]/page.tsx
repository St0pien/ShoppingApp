import { Modal } from '@/components/Modal';
import { ItemForm } from '@/components/items/ItemForm';
import { repos } from '@/lib/repositories';

interface Props {
  params: {
    id: number;
  };
}

export default async function EditItemModalPage({ params: { id } }: Props) {
  const item = await repos.items.fetch(id);
  const categories = await repos.categories.fetchAll();

  return (
    <Modal title='Edit item'>
      <ItemForm item={item} categories={categories} />
    </Modal>
  );
}
