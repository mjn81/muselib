import { AppSideBar, MusicTable } from 'components';
import {
  IMusic,
  MusicContext,
  MUSIC_ACTIONS,
} from 'context';
import { AppLayout } from 'layouts';
import { useContext } from 'react';
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
  // change later
  const onPlay = (music: any) => {
    dispatch({
      type: MUSIC_ACTIONS.START,
      payload: {
        id: music.id,
        singers: music.SingerItem.map(
          ({ singer }: { singer: { name: string } }) =>
            singer.name
        ),
        genres: music.GenreItem.map(
          ({
            genreId: genre,
          }: {
            genreId: { name: string };
          }) => genre.name
        ),
        title: music.title,
        link: music.musicLink,
        year: music.year,
      },
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
