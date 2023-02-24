import { useCallback } from 'react';
import debounce from 'lodash.debounce';

export default (handler: (...args: any) => void, deps = [], delay = 300) =>
  useCallback(debounce(handler, delay), [...deps]);
