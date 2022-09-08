import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';
const MusicPlayer = dynamic(() => import('./MusicPlayer'), {
  ssr: false,
});

export const AppSideBar = ({
  children,
}: PropsWithChildren) => {
  return (
    <aside className='flex flex-col space-x-2 h-full'>
      <MusicPlayer />
    </aside>
  );
};
