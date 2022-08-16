import { AppSideBar, MusicTable } from 'components';
import { AppLayout } from 'layouts';
import { postError } from 'utils/res';
import { trpc } from 'utils/trpc';

const Musics = () => {
  const { data } = trpc.useQuery(['music.getAll'], {
    onError: ({ message }) => {
      postError(message);
    },
  });
  const options = [
    {
      children: 'edit',
      onClick: () => {
        console.log('edit');
      },
    },
    {
      children: 'delete',
      onClick: () => {
        console.log('delete');
      },
    },
  ];
  return (
    <AppLayout title='musics'>
      <section className='flex space-x-10'>
        <MusicTable data={data} options={options} />
        <AppSideBar />
      </section>
    </AppLayout>
  );
};

export default Musics;
