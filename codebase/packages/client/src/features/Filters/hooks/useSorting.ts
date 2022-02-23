import { useState } from 'react';

import { SortBy } from '../config/types';

const useSorting = (defaultSorting = SortBy.AZ): [SortBy, (value: SortBy) => void] => {
  const [sortValue, setSortValue] = useState<SortBy>(defaultSorting);

  const handleSort = (value: SortBy) => {
    setSortValue(value);
  };

  return [sortValue, handleSort];
};

export default useSorting;
