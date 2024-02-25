import { ItemDisplay } from '@/components/items/ItemDisplay';
import { repos } from '@/lib/repositories';
import Link from 'next/link';

export default async function ItemsPage() {
  const items = await repos.items.fetchAll();

  return (
    <>
      {items.map((item) => (
        <ItemDisplay key={item.name} item={item} />
      ))}

      <Link href='/items/add'>
        <button className='fixed bottom-16 right-8 z-0 flex h-16 w-16 select-none items-center justify-center rounded-full bg-primary-600'>
          <svg
            className='h-10 w-10'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2.5}
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 4.5v15m7.5-7.5h-15'
            />
          </svg>
        </button>
      </Link>
    </>
  );
}
