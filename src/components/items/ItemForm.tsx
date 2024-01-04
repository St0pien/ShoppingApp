'use client';

import { type CategoryModel } from '@/lib/models/CategoryModel';
import { type ItemModel } from '@/lib/models/ItemModel';
import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from '../TextInput';
import { api } from '@/trpc/react';
import toast from 'react-hot-toast';
import { editItemForm } from '@/server/api/schemas/items';
import { z } from 'zod';
import { SelectInput } from '../SelectInput';

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

  const methods = useForm({
    resolver: zodResolver(editItemForm),
    mode: 'onChange',
    defaultValues: {
      name: item?.name,
      category: item?.category
    }
  });

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

  const onSubmit: SubmitHandler<z.infer<typeof editItemForm>> = ({
    name,
    category
  }) => {
    if (item) {
      console.log(category);
      editItem({
        id: item.id,
        name,
        category: category?.id
      });
    }
  };

  const err = methods.formState.errors;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className='flex flex-col items-center gap-10'
      >
        <span className='w-full'>
          <TextInput
            className='w-full text-lg'
            name='name'
            label="Item's name"
          />
          <p className='pl-2 text-sm text-primary-500'>
            {err.name?.message?.toString()}
          </p>
        </span>
        <span className='w-full'>
          <SelectInput
            className='w-full'
            name='category'
            label='Category'
            options={[{ id: null, name: '---' }, ...categories]}
            defaultValue={item?.category}
            isSearchable={false}
            placeholder='---'
            getOptionLabel={(o) => o.name}
            getOptionValue={(o) => o.id?.toString() ?? ''}
          />
          {/* <SelectInput
            className='w-full'
            name='category'
            options={categories}
            defaultValue={item?.category}
            display={(o) => o?.name ?? '...'}
            optionKey={(o) => o?.id ?? null}
          /> */}
          <p className='pl-2 text-sm text-primary-500'>
            {err.category?.message?.toString()}
          </p>
        </span>
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
    </FormProvider>
  );
}
