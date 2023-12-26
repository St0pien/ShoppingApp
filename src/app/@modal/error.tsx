'use client';

import { AppError } from '@/lib/errors/Error';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface Props {
  error: AppError;
}

export default function Error({ error }: Props) {
  const { message } = JSON.parse(error.message) as { message: string };

  useEffect(() => {
    toast.error(message);
  }, [message]);

  return null;
}
