'use client';

import { type CategoryModel } from '@/lib/models/CategoryModel';
import { type ItemModel } from '@/lib/models/ItemModel';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { TextInput } from '../TextInput';
import { api } from '@/trpc/react';
import toast from 'react-hot-toast';

interface Props {
  item?: ItemModel;
  categories: CategoryModel[];
  onSave?: () => void;
}

export function ItemForm({ item, categories, onSave }: Props) {
  const router = useRouter();

  const onCancel = () => {
    router.back();
  };

  const [name, setName] = useState(item?.name);
  const [category, setCategory] = useState(item?.category?.id);

  const { mutate: editItem } = api.items.editItem.useMutation({
    onSuccess() {
      toast.success('Item has been saved');

      if (onSave) {
        onSave();
      } else {
        router.replace('/items');
        router.refresh();
      }
    },
    onError(error) {
      if (error.data?.appError) {
        toast.error(error.message);
      }

      for (const key in error.data?.zodError?.fieldErrors) {
        toast.error(
          `${key}: ${error.data.zodError.fieldErrors[key]?.join(',')}`
        );
      }

      error.data?.zodError?.formErrors.forEach((err) => {
        toast.error(err);
      });
    }
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const categoryID = formData.get('category')?.toString();

    if (item) {
      editItem({
        id: item.id,
        name: formData.get('name')?.toString(),
        category: categoryID ? +categoryID : undefined
      });
    }
  };

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className='flex flex-col items-cenjjter'
    >
      <TextInput
        className='w-full text-lg'
        name='name'
        label="Item's name"
        initialValue={item?.name}
      />
      <input
        id='name'
        name='name'
        className='w-full p-2 rounded-md bg-black border-2 border-gray-800 focus:outline-none focus:border-primary-900'
        placeholder="Item's name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <select
        id='category'
        name='category'
        className='w-full p-2 rounded-md bg-black border-2 border-gray-800 focus:outline-none focus:border-primary-800'
        onChange={(e) => setCategory(+e.target.value)}
        value={category}
      >
        {categories.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
      <div className='mt-8 w-full flex justify-between'>
        <button
          onClick={onCancel}
          type='button'
          className='bg-black px-3 py-1 rounded-lg border-[1px] border-primary-950 text-primary-700'
        >
          Cancel
        </button>
        <button className='bg-black px-3 py-1 rounded-lg border-[1px] border-primary-950 text-primary-700'>
          Save
        </button>
      </div>
    </form>
  );
}
