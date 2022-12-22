import { useCallback } from 'react';
import debounce from 'lodash.debounce';

export default (handler: (...args: any) => void, delay = 300) => {
  return useCallback(debounce(handler, delay), []);
};
