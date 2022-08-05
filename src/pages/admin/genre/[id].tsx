import { FormLayout } from 'layouts'
import { useRouter } from 'next/router'
import React from 'react'

const EditGenre = () => {
  const { query } = useRouter();
  console.log(query.id);
  
  return (
    <FormLayout title='EditGenre'>

    </FormLayout>
  )
}

export default EditGenre