import { editItem } from '@/lib/actions/items/editItem';
import Modal from '../Modal';
import ItemForm from './ItemForm';
import { repos } from '@/lib/repositories';

interface Props {
  id: number;
}

export default async function EditItem({ id }: Props) {
  const item = await repos.items.fetch(id);
  const availableCategories = await repos.categories.fetchAll();
  const editItemWithId = editItem.bind(null, item.id);

  return (
    <Modal title={item.name}>
      <ItemForm
        action={editItemWithId}
        item={item}
        categories={availableCategories}
      />
    </Modal>
  );
}
