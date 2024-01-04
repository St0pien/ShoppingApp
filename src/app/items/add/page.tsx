import { ItemForm } from '@/components/items/ItemForm';
import { repos } from '@/lib/repositories';

export default async function AddItemPage() {
  const categories = await repos.categories.fetchAll();

  return (
    <>
      <ItemForm categories={categories} />
    </>
  );
}
