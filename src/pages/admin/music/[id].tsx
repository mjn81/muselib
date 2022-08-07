
import { EditMusicForm } from 'components';
import { FormLayout } from 'layouts'
import { useRouter } from 'next/router';
import React from 'react'
import { trpc } from 'utils/trpc';

const EditMusic = () => {
  const id = useRouter().query.id as string;
  
  const { data,refetch } = trpc.useQuery(['music.getById', { id }]);
  
  return (
    <FormLayout title='edit music'>
      {data && <EditMusicForm refetch={refetch} initialValue={data} />}
    </FormLayout>
  )
}

export default EditMusic