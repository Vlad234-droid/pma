import React, { FC, useState } from 'react';
import { Rule } from '@dex-ddl/core';

import InfoIcon from 'components/InfoIcon';

import Sorting from '../Sorting';
import Search from '../Search';
import { SortBy, SortOption } from '../../config/types';

type Props = {
  sortValue?: SortBy;
  onSort: (value: SortBy) => void;
  onSearch: (value: string) => void;
  searchValue: string;
  sortingOptions: SortOption[];
};

const Filters: FC<Props> = ({ sortingOptions, sortValue, onSort, searchValue, onSearch }) => {
  const [sortingOpen, setSortingOpen] = useState<boolean>(false);
  const [searchOpened, setSearchOpened] = useState<boolean>(false);

  const handleSearch = (event) => onSearch(event.target.value);

  const handleSearchOpen = () => {
    setSortingOpen(false);
    setSearchOpened(true);
  };

  const handleSortOpen = () => {
    setSearchOpened(false);
    setSortingOpen((sortingValue) => !sortingValue);
  };

  const handleSort = (value: SortBy) => {
    onSort(value);

    setSortingOpen(false);
  };

  return (
    <>
      <InfoIcon onClick={() => console.log('info clicked')} />
      <Sorting
        iconStyles={iconStyles}
        isOpen={sortingOpen}
        onClick={handleSortOpen}
        onSort={handleSort}
        value={sortValue}
        sortingOptions={sortingOptions}
      />
      <Search
        iconStyles={iconStyles}
        focus={searchOpened}
        onFocus={handleSearchOpen}
        onSearch={handleSearch}
        value={searchValue}
      />
    </>
  );
};

export default Filters;

const iconStyles: Rule = {
  width: '16px',
  height: '16px',
  position: 'relative',
  top: '2px',
  left: '2px',
  marginLeft: '8px',
};
