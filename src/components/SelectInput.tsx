'use client';

import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import { type InputHTMLAttributes, useState, ReactNode, Key } from 'react';

interface Props<T> extends InputHTMLAttributes<HTMLSelectElement> {
  options: T[];
  initial?: T;
  display: (option: T) => ReactNode;
  optionKey: (option: T) => Key;
}

export function SelectInput<T>({
  options,
  display,
  initial,
  optionKey,
  ...props
}: Props<T>) {
  const defaultValue = initial
    ? options.find((o) => optionKey(o) === optionKey(initial))
    : undefined;
  const [selectedCategory, setSelectedCategory] = useState(
    defaultValue ?? options[0]
  );

  return (
    <div className={clsx('relative', props.className)}>
      <Listbox
        value={selectedCategory}
        onChange={setSelectedCategory}
        name='category'
      >
        <Listbox.Label className='text-gray-400 pl-2 text-lg'>
          Category
        </Listbox.Label>
        <Listbox.Button
          className={clsx(
            'w-full relative justify-between cursor-default text-left px-3 py-2 rounded-2xl bg-black border-2 border-gray-800'
          )}
        >
          <span
            className='block truncate text-white text-lg
            '
          >
            {display(selectedCategory)}
          </span>
          <span className='absolute right-0 inset-y-0 flex items-center pr-2 '>
            <svg
              className='w-6 h-6 text-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={3.0}
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9'
              />
            </svg>
          </span>
        </Listbox.Button>
        <Listbox.Options className='absolute w-full max-h-60 overflow-auto rounded-md py-1 shadow-lg bg-gradient-to-b from-gray-950 to-gray-900 focus:outline-none'>
          {options.map((option) => (
            <Listbox.Option
              className={clsx(
                'relative cursor-default select-none py-2 pl-10 pr-4 text-white',
                'after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-5/6 after:h-[1px] after:bg-gray-800 last:after:hidden',
                'ui-active:bg-primary-950',
                'ui-active:after:hidden'
              )}
              key={optionKey(option)}
              value={option}
            >
              {display(option)}
              <span
                className={clsx(
                  'absolute inset-y-0 left-0  items-center pl-2 hidden',
                  'ui-selected:flex'
                )}
              >
                <svg
                  className='w-6 h-6 text-primary-500'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={3}
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m4.5 12.75 6 6 9-13.5'
                  />
                </svg>
              </span>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}

export function OptionalSelectInput<T>(props: Props<T | null>) {
  return <SelectInput {...props} options={[null, ...props.options]} />;
}
