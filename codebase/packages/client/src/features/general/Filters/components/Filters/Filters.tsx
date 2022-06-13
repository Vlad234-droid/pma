import React, { FC, useState } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';

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
  const { css } = useStyle();
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

  return (
    <div className={css(wrapperStyles)} data-test-id='filters'>
      <div className={css(iconWrapperStyles)}>
        <InfoIcon onClick={() => console.log('info clicked')} />
      </div>
      {sortingOptions && (
        <Sorting
          iconStyles={iconStyles}
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
          iconStyles={iconStyles}
          isOpen={filterOpened}
          onClick={handleFilterOpen}
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

const wrapperStyles: Rule = {
  display: 'flex',
  alignItems: 'center',
};

const iconWrapperStyles: Rule = { height: '24px', display: 'flex' };

const iconStyles: Rule = {
  width: '16px',
  height: '16px',
  position: 'relative',
  top: '2px',
  left: '2px',
};
