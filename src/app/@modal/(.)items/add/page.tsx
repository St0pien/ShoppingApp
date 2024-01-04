import { Modal } from '@/components/Modal';
import { ItemForm } from '@/components/items/ItemForm';
import { repos } from '@/lib/repositories';

export default async function AddItemModalPage() {
  const categories = await repos.categories.fetchAll();

  return (
    <Modal title='Add item'>
      <ItemForm categories={categories} />
    </Modal>
  );
}
