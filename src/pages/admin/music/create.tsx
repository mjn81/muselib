import { CreateMusicForms } from 'components'
import { FormLayout } from 'layouts'
import React from 'react'

const CreateMusic = () => {
  return (
    <FormLayout title="add music">
      <CreateMusicForms />    
    </FormLayout>
  )
}

export default CreateMusic