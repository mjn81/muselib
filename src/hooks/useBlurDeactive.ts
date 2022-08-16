import { useEffect } from 'react';

export const useBlurDeactive = (
  ref?: any,
  action?: Function
) => {
  useEffect(() => {
    function handleClickOutside(
      this: Document,
      event: any
    ) {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        action && action();
      }
    }
    document.addEventListener(
      'mousedown',
      handleClickOutside
    );
    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, [ref]);
};
