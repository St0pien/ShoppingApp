'use client';

import { CategoryModel } from '@/lib/models/CategoryModel';
import { ItemModel } from '@/lib/models/ItemModel';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TextInput from '../TextInput';

interface Props {
  action: (data: FormData) => unknown;
  item?: ItemModel;
  categories: CategoryModel[];
}

export default function ItemForm({ action, item, categories }: Props) {
  const router = useRouter();

  const onCancel = () => {
    router.back();
  };

  const [name, setName] = useState(item?.name);
  const [category, setCategory] = useState(item?.category?.id);

  return (
    <form className='flex flex-col items-cenjjter' action={action}>
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
