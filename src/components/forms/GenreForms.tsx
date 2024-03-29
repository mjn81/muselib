import {
  CREATE_GENRE_INITIAL,
  GENRE_FIELDS,
} from 'constants/index';
import { FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { CreateGenreForm, CreateGenreInput } from 'schemas';
import { postError, postSuccess } from 'utils/res';
import { trpc } from 'utils/trpc';
import { Generator } from './Generator';

export const CreateGenreForms = () => {
  const { mutateAsync } = trpc.useMutation(
    ['genre.create'],
    {
      onSuccess: () => {
        postSuccess('genre created');
      },
      onError: ({ message }) => {
        postError(message);
      },
    }
  );

  const submit = (
    data: CreateGenreForm,
    {
      setSubmitting,
      resetForm,
    }: FormikHelpers<CreateGenreForm>
  ) => {
    mutateAsync(data).finally(() => {
      setSubmitting(false);
      resetForm();
    });
  };

  return (
    <div>
      <Generator
        fields={GENRE_FIELDS}
        initialValues={CREATE_GENRE_INITIAL}
        submit={submit}
        validator={CreateGenreInput}
        submitBtn={<p>create genre</p>}
      />
    </div>
  );
};

export const EditGenreForm = ({
  refetch,
  initialValues,
  id,
}: any) => {
  const router = useRouter();

  const { mutateAsync } = trpc.useMutation(
    ['genre.update'],
    {
      onSuccess: () => {
        postSuccess('genre updated');
        router.push('/admin/genre');
      },
      onError: ({ message }) => {
        postError(message);
      },
    }
  );
  const submit = (
    data: CreateGenreForm,
    {
      setSubmitting,
      resetForm,
    }: FormikHelpers<CreateGenreForm>
  ) => {
    mutateAsync({ id: id, name: data.name }).finally(() => {
      setSubmitting(false);
      resetForm();
      refetch();
    });
  };
  return (
    <div>
      <Generator
        fields={GENRE_FIELDS}
        initialValues={initialValues}
        submit={submit}
        validator={CreateGenreInput}
        submitBtn={<p>update genre</p>}
      />
    </div>
  );
};
