import { db } from '@/lib/infrastructure/db';

export default async function Home() {
  const test = await db.selectFrom('items').selectAll().execute();
  console.log(test);

  return (
    <main className='flex min-h-screen flex-col items-center p-10'>
      <div className='w-full mb-12'>
        <h1 className='text-4xl tracking-wider text-rose-500'>Shopping list</h1>
      </div>

      {test.map((item) => (
        <div
          key={item.id}
          className='w-full min-h-[100px] border-rose-900 border-2 flex flex-col items-center justify-center'
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

          <h1>{item.itemName}</h1>
          <p>{item.category}</p>
        </div>
      ))}
    </main>
  );
}
