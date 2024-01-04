'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useController } from 'react-hook-form';

interface Props {
  name: string;
  label: string;
  labelMargin?: number;
  className?: string;
}

export function TextInput({ name, label, labelMargin = 60, className }: Props) {
  const [focused, setFocused] = useState<boolean>(false);

  const onFocus = () => {
    setFocused(true);
  };

  const onBlur = () => {
    setFocused(false);
  };

  const { field } = useController({
    name
  });

  const id = `text-input-${name}`;

  return (
    <div className={clsx('relative', className)}>
      <motion.label
        initial={{
          y: !!field.value || focused ? -labelMargin : '-50%'
        }}
        animate={{ y: !!field.value || focused ? -labelMargin : '-50%' }}
        transition={{
          duration: 0.15
        }}
        className={clsx(
          'block absolute pointer-events-none p-2 text-gray-400 top-1/2 -translate-y-1/2',
          focused && 'text-primary-700'
        )}
        htmlFor={id}
      >
        {label}
      </motion.label>
      <input
        id={id}
        name={field.name}
        autoComplete='off'
        onChange={field.onChange}
        onFocus={onFocus}
        onBlur={() => {
          field.onBlur();
          onBlur();
        }}
        value={field.value as string}
        className='w-full p-2 rounded-2xl bg-black border-2 border-gray-800 focus:outline-none focus:border-primary-900'
      />
    </div>
  );
}
