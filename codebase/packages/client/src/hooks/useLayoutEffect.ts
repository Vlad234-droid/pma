import { useEffect } from 'react';

function useLayoutEffect(isOpen = false, isAvailable = true) {
  // menu-container
  useEffect(() => {
    if (isAvailable) {
      const root: HTMLElement | null = document.querySelector('#root');
      if (isOpen) {
        root?.style?.setProperty('pointer-events', 'none');
      } else if (!isOpen) {
        root?.style?.setProperty('pointer-events', null);
      }
      return () => {
        root?.style?.setProperty('pointer-events', null);
      };
    }
  }, [isOpen, isAvailable]);
}

export default useLayoutEffect;
