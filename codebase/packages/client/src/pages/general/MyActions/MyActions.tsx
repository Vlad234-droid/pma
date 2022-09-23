import React, { FC, useState } from 'react';
import { useStyle } from '@pma/dex-wrapper';
import MyActions, { ActionsFilters } from 'features/general/MyActions';
import { FilterOption, FilterValues, SortBy, useSearch, useSorting } from 'features/general/Filters';
import { SortOption } from 'features/general/Filters/config/types';
import { ActionStatus } from 'config/enum';

type Props = {
  sortValue?: SortBy;
  onSort?: (value: SortBy) => void;
  sortingOptions?: SortOption[];
  onSearch: (value: string) => void;
  searchValue: string;
  filterOptions?: FilterOption[];
  onFilter?: (filters: FilterValues) => void;
};

const MyActionsPage: FC<Props> = () => {
  const { css } = useStyle();
  // TODO: move states to searchParams
  const [status, setStatus] = useState<ActionStatus>(ActionStatus.PENDING);
  const [sortValue, setSortValue] = useSorting();
  const [searchValue, setSearchValue] = useSearch();
  const [isCheckedAll, toggleCheckedAll] = useState(false);

  return (
    <div className={css({ margin: '8px' })}>
      <ActionsFilters
        sortValue={sortValue}
        onChangeSort={setSortValue}
        searchValue={searchValue}
        onChangeSearch={setSearchValue}
        status={status}
        onChangeStatus={setStatus}
        isCheckedAll={isCheckedAll}
        onChangeCheckedAll={toggleCheckedAll}
      />
      <MyActions status={status} searchValue={searchValue} sortValue={sortValue} isCheckedAll={isCheckedAll} />
    </div>
  );
};

export default MyActionsPage;
