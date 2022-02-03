import { useRef, useEffect } from 'react';

function usePolling(onFetch, delay) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = onFetch;
  }, [onFetch]);

  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (delay != null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, []);
}

export default usePolling;
