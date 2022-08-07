import { EditUserForm } from 'components';
import { FormLayout } from 'layouts';
import { useRouter } from 'next/router';
import React from 'react'
import { trpc } from 'utils/trpc';

const EditUser = () => {
  const id = useRouter().query.id as string;
  const { data } = trpc.useQuery(["user.getById", { id }]);
  
  return (
    <FormLayout title='update user'>
      {data && <EditUserForm id={id} initialValues={{...data , profile: data.profile ?? ""}} />}
    </FormLayout>
  )
}

export default EditUser;