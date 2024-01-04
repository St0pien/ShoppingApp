'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { useController } from 'react-hook-form';
import Select, {
  type Props as SelectProps,
  type Options,
  GroupBase
} from 'react-select';

interface Props<T> extends SelectProps<T> {
  name: string;
  label: string;
  options: Options<T>;
}

function Label<T>(data: GroupBase<T>) {
  console.log(data);
  return <label>hi mark</label>;
}

export function SelectInput<T>({ name, label, ...props }: Props<T>) {
  const { field } = useController({
    name
  });

  const [focused, setFocus] = useState(false);

  const id = `react-select-${name}`;

  return (
    <div>
      <label
        className={clsx(
          'p-2 text-lg text-gray-400',
          focused && 'text-primary-800'
        )}
        htmlFor={id}
      >
        {label}
      </label>
      <Select
        {...field}
        {...props}
        onFocus={() => setFocus(true)}
        onBlur={() => {
          field.onBlur();
          setFocus(false);
        }}
        inputId={id}
        unstyled
        formatGroupLabel={Label}
        classNames={{
          control: ({ isFocused }) =>
            clsx(
              'p-2 text-lg rounded-2xl border-2 border-gray-800 bg-black',
              isFocused && 'border-primary-900'
            ),
          menu: () =>
            'bg-black rounded-md shadow-md border-2 border-primary-950',
          option: ({ isSelected }) =>
            clsx(
              'py-3 px-5 relative',
              'after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-11/12 after:h-[1px] after:bg-gray-800 last:after:hidden',
              isSelected && 'text-primary-500 bg-primary-950 after:hidden'
            ),

          dropdownIndicator: () => clsx(focused && 'text-primary-800')
        }}
      />
    </div>
  );
}
