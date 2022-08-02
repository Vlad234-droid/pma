import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getEmployeesWithReviewStatus } from '@pma/store';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Filters, getEmployeesSortingOptions, SortBy } from 'features/general/Filters';
import { Status } from 'config/enum';
import { useTranslation } from 'components/Translation';

import { SelectAll } from './components/SelectAll';
import { filterApprovedFn } from './utils';
import { RadioGroup } from './components/RadioGroup';

type Props = {
  sortValue: SortBy;
  onChangeSort: (value: SortBy) => void;
  searchValue: string;
  onChangeSearch: (value: string) => void;
  status: Status;
  onChangeStatus: (status: Status) => void;
  isCheckedAll: boolean;
  onChangeCheckedAll: (isSelected: boolean) => void;
};

const ActionsFilters: FC<Props> = ({
  sortValue,
  onChangeSort,
  searchValue,
  onChangeSearch,
  status,
  onChangeStatus,
  isCheckedAll,
  onChangeCheckedAll,
}) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  const options = getEmployeesSortingOptions(t);

  const isWaitingForApproval = status === Status.WAITING_FOR_APPROVAL;
  const colleagues = useSelector((state) => getEmployeesWithReviewStatus(state, status, searchValue, sortValue));

  // disable selectAll, if every colleague has more then one item for approve
  const isDisabled = useMemo(
    () => colleagues.every(({ timeline = [] }) => timeline?.filter(filterApprovedFn)?.length > 1),
    [colleagues],
  );

  return (
    <>
      <div className={css(headStyle)}>
        <div>
          {isWaitingForApproval && (
            <SelectAll
              disabled={isDisabled}
              onChange={(e) => onChangeCheckedAll(e.target.checked)}
              checked={isCheckedAll}
              indeterminate={false}
            />
          )}
        </div>
        <RadioGroup status={status} setStatus={onChangeStatus} />
        <div className={css(filtersStyle)}>
          <Filters
            sortValue={sortValue}
            onSort={onChangeSort}
            searchValue={searchValue}
            onSearch={onChangeSearch}
            sortingOptions={options}
          />
        </div>
      </div>
    </>
  );
};

export default ActionsFilters;

const headStyle: Rule = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px' };

const filtersStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
};
