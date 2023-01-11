import React, { FC, useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CreateRule, Rule, useStyle } from '@pma/dex-wrapper';
import { ColleagueFilterAction, getColleagueFilterSelector } from '@pma/store';
import FilterIcon from 'features/general/Filters/components/FilterIcon';
import { getCurrentYear, getYearsFromCurrentYear, filtersOrder } from 'utils';
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
        <FilterIcon onClick={toggleFilter} />
        <div ref={searchEl}>
          <Search focus={searchOpened} onFocus={handleSearchOpen} onSearch={handleSearch} value={searchValue} />
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
                filters={
                  Object.fromEntries(
                    Object.entries(colleagueFilter).sort(
                      ([a], [b]) => filtersOrder.indexOf(a) - filtersOrder.indexOf(b),
                    ),
                  ) as { [key: string]: Array<{ [key: string]: string }> }
                }
                onSubmit={handleChangeFilterValues}
              >
                {({
                  onCancel: onChildrenCancel,
                  onSubmit: onChildrenSubmit,
                  handleSubmit: handleChildrenSubmit,
                  isValid: isChildrenValid,
                }) => {
                  return (
                    <div className={css(blockStyle, customStyles)}>
                      <div className={css(wrapperButtonStyle)}>
                        <div className={css(buttonsWrapper)}>
                          <Button isDisabled={false} styles={[buttonCancelStyle]} onPress={onChildrenCancel}>
                            Clear filter
                          </Button>
                          <Button
                            //@ts-ignore
                            onPress={handleChildrenSubmit((data) => {
                              updateFilter(data);
                            })}
                            styles={[submitButtonStyle({ isValid: true })]}
                          >
                            Apply filter
                          </Button>
                          <Button
                            //@ts-ignore
                            onPress={onChildrenSubmit}
                            styles={[submitButtonStyle({ isValid: isChildrenValid })]}
                          >
                            Apply & close
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                }}
              </FilterForm>
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

const buttonCancelStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  fontWeight: theme.font.weight.bold,
  width: '33%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b2} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.tescoBlue}`,
});

const customStyles: Rule = ({ theme }) => {
  return {
    background: theme.colors.white,
    borderRadius: '0px 0px 10px 10px',
  };
};

const blockStyle: Rule = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
};

const buttonsWrapper: Rule = () => ({
  padding: '30px 15px 30px 15px',
  display: 'flex',
  justifyContent: 'center',
});

const wrapperButtonStyle: Rule = ({ theme }) => ({
  position: 'relative',
  bottom: theme.spacing.s0,
  left: theme.spacing.s0,
  right: theme.spacing.s0,
  // @ts-ignore
  borderTop: `${theme.border.width.b2} solid ${theme.colors.lightGray}`,
});

const submitButtonStyle: CreateRule<{ isValid: any }> =
  ({ isValid }) =>
  ({ theme }) => ({
    height: '40px',
    ...theme.font.fixed.f16,
    fontWeight: theme.font.weight.bold,
    width: '33%',
    margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
    background: `${theme.colors.tescoBlue}`,
    color: `${theme.colors.white}`,
    padding: '0px 20px',
    borderRadius: `${theme.spacing.s20}`,
    opacity: isValid ? '1' : '0.4',
    pointerEvents: isValid ? 'all' : 'none',
  });

export default Filter;
