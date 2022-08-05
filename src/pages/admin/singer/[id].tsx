import { FormLayout } from 'layouts'
import { useRouter } from 'next/router';
import React from 'react'
import { trpc } from 'utils/trpc';

const EditSinger = () => {
  const id = useRouter().query.id as string;
  const { data } = trpc.useQuery(['singer.getById', { id }]);
  return (
    <FormLayout title='update singer'>EditSinger</FormLayout>
  )
}

export default EditSinger