'use client';

import { ReactNode, useState } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export default function TopBar({ title, children }: Props) {
  const [toggled, setToggled] = useState(false);

  return (
    <>
      <div className='w-full h-16 flex items-center bg-black'>
        <button
          className='w-16 h-full flex items-center justify-center relative z-10'
          onClick={() => setToggled(!toggled)}
        >
          {toggled ? (
            <svg
              className='w-6 h-6 text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 14'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
              />
            </svg>
          ) : (
            <svg
              className='w-6 h-6 text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 16 12'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='1.8'
                d='M1 1h14M1 6h14M1 11h7'
              />
            </svg>
          )}
        </button>
        <h1 className='text-2xl mx-4 text-primary-800 font-bold'>{title}</h1>
      </div>
      {toggled ? children : null}
    </>
  );
}
