import React, { FC, useRef, useState } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';

import InfoIcon from 'components/InfoIcon';
import useClickOutside from 'hooks/useClickOutside';

import Filtering from './components/Filtering';
import Search from './components/Search';
import Sorting from './components/Sorting';
import { SortBy, SortOption, FilterOption, FilterValues } from './config/types';

type Props = {
  sortValue?: SortBy;
  onSort?: (value: SortBy) => void;
  sortingOptions?: SortOption[];
  onSearch: (value: string) => void;
  searchValue: string;
  filterOptions?: FilterOption[];
  onFilter?: (filters: FilterValues) => void;
  infoIcon?: boolean;
};

const Filters: FC<Props> = ({
  sortingOptions,
  sortValue,
  onSort,
  searchValue,
  onSearch,
  filterOptions,
  onFilter,
  infoIcon = true,
}) => {
  const { css } = useStyle();
  const searchEl = useRef(null);
  const [sortOpen, setSortOpen] = useState<boolean>(false);
  const [searchOpened, setSearchOpen] = useState<boolean>(false);
  const [filterOpened, setFilterOpen] = useState<boolean>(false);

  const handleSearch = (value: string) => {
    onSearch(value);
  };

  const handleSearchOpen = () => {
    setSortOpen(false);
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  const handleSortOpen = () => {
    setSearchOpen(false);
    setSortOpen((sortingValue) => !sortingValue);
  };

  const handleSort = (value: SortBy) => {
    onSort && onSort(value);
    setSortOpen(false);
  };

  const handleFilterOpen = () => {
    setSearchOpen(false);
    setFilterOpen(true);
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  const handleFilter = (filters: any) => {
    onFilter && onFilter(filters);
  };

  useClickOutside(searchEl, handleSearchClose);

  return (
    <div className={css(wrapperStyles)} data-test-id='filters'>
      {infoIcon && (
        <div className={css(iconWrapperStyles)}>
          <InfoIcon onClick={() => console.log('info clicked')} />
        </div>
      )}
      {sortingOptions && (
        <Sorting
          isOpen={sortOpen}
          onClick={handleSortOpen}
          onSort={handleSort}
          value={sortValue}
          sortingOptions={sortingOptions}
          onClose={() => setSortOpen(false)}
        />
      )}
      {filterOptions && (
        <Filtering
          isOpen={filterOpened}
          onClick={handleFilterOpen}
          onClose={handleFilterClose}
          filterOptions={filterOptions}
          onFilter={handleFilter}
        />
      )}
      <div ref={searchEl}>
        <Search focus={searchOpened} onFocus={handleSearchOpen} onSearch={handleSearch} value={searchValue} />
      </div>
    </div>
  );
};

export default Filters;

const wrapperStyles: Rule = {
  display: 'flex',
  alignItems: 'center',
};

const iconWrapperStyles: Rule = { height: '24px', display: 'flex' };
