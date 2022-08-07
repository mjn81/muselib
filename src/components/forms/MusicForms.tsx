import {
  CREATE_MUSIC_FIELDS,
  CREATE_MUSIC_INITIAL,
} from "constants/index";
import {
  CreateMusicForm,
  CreateMusicValidator,
} from "schemas";
import { trpc } from "utils/trpc";
import { postSuccess, postError } from "utils/res";
import { Generator } from "./Generator";
import { FormikHelpers } from "formik";

export const CreateMusicForms = () => {
  const { mutateAsync } = trpc.useMutation(
    ["music.create"],
    {
      onSuccess: () => {
        postSuccess("music created successfully");
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
