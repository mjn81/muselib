import { PropsWithChildren } from 'react';

export const SimpleBadge = ({
  children,
}: PropsWithChildren<{}>) => {
  return (
    <span className='inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full'>
      {children}
    </span>
  );
};
