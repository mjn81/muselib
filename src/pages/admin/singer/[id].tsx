import { EditSingerForm } from 'components';
import { FormLayout } from 'layouts'
import { useRouter } from 'next/router';
import React from 'react'
import { trpc } from 'utils/trpc';

const EditSinger = () => {
  const id = useRouter().query.id as string;
  const { data } = trpc.useQuery(['singer.getById', { id }]);
  console.log(data);
  
  return (
    <FormLayout title='update singer'>
      {data && <EditSingerForm initialValues={{...data}} id={id} />}
    </FormLayout>
  )
}

export default EditSinger