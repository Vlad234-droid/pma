import React, { FC, useState } from 'react';
import { Rule } from '@dex-ddl/core';

import InfoIcon from 'components/InfoIcon';

import Filtering from '../Filtering';
import Search from '../Search';
import Sorting from '../Sorting';
import { SortBy, SortOption, FilterOption, FilterValues } from '../../config/types';

type Props = {
  sortValue?: SortBy;
  onSort?: (value: SortBy) => void;
  sortingOptions?: SortOption[];
  onSearch: (value: string) => void;
  searchValue: string;
  filterOptions?: FilterOption[];
  onFilter?: (filters: FilterValues) => void;
};

const Filters: FC<Props> = ({ sortingOptions, sortValue, onSort, searchValue, onSearch, filterOptions, onFilter }) => {
  const [sortOpen, setSortOpen] = useState<boolean>(false);
  const [searchOpened, setSearchOpen] = useState<boolean>(false);
  const [filterOpened, setFilterOpen] = useState<boolean>(false);

  const handleSearch = (value) => onSearch(value);

  const handleSearchOpen = () => {
    setSortOpen(false);
    setSearchOpen(true);
  };

  const handleSortOpen = () => {
    setSearchOpen(false);
    setSortOpen((sortingValue) => !sortingValue);
  };

  const handleSort = (value: SortBy) => {
    onSort && onSort(value);
    setSortOpen(false);
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  const handleFilter = (filters: any) => {
    onFilter && onFilter(filters);
  };

  return (
    <div data-test-id='filters'>
      <InfoIcon onClick={() => console.log('info clicked')} />
      {sortingOptions && (
        <Sorting
          iconStyles={iconStyles}
          isOpen={sortOpen}
          onClick={handleSortOpen}
          onSort={handleSort}
          value={sortValue}
          sortingOptions={sortingOptions}
        />
      )}
      {filterOptions && (
        <Filtering
          iconStyles={iconStyles}
          isOpen={filterOpened}
          onClick={() => setFilterOpen(true)}
          onClose={handleFilterClose}
          filterOptions={filterOptions}
          onFilter={handleFilter}
        />
      )}
      <Search
        iconStyles={iconStyles}
        focus={searchOpened}
        onFocus={handleSearchOpen}
        onSearch={handleSearch}
        value={searchValue}
      />
    </div>
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
