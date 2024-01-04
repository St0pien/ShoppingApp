'use client';

import { ItemModel } from '@/lib/models/ItemModel';
import { api } from '@/trpc/react';
import { useRouter } from 'next/navigation';
import { onTRPCError } from '../helpers';
import toast from 'react-hot-toast';

interface Props {
  item: ItemModel;
}

export function ItemDelete({ item }: Props) {
  const router = useRouter();

  const onCancel = () => {
    router.back();
  };

  const { mutate: deleteItem } = api.items.deleteItem.useMutation({
    onSuccess() {
      toast.success(`${item.name} has been deleted`);

      router.replace('/items');
      router.refresh();
    },
    onError: onTRPCError
  });

  return (
    <div>
      <p className='text-xl text-center'>Are you sure you want to delete:</p>
      <h2 className='text-2xl font-bold text-primary-600 my-6 text-center'>
        {item.name}
      </h2>
      <div className='w-full mt-4 flex justify-between'>
        <button
          onClick={onCancel}
          className='bg-black px-3 py-1 rounded-lg border-[1px] border-primary-950 text-primary-700'
        >
          Cancel
        </button>
        <button
          onClick={() => deleteItem(item.id)}
          className='bg-primary-600 text-white px-3 py-1 rounded-lg border-[1px] border-primary-950'
        >
          Delete
        </button>
      </div>
    </div>
  );
}
