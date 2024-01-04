'use client';

import { type ReactNode, useEffect } from 'react';

interface Props {
  title: string;
  description?: string;
  children: ReactNode;
}

export function Modal({ title, description, children }: Props) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center z-10'>
      <div className='absolute top-0 left-0 w-screen h-screen bg-black bg-opacity-60'></div>
      <div className='fixed top-32 left-1/2 -translate-x-1/2 px-10 max-w-0 py-5 min-w-[80%] rounded-xl bg-gradient-to-b from-gray-900 to-black shadow-xl shadow-primary-950'>
        <div className='text-3xl font-bold text-primary-600'>{title}</div>
        <div className='mb-8'>{description}</div>
        {children}
      </div>
    </div>
  );
}
