import { ItemModel } from '@/lib/models/ItemModel';
import Link from 'next/link';

interface Props {
  item: ItemModel;
}

export default function ItemDisplay({ item }: Props) {
  return (
    <div className='w-11/12 flex items-center justify-between m-3 p-2 rounded-md bg-black border-2 border-primary-500'>
      <div>
        <h3 className='text-sm text-gray-500'>{item.category?.name}</h3>
        <h2 className='text-xl font-bold'>{item.name}</h2>
      </div>
      <div className='flex'>
        <button className='mx-3'>
          <Link  href={`/items/${item.id}`}>
            <svg
              className='w-6 h-6 text-gray-800 dark:text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 20 18'
            >
              <path d='M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z' />
              <path d='M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z' />
            </svg>
          </Link>
        </button>
        <button className='mx-3'>
          <svg
            className='w-6 h-6 text-gray-800 dark:text-white'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 18 20'
          >
            <path d='M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z' />
          </svg>
        </button>
      </div>
    </div>
  );
}
