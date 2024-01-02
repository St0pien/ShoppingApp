'use client';

import { type CategoryModel } from '@/lib/models/CategoryModel';
import { type ItemModel } from '@/lib/models/ItemModel';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';
import { TextInput } from '../TextInput';
import { api } from '@/trpc/react';
import toast from 'react-hot-toast';
import { OptionalSelectInput } from '../SelectInput';

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

    console.log(formData.getAll('category'));

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
      className='flex flex-col items-center gap-10'
    >
      <TextInput
        className='w-full text-lg'
        name='name'
        label="Item's name"
        initialValue={item?.name}
      />
      <OptionalSelectInput
        className='w-full'
        options={categories}
        initial={item?.category}
        display={(o) => o?.name ?? '...'}
        optionKey={(o) => o?.id ?? -1}
      />
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
