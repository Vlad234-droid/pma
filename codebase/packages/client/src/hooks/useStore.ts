import { useSelector } from 'react-redux';
import get from 'lodash.get';

function useStore<T>(path: (state) => T): T;
function useStore<T>(path: string): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useStore<T>(path: any): T {
  return useSelector((state) => (typeof path === 'string' ? get(state, path) : path(state)));
}

export default useStore;
