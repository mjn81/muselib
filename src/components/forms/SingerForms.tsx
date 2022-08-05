import {
  CREATE_SINGER_INITIAL,
  SINGER_FIELDS,
} from "constants/index";
import { FormikHelpers } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { CreateSingerForm, CreateSingerInput } from "schemas";
import { postError, postSuccess } from "utils/res";
import { trpc } from "utils/trpc";
import { Generator } from "./Generator";

export const CreateSingerForms = () => {
  const { mutateAsync } = trpc.useMutation(["singer.create"], {
    onSuccess: () => {
      postSuccess("singer created");
    },
    onError: ({ message }) => {
      postError(message);

    }
  });

   const submit = (
     data: CreateSingerForm,
     {
       setSubmitting,
       resetForm,
     }: FormikHelpers<CreateSingerForm>
   ) => {
     mutateAsync(data).finally(() => {
       setSubmitting(false);
       resetForm();
     });
   };

  return (
    <Generator
      fields={SINGER_FIELDS}
      initialValues={CREATE_SINGER_INITIAL}
      submit={submit}
      validator={CreateSingerInput}
      submitBtn={<p>create singer</p>}
    />
  );
};

export const EditSingerForm = ({ initialValues,id }: {initialValues: any , id: string}) => {
  const router = useRouter();
  const { mutateAsync } = trpc.useMutation(
    ["singer.update"],
    {
      onSuccess: () => {
        postSuccess("singer updated");
        router.push("/admin/singer");
      },
      onError: ({ message }) => {
        postError(message);
      },
    }
  );
  const submit = (
    data: CreateSingerForm,
    {
      setSubmitting,
      resetForm,
    }: FormikHelpers<CreateSingerForm>
  ) => {
    mutateAsync({ id: id, name: data.name }).finally(() => {
      setSubmitting(false);
      resetForm();
    });
  };
  return (
    <div>
      <Generator
        fields={SINGER_FIELDS}
        initialValues={initialValues}
        submit={submit}
        validator={CreateSingerInput}
        submitBtn={<p>update singer</p>}
      />
    </div>
  );
};
