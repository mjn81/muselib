import { EDIT_USER_FIELDS } from 'constants/index';
import { FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import { ProfileOutput, UpdateUserForm } from 'schemas';
import { postError, postSuccess } from 'utils/res';
import { trpc } from 'utils/trpc';
import { Generator } from './Generator';

export const EditUserForm = ({
  initialValues,
  id,
}: {
  initialValues: any;
  id: string;
}) => {
  const router = useRouter();
  const { mutateAsync } = trpc.useMutation(
    ['user.update'],
    {
      onSuccess: () => {
        postSuccess('user updated');
        router.push('/admin/user');
      },
      onError: ({ message }) => {
        postError(message);
      },
    }
  );
  const submit = (
    data: UpdateUserForm,
    {
      setSubmitting,
      resetForm,
    }: FormikHelpers<UpdateUserForm>
  ) => {
    mutateAsync({ id: id, ...data }).finally(() => {
      setSubmitting(false);
      resetForm();
    });
  };

  return (
    <div>
      <Generator
        fields={EDIT_USER_FIELDS}
        initialValues={initialValues}
        submit={submit}
        validator={ProfileOutput}
        submitBtn={<p>update user</p>}
      />
    </div>
  );
};
