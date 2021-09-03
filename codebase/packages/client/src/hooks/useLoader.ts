import { useEffect, useCallback } from 'react';

const useLoader = (el: HTMLElement | null, loader: () => void, loaded: boolean, root?: HTMLElement) => {
  const loadMore = useCallback(loader, []);
  useEffect(() => {
    const options = {
      root: root || null,
      rootMargin: '0px',
      threshold: 0.25,
    };

    // Create observer
    const observer = new IntersectionObserver(loadMore, options);

    if (el && !loaded) {
      observer.observe(el);
    }
    //@ts-ignore
    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [el, loaded]);
};

export default useLoader;
