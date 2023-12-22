// eslint-disable-next-line
'use client';

import { AppError } from '@/lib/errors/Error';

interface Props {
  error: AppError;
}

export default function Error({ error }: Props) {
  const { status, message } = JSON.parse(error.message) as {
    status: number;
    message: string;
  };

  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-6xl font-bold text-primary-600 m-6j'>{status}</h1>
      <h1 className='text-lg'>{message}</h1>
      <div className='w-full flex justify-center'>
        <button
          onClick={() => window.location.reload()}
          className='group w-fit m-5 text-xl text-primary-700 hover:text-primary-400 flex items-center hover:underline'
        >
          Retry
          <svg
            className='fill-primary-600 w-6 h-6 mx-2 group-hover:fill-primary-400 -scale-x-100'
            xmlns='http://www.w3.org/2000/svg'
            height='16'
            width='16'
            viewBox='0 0 512 512'
          >
            <path d='M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z' />
          </svg>
        </button>
      </div>
    </div>
  );
}
