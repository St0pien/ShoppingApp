import { notFound } from 'next/navigation';
import toast from 'react-hot-toast';
import { type TRPCClientErrorLike } from '@trpc/react-query';
import { RouterError } from '@/trpc/utils';

export async function notFoundOnError<T>(fetcher: () => Promise<T>) {
  try {
    return await fetcher();
  } catch (e) {
    notFound();
  }
}

export function onTRPCError(error: TRPCClientErrorLike<RouterError>) {
  if (error.data?.appError) {
    toast.error(error.message);
  }

  for (const key in error.data?.zodError?.fieldErrors) {
    toast.error(`${key}: ${error.data.zodError.fieldErrors[key]?.join(',')}`);
  }

  error.data?.zodError?.formErrors.forEach((err) => {
    toast.error(err);
  });
}
