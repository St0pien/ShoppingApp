'use client';

import clsx from 'clsx';
import { type InputHTMLAttributes, useState } from 'react';
import { motion } from 'framer-motion';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  initialValue?: string;
  labelMargin?: number;
}

export function TextInput({
  name,
  label,
  initialValue,
  labelMargin = 60,
  ...props
}: Props) {
  const [value, setValue] = useState<string>(initialValue ?? '');
  const [labelOutside, setLabelOutside] = useState<boolean>(!!initialValue);
  const [focused, setFocused] = useState<boolean>(false);

  const onFocus = () => {
    setFocused(true);
    setLabelOutside(true);
  };

  const onBlur = () => {
    setFocused(false);
    if (!value) {
      setLabelOutside(false);
    }
  };

  const id = `text-input-${name}`;

  return (
    <div className={clsx('relative', props.className)}>
      <motion.label
        initial={{
          y: -labelMargin
        }}
        animate={{ y: labelOutside ? -labelMargin : '-50%' }}
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
        name={name}
        autoComplete='off'
        {...props}
        onChange={(e) => setValue(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        className='w-full p-2 rounded-2xl bg-black border-2 border-gray-800 focus:outline-none focus:border-primary-900'
      />
    </div>
  );
}
