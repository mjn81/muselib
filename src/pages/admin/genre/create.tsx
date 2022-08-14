import { CreateGenreForms } from 'components';
import { FormLayout } from 'layouts';
import React from 'react';

const CreateGenre = () => {
  return (
    <FormLayout title='add genre'>
      <CreateGenreForms />
    </FormLayout>
  );
};

export default CreateGenre;
