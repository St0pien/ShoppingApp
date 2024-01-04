'use client';

import { type CategoryModel } from '@/lib/models/CategoryModel';
import { type ItemModel } from '@/lib/models/ItemModel';
import { useRouter } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from '../TextInput';
import { api } from '@/trpc/react';
import toast from 'react-hot-toast';
import { addItemForm, editItemForm } from '@/server/api/schemas/items';
import { z } from 'zod';
import { SelectInput } from '../SelectInput';
import { onTRPCError } from '../helpers';

interface Props {
  item?: ItemModel;
  categories: CategoryModel[];
  onSave?: () => void;
}

enum FormType {
  Edit = 'Edit',
  Add = 'Add'
}

const schemas = {
  [FormType.Edit]: editItemForm,
  [FormType.Add]: addItemForm
};

export function ItemForm({ item, categories, onSave }: Props) {
  const router = useRouter();
  const categoriesWithNull = [{ id: null, name: '---' }, ...categories];
  const formType = item ? FormType.Edit : FormType.Add;

  const methods = useForm({
    resolver: zodResolver(schemas[formType]),
    mode: 'onChange',
    defaultValues: {
      name: item?.name ?? '',
      category: item?.category ?? categoriesWithNull[0]
    }
  });

  const onSuccess = () => {
    toast.success('Item has been saved');

    if (onSave) {
      onSave();
    } else {
      router.replace('/items');
      router.refresh();
    }
  };

  const { mutate: editItem } = api.items.editItem.useMutation({
    onSuccess,
    onError: onTRPCError
  });

  const { mutate: addItem } = api.items.additem.useMutation({
    onSuccess,
    onError: onTRPCError
  });

  const editHandler: SubmitHandler<z.infer<typeof editItemForm>> = ({
    name,
    category
  }) => {
    editItem({
      id: item!.id,
      name,
      category: category?.id
    });
  };

  const addHandler: SubmitHandler<z.infer<typeof addItemForm>> = ({
    name,
    category
  }) => {
    addItem({
      name,
      category: category.id
    });
  };

  const handlers = {
    [FormType.Add]: addHandler,
    [FormType.Edit]: editHandler
  };

  const onCancel = () => {
    router.back();
  };

  const err = methods.formState.errors;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handlers[formType])}
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
            options={categoriesWithNull}
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
          <button className='bg-primary-600 px-3 py-1 rounded-lg border-[1px] border-primary-950 text-white'>
            Save
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
