import { Modal } from '@/components/Modal';
import { ItemDelete } from '@/components/items/ItemDelete';
import { repos } from '@/lib/repositories';

interface Props {
  params: {
    id: number;
  };
}

export default async function DeleteItemModalPage({ params: { id } }: Props) {
  const item = await repos.items.fetch(id);

  return (
    <Modal title='Delete item'>
      <ItemDelete item={item} />
    </Modal>
  );
}
