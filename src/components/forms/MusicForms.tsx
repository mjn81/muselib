import {
  CREATE_MUSIC_FIELDS,
  CREATE_MUSIC_INITIAL,
} from 'constants/index';
import {
  CreateMusicForm,
  CreateMusicValidator,
} from 'schemas';
import { trpc } from 'utils/trpc';
import { postSuccess, postError } from 'utils/res';
import { Generator } from './Generator';
import { FormikHelpers } from 'formik';

export const CreateMusicForms = () => {
  const { mutateAsync } = trpc.useMutation(
    ['music.create'],
    {
      onSuccess: () => {
        postSuccess('music created successfully');
      },
      onError: ({ message }) => {
        postError(message);
      },
    }
  );
  const submit = (
    data: CreateMusicForm,
    {
      setSubmitting,
      resetForm,
    }: FormikHelpers<CreateMusicForm>
  ) => {
    const singers = data.singers.map(({ value }) => {
      return { id: value };
    });
    const genres = data.genres.map(({ value }) => {
      return { id: value };
    });

    mutateAsync({
      title: data.title,
      year: data.year,
      musicLink: data.musicLink,
      length: data.length,
      genres: genres,
      singers: singers,
    }).finally(() => {
      setSubmitting(false);
      resetForm();
    });
  };
  return (
    <Generator
      fields={CREATE_MUSIC_FIELDS}
      initialValues={CREATE_MUSIC_INITIAL}
      submit={submit}
      validator={CreateMusicValidator}
      submitBtn={<span>add music</span>}
    />
  );
};

export const EditMusicForm = ({
  initialValue: val,
  refetch,
}: any) => {
  const initVal = {
    id: val.id,
    title: val.title,
    year: val.year,
    musicLink: val.musicLink,
    singers: val.SingerItem.map(({ singer }: any) => ({
      value: singer.id,
      label: singer.name,
    })),
    genres: val.GenreItem.map(({ genreId }: any) => ({
      value: genreId.id,
      label: genreId.name,
    })),
  };
  const { mutateAsync } = trpc.useMutation(
    ['music.update'],
    {
      onSuccess: () => {
        postSuccess('music successfully updated');
      },
      onError: ({ message }) => {
        postError(message);
      },
    }
  );
  const submit = (
    data: CreateMusicForm,
    {
      setSubmitting,
      resetForm,
    }: FormikHelpers<CreateMusicForm>
  ) => {
    const res = {
      id: val.id,
      ...data,
      singers: data.singers.map(({ value }) => ({
        id: value,
      })),
      genres: data.genres.map(({ value }) => ({
        id: value,
      })),
    };

    mutateAsync(res).finally(() => {
      setSubmitting(false);
      resetForm();
      refetch();
    });
  };
  return (
    <Generator
      validator={CreateMusicValidator}
      fields={CREATE_MUSIC_FIELDS}
      initialValues={initVal}
      submit={submit}
      submitBtn={<span>edit music</span>}
    />
  );
};
