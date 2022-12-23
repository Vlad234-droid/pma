import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { ColleagueFilterAction, getColleagueFilterSelector } from '@pma/store';

import FilterIcon from 'features/general/Filters/components/FilterIcon';
import { getCurrentYear, getYearsFromCurrentYear } from 'utils';
import useClickOutside from 'hooks/useClickOutside';
import { Option, Select } from 'components/Form';
import Search from 'features/general/Filters/components/Search';
import FilterForm from 'components/FilterForm';
import UnderlayModal from 'components/UnderlayModal';
import { filterToRequest } from 'features/general/CreateUpdateCalibrationSession/utils';
import useDebounce from 'hooks/useDebounce';

type WithDateProps = {
  withDateFilter: boolean;
  period: string;
  onChangePeriod: (value: string) => void;
  onChangeFilters: (value: Record<string, Record<string, boolean>>) => void;
  onSearch: (search: string) => void;
};

type Props = WithDateProps;

const Filter: FC<Props> = ({ withDateFilter, onChangePeriod, period, onChangeFilters, onSearch }) => {
  const [searchOpened, setSearchOpen] = useState<boolean>(false);
  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filterValues, setFilterValues] = useState<Record<string, Record<string, boolean>>>({});
  const searchEl = useRef(null);
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const dispatch = useDispatch();
  const colleagueFilter = useSelector(getColleagueFilterSelector) || {};

  const fieldOptions: Option[] = getYearsFromCurrentYear(getCurrentYear()).map(({ value }) => ({
    value,
    label: `${value} - ${Number(value) + 1}`,
  }));

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleChangeFilterValues = (values: Record<string, Record<string, boolean>>) => {
    onChangeFilters(values);
    setFilterValues(values);
    setFilterOpen(false);
  };

  const toggleFilter = () => setFilterOpen((isOpen) => !isOpen);

  const search = useDebounce(onSearch);

  useEffect(() => {
    dispatch(ColleagueFilterAction.getColleagueFilter({}));
  }, []);

  useEffect(() => {
    search(searchValue);
  }, [searchValue]);

  const updateFilter = useCallback((data) => {
    dispatch(ColleagueFilterAction.getColleagueFilter(filterToRequest(data)));
  }, []);

  useClickOutside(searchEl, handleSearchClose);

  return (
    <div className={css(headStyle({ mobileScreen }))}>
      <div>
        {withDateFilter && onChangePeriod && (
          <Select
            options={fieldOptions}
            name={'targetType'}
            placeholder={''}
            value={period}
            onChange={({ target: { value } }) => onChangePeriod(value)}
            customStyles={selectStyle}
          />
        )}
      </div>
      <div className={css(filtersStyle)}>
        <FilterIcon iconStyles={iconStyles} onClick={toggleFilter} />
        <div ref={searchEl}>
          <Search
            iconStyles={iconStyles}
            focus={searchOpened}
            onFocus={handleSearchOpen}
            onSearch={handleSearch}
            value={searchValue}
          />
        </div>
        {isFilterOpen && (
          <UnderlayModal onClose={() => setFilterOpen(false)} styles={{ maxWidth: !mobileScreen ? '500px' : '100%' }}>
            {() => (
              <FilterForm
                defaultValues={filterValues}
                onCancel={() => {
                  updateFilter({});
                  handleChangeFilterValues({});
                }}
                filters={colleagueFilter as { [key: string]: Array<{ [key: string]: string }> }}
                onSubmit={handleChangeFilterValues}
                onUpdate={updateFilter}
              />
            )}
          </UnderlayModal>
        )}
      </div>
    </div>
  );
};

const headStyle: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '20px',
  paddingBottom: '20px',
  ...(mobileScreen && {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '10px',
  }),
});

const selectStyle: Rule = { minWidth: '350px' };
const filtersStyle: Rule = {
  display: 'flex',
  alignItems: 'center',
};

const iconStyles: Rule = {
  width: '16px',
  height: '16px',
  position: 'relative',
  top: '2px',
  left: '2px',
};

export default Filter;
