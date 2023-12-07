'use client';

import { Dialog } from '@headlessui/react';
import { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Modal({
  title,
  description,
  children,
  isOpen,
  onClose
}: Props) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen ?? true} onClose={handleClose}>
      <div className='fixed inset-0 bg-black/80' aria-hidden='true' />
      <Dialog.Panel className='fixed top-32 left-1/2 -translate-x-1/2 px-10 max-w-0 py-5 min-w-[80%] rounded-xl bg-gradient-to-b from-gray-900 to-black shadow-xl shadow-primary-950'>
        <Dialog.Title className='text-3xl font-bold text-primary-600'>
          {title}
        </Dialog.Title>
        <Dialog.Description className='mb-8'>{description}</Dialog.Description>
        {children}
      </Dialog.Panel>
    </Dialog>
  );
}
