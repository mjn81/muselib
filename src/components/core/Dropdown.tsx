import { PropsWithChildren } from 'react';

type TooltipProps = {
  open: boolean;
} & PropsWithChildren;

export const TooltipDropdown = ({
  children,
  open,
}: TooltipProps) => {
  return (
    <>
      {open && (
        <div className='relative tool-tip-arrow'>
          <ul className='py-1 text-white text-center bg-extra_dark_purple absolute left-1/2 w-20 top-2 overflow-hidden rounded-xl -translate-x-1/2'>
            <li className=' transition-all capitalize w-full py-1 cursor-pointer hover:bg-slate-700'>
              item1
            </li>
            <li className=' transition-all capitalize w-full py-1 cursor-pointer hover:bg-slate-700'>
              item1
            </li>
            <li className=' transition-all capitalize w-full py-1 cursor-pointer hover:bg-slate-700'>
              item1
            </li>
            <li className=' transition-all capitalize w-full py-1 cursor-pointer hover:bg-slate-700'>
              item1
            </li>
            <li className=' transition-all capitalize w-full py-1 cursor-pointer hover:bg-slate-700'>
              item1
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
