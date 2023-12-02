'use client';

import { ReactNode, useEffect, useState } from 'react';
import TopBar from './TopBar';
import SideBar from './SideBar';
import { useDrag } from '@use-gesture/react';
import { usePathname } from 'next/navigation';
import { AppRoutes, getRouteByPath } from '@/constant/routes';

interface Props {
  routes: AppRoutes;
  children: ReactNode;
}

const gestureTreshold = 80;

export default function Navigation({ routes, children }: Props) {
  const [isOpen, setOpen] = useState(false);

  const path = usePathname();

  useDrag(
    ({ movement: [mx] }) => {
      if (mx < -gestureTreshold) {
        setOpen(false);
      } else if (mx > gestureTreshold) {
        setOpen(true);
      }
    },
    {
      target: typeof document !== 'undefined' ? document : undefined
    }
  );

  useEffect(() => {
    const dismiss = () => {
      setOpen(false);
    };

    window.addEventListener('scroll', dismiss);

    return () => {
      window.removeEventListener('scroll', dismiss);
    };
  });

  useEffect(() => {
    setOpen(false);
  }, [path]);

  const route = getRouteByPath(path);

  return (
    <>
      <TopBar
        title={route?.title}
        isOpen={isOpen}
        toggle={() => setOpen(!isOpen)}
      />
      <SideBar routeName={route?.name} routes={routes} isOpen={isOpen} />
      <span
        onClick={() => {
          setOpen(false);
        }}
      >
        {children}
      </span>
    </>
  );
}
