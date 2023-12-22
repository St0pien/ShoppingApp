import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-6xl font-bold text-primary-600 m-6j'>404</h1>
      <h1 className='text-lg'>
        This page could not be found! Probably doesn&apos;t exist
      </h1>
      <div className='w-full'>
        <Link
          className='group w-fit m-5 text-xl text-primary-700 hover:text-primary-400 flex items-center hover:underline'
          href='/'
        >
          Back to home
          <svg
            className='fill-primary-600 w-6 h-6 mx-2 group-hover:fill-primary-400'
            width='52'
            height='52'
            version='1.1'
            id='lni_lni-arrow-right'
            x='0px'
            y='0px'
            viewBox='0 0 64 64'
          >
            <path
              d='M57.6,30.4l-20.7-21c-0.9-0.9-2.3-0.9-3.2,0c-0.9,0.9-0.9,2.3,0,3.2l16.8,17.1H8c-1.2,0-2.2,1-2.2,2.2s1,2.3,2.2,2.3h42.7
	l-17,17.3c-0.9,0.9-0.9,2.3,0,3.2c0.4,0.4,1,0.6,1.6,0.6c0.6,0,1.2-0.2,1.6-0.7l20.7-21C58.5,32.7,58.5,31.3,57.6,30.4z'
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
