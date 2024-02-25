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
    <div className='fixed left-0 top-0 z-10 flex h-screen w-screen flex-col items-center justify-center'>
      <div className='absolute left-0 top-0 h-screen w-screen bg-black bg-opacity-60'></div>
      <div className='fixed left-1/2 top-32 min-w-[80%] max-w-0 -translate-x-1/2 rounded-xl bg-gradient-to-b from-gray-900 to-black px-10 py-5 shadow-xl shadow-primary-950'>
        <div className='text-3xl font-bold text-primary-600'>{title}</div>
        <div className='mb-8'>{description}</div>
        {children}
      </div>
    </div>
  );
}
