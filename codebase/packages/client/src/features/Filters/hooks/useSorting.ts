import { useState } from 'react';

import { SortBy } from '../config/types';

const useSorting = (): [SortBy | undefined, (value: SortBy) => void] => {
  const [sortValue, setSortValue] = useState<SortBy>();

  const handleSort = (value: SortBy) => {
    setSortValue(value);
  };

  return [sortValue, handleSort];
};

export default useSorting;
