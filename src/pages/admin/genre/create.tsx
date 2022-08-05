import { CreateGenreForms } from 'components'
import { FormLayout } from 'layouts'
import React from 'react'

const CreateGenre = () => {
  return (
    <FormLayout title='create genre'>
      <CreateGenreForms />
    </FormLayout>
  )
}

export default CreateGenre