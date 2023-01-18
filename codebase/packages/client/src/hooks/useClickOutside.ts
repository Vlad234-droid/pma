import { MouseEvent, RefObject, useCallback } from 'react';
import useEventListener from 'hooks/useEventListener';

export default (ref: RefObject<any>, handler: () => void, event: keyof WindowEventMap = 'click') => {
  const handleClickOutside = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      const element = event?.target as HTMLElement;
      if (ref.current && !ref.current.contains(element)) {
        handler();
      }
    },
    [ref],
  );

  useEventListener(event, handleClickOutside);
};
