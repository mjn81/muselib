import { EditGenreForm } from 'components';
import { FormLayout } from 'layouts'
import { useRouter } from 'next/router'
import React from 'react'
import { trpc } from 'utils/trpc';

const EditGenre = () => {
  const id  = useRouter().query.id as string;
  const {data} = trpc.useQuery(['genre.getById', {id}]);
  return (
    <FormLayout title='update genre'>
      {data&& <EditGenreForm initialValues={{name: data.name}} />}
    </FormLayout>
  )
}

export default EditGenre