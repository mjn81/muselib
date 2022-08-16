import { AppSideBar, MusicTable } from 'components';
import { AppLayout } from 'layouts';

const Musics = () => {
  return (
    <AppLayout title='musics'>
      <section className='flex space-x-10'>
        <MusicTable />
        <AppSideBar />
      </section>
    </AppLayout>
  );
};

export default Musics;
