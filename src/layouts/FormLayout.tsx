import { Card } from 'components';
import { PropsWithChildren } from 'react';

import { AppLayout } from './AppLayout';

type Props = {
  title: string;
} & PropsWithChildren;

export const FormLayout = ({ title, children }: Props) => {
  return (
    <AppLayout title={title}>
      <Card className='w-3/4 mx-auto shadow-2xl px-6 rounded-2xl mt-4'>
        {children}
      </Card>
    </AppLayout>
  );
};
