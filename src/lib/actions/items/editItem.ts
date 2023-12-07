'use server';

import { repos } from '@/lib/repositories';
import { redirect } from 'next/navigation';

export async function editItem(id: number, formdata: FormData) {
  const updateName = formdata.get('name')?.toString();
  const catdata = formdata.get('category')?.toString();
  const updateCategory = catdata ? parseInt(catdata) : undefined;

  await repos.items.update(id, {
    name: updateName ?? undefined,
    category: updateCategory
  });

  console.log('redirecting');
  redirect('/items');
}
