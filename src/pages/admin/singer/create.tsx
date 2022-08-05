import { CreateSingerForms } from 'components'
import { FormLayout } from 'layouts'
import React from 'react'

const CreateSinger = () => {
  
  return (
    <FormLayout title='add singer'>
      <CreateSingerForms />
    </FormLayout>
  )
}

export default CreateSinger