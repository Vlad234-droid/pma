import { useState } from 'react';

import { SortBy } from '../config/types';

const useSortFilter = (): [SortBy | undefined, (value: SortBy) => void] => {
  const [sortValue, setSortValue] = useState<SortBy>();

  const handleSort = (value: SortBy) => {
    setSortValue(value);
  };

  return [sortValue, handleSort];
};

export default useSortFilter;
