import Drawer from '@/components/Drawer';
import TopBar from '@/components/TopBar';
import { db } from '@/lib/infrastructure/postgres/db';

export default async function Lists() {
  const test = await db.selectFrom('items').selectAll().execute();

  return (
    <>
      <TopBar title='Shopping lists'>
        <Drawer />
      </TopBar>
      <main className='flex min-h-screen flex-col items-center p-10'>
        <div className='w-full mb-12'>
          <h1 className='text-4xl tracking-wider text-primary-500'>
            Shopping list
          </h1>
        </div>

        {test.map((item) => (
          <div
            key={item.id}
            className='w-full min-h-[100px] border-primary-900 border-2 flex flex-col items-center justify-center'
          >
            <h1 className='text-secondary-900'>{item.itemName}</h1>
            <p>{item.category}</p>
          </div>
        ))}
      </main>
    </>
  );
}
