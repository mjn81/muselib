import { useBlurDeactive } from 'hooks';
import {
  PropsWithChildren,
  useRef,
  useState,
  ReactNode,
} from 'react';

type TooltipProps = {
  className?: string;
  options: {
    onClick?: (e: any) => void;
    children: ReactNode;
  }[];
  [inp: string]: any;
} & PropsWithChildren;

export const TooltipDropdown = ({
  children,
  options,
  ...others
}: TooltipProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useBlurDeactive(ref, setOpen);
  return (
    <section
      {...others}
      ref={ref}
      onClick={() => setOpen(!open)}
    >
      {children}
      {open && (
        <div className='relative tool-tip-arrow'>
          <ul className='py-1 text-sm text-white text-center bg-extra_dark_purple absolute left-1/2 w-20 top-2 overflow-hidden rounded-xl -translate-x-1/2'>
            {options.map(({ children, onClick }, index) => (
              <li
                onClick={onClick}
                key={`tooltip_drop_${index}`}
                className=' transition-all capitalize w-full py-1 cursor-pointer hover:bg-slate-700'
              >
                {children}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
