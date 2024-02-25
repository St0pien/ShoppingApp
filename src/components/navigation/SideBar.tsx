import { AppRouteName, type AppRoutes } from '@/constant/routes';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { type ReactNode } from 'react';

const listsSVG = (
  <svg
    className='h-8 w-8'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 17 10'
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeWidth='2'
      d='M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01'
    />
  </svg>
);

const itemsSVG = (
  <svg
    className='h-8 w-8 '
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='currentColor'
    viewBox='0 0 20 20'
  >
    <path d='M18.017 15.002h-1.5v-1.5a1 1 0 0 0-2 0v1.5h-1.5a1 1 0 0 0 0 2h1.5v1.5a1 1 0 1 0 2 0v-1.5h1.5a1 1 0 1 0 0-2Z' />
    <path d='m17.74 4.758-7.476 8.409a1 1 0 0 1-.718.335h-.029a1 1 0 0 1-.707-.293l-4-4a1 1 0 0 1 1.414-1.413l3.25 3.25L16.53 3.11a9.5 9.5 0 1 0-3.885 15.355 2.495 2.495 0 0 1 .373-4.963 2.5 2.5 0 0 1 5 0c.035 0 .068.01.1.01a9.43 9.43 0 0 0-.38-8.754h.002Z' />
  </svg>
);

const categoriesSVG = (
  <svg
    className='h-8 w-8'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='currentColor'
    viewBox='0 0 18 18'
  >
    <path d='M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10ZM17 13h-2v-2a1 1 0 0 0-2 0v2h-2a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2Z' />
  </svg>
);

const icons: { [key in AppRouteName]?: ReactNode } = {
  [AppRouteName.LISTS]: listsSVG,
  [AppRouteName.ITEMS]: itemsSVG,
  [AppRouteName.CATEGORIES]: categoriesSVG
};

interface Props {
  isOpen: boolean;
  routes: AppRoutes;
  routeName?: string;
}

export function SideBar({ isOpen, routeName, routes }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          className='ring-3 fixed left-0 top-0 z-10 h-screen w-2/3 rounded-md bg-gradient-to-r from-black to-gray-900 pt-20 ring-red-900'
          initial={{ x: '-100%' }}
          animate={{ x: '0' }}
          exit={{ x: '-100%' }}
          transition={{ type: 'tween' }}
        >
          {Object.entries(routes).map(([name, route]) => (
            <Link key={name} href={route.path}>
              <div
                className={clsx(
                  routeName == name && 'text-primary-700',
                  'flex w-full items-center py-3 pl-6 text-2xl'
                )}
              >
                <span className='mr-6'>{icons[name as AppRouteName]}</span>
                {name}
              </div>
            </Link>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
