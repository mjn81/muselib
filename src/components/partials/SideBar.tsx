import { PropsWithChildren } from 'react';

export const AppSideBar = ({
  children,
}: PropsWithChildren) => {
  return (
    <section className='flex space-x-2 h-full'>
      <div className='flex-grow'></div>
      <aside className='w-[400px]'>{children}</aside>
    </section>
  );
};
