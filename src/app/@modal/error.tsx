'use client';

import { type AppError } from '@/lib/errors/Error';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface Props {
  error: AppError;
}

export default function Error({ error }: Props) {
  let message: string;

  try {
    ({ message } = JSON.parse(error.message) as { message: string });
  } catch {
    message = error.message;
  }

  useEffect(() => {
    toast.error(message);
  }, [message]);

  return null;
}
