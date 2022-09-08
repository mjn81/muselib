import { AppSideBar, MusicTable } from 'components';
import { MusicContext, MUSIC_ACTIONS } from 'context';
import { AppLayout } from 'layouts';
import { useContext, useState } from 'react';
import { postError } from 'utils/res';
import { trpc } from 'utils/trpc';

const Musics = () => {
  const { dispatch } = useContext(MusicContext);
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
  const [id, setId] = useState<string>('');
  const { refetch } = trpc.useQuery(
    ['music.getById', { id: id }],
    {
      onSuccess: ({ id, title, musicLink }) => {
        dispatch({
          type: MUSIC_ACTIONS.PLAY,
          payload: {
            id,
            title,
            link: musicLink,
          },
        });
      },
      enabled: false,
    }
  );

  const onPlay = (id: string) => {
    // use event.persist() to persist the event + write better possible solution
    new Promise((resolve) => {
      setId(id);
      resolve(null);
    }).then(() => {
      refetch();
    });
  };

  return (
    <AppLayout title='musics'>
      <section className='flex space-x-10'>
        <MusicTable
          onPlay={onPlay}
          data={data}
          options={options}
        />
        <AppSideBar />
      </section>
    </AppLayout>
  );
};

export default Musics;
