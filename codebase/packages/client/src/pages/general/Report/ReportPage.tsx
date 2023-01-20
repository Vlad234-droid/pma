import React, { FC, useState, useMemo, useEffect, useCallback } from 'react';
import { Button, CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { ColleagueFilterAction, getColleagueFilterSelector, totalColleaguesSelector } from '@pma/store';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { ReportModal } from 'features/general/Report/Modals';
import { FilterOption } from 'features/general/Shared';
import { buildPath } from 'features/general/Routes';
import { Trans, useTranslation } from 'components/Translation';
import { ColleaguesCount } from 'components/ColleaguesCount';
import { HoverContainer } from 'components/HoverContainer';
import { HoverMessage } from 'components/HoverMessage';
import UnderlayModal from 'components/UnderlayModal';
import { IconButton } from 'components/IconButton';
import FilterForm from 'components/FilterForm';
import ViewItems from 'components/ViewItems';
import { Option, Select } from 'components/Form';

import { getDepthByYears, getFinancialYear, getYearsFromCurrentYear } from 'utils/date';
import { useTenant } from 'features/general/Permission';
import useDispatch from 'hooks/useDispatch';

import { Page } from 'pages';
import isEmpty from 'lodash.isempty';
import omit from 'lodash.omit';
import { filterToRequest, filtersOrder } from 'utils';

export enum ModalStatus {
  EDIT = 'EDIT',
}

const ReportPage: FC = () => {
  const { t } = useTranslation();
  const tenant = useTenant();
  const { state } = useLocation();
  const { filters } = (state as any) || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const year = searchParams.get('year') || getFinancialYear();
  const { css, matchMedia } = useStyle();
  const small = matchMedia({ xSmall: true, small: true }) || false;
  const mediumScreen = matchMedia({ xSmall: true, small: true, medium: true }) || false;
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const [focus, setFocus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchValueFilterOption, setSearchValueFilterOption] = useState('');
  const [isFilterOpen, setFilterOpen] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<Record<string, Record<string, boolean>>>(filters || {});

  const [tiles, setTiles] = useState<Array<string>>([] || null);

  const reportingFilters = useSelector(getColleagueFilterSelector) || {};
  const totalColleagues = useSelector(totalColleaguesSelector) ?? 0;

  useEffect(() => {
    dispatch(
      ColleagueFilterAction.getReportingFilters({
        year,
        ...(!isEmpty(filterValues) ? filterToRequest(filterValues) : {}),
      }),
    );
  }, [filterValues, year]);

  const changeYearHandler = (value) => {
    if (!value) return;
    setSearchParams({ year: value });
  };

  const Report = useMemo(
    () => React.lazy(() => import(`features/${tenant}/Report`).then((module) => ({ default: module.default }))),
    [],
  );

  const appliedFilters = useMemo(() => {
    return (
      filterValues &&
      //@ts-ignore
      (Object.entries(filterValues).reduce((acc, [key, value]) => {
        //@ts-ignore
        if (Object.values(value).some((checked) => checked)) return [...acc, key];
        return acc;
      }, []) as Array<string>)
    );
  }, [filterValues]);

  const updateFilter = useCallback((data) => {
    dispatch(ColleagueFilterAction.getReportingFilters({ ...filterToRequest(data), year }));
  }, []);

  const handleChangeFilterValues = (values: Record<string, Record<string, boolean>>) => {
    setFilterValues(values);
    setFilterOpen(false);
  };

  const fieldOptions: Option[] = getYearsFromCurrentYear(getFinancialYear(), getDepthByYears()).map(({ value }) => ({
    value,
    label: `${value} - ${Number(value) + 1}`,
  }));

  return (
    <div className={css({ margin: '22px 42px 110px 40px' })}>
      {!isEmpty(filterValues) && (
        <ViewItems onDelete={(item) => setFilterValues((prev) => omit({ ...prev }, item))} items={appliedFilters} />
      )}
      <div className={css(spaceBetween({ mediumScreen }))}>
        <div className={css(downloadWrapperStyle)}>
          <form>
            <h2 className={css(yearLabel)}>
              <Trans i18nKey='select_financial_year'>Select financial year</Trans>
            </h2>

            <Select
              options={fieldOptions}
              name={'year_options'}
              placeholder={t('choose_an_area', 'Choose an area')}
              onChange={({ target: { value } }) => {
                changeYearHandler(value);
              }}
              value={year}
            />
          </form>
          <ColleaguesCount
            count={totalColleagues}
            countStyles={countStyles}
            title={t('total_unique_colleagues', 'Total unique colleagues')}
          />
        </div>
        <div className={css(flexCenterStyled)}>
          <HoverContainer
            isActive={!small}
            message={
              <HoverMessage
                text={t(
                  'this_report_will_show_you_high_level_information',
                  'This report will show you high level information for your population regarding their performance cycle. Please filter and edit the page to show the most relevant information for your population',
                )}
                customStyles={hoverContainer}
              />
            }
          >
            <IconButton graphic='information' iconStyles={iconStyle} />
          </HoverContainer>

          <FilterOption
            focus={focus}
            customIcon={true}
            searchValue={searchValueFilterOption}
            onFocus={setFocus}
            withIcon={false}
            customStyles={{
              ...(focus ? { padding: '10px 20px 10px 16px' } : { padding: '0px' }),
              ...(focus ? { borderRadius: '50px' } : { transitionDelay: '.3s' }),
            }}
            onChange={(e) => setSearchValueFilterOption(() => e.target.value)}
            onSettingsPress={() => {
              setFilterOpen((prev) => !prev);
              setFocus(false);
            }}
            setSearchValueFilterOption={setSearchValueFilterOption}
            isDisabledSearch={false}
            isVisibleEdit={true}
            onEditPress={() => setShowModal(true)}
          />

          {isFilterOpen && (
            <UnderlayModal onClose={() => setFilterOpen(false)} styles={{ maxWidth: !mobileScreen ? '500px' : '100%' }}>
              {() => (
                <FilterForm
                  defaultValues={filterValues}
                  onCancel={() => {
                    updateFilter({});
                    handleChangeFilterValues({});
                  }}
                  onUpdate={updateFilter}
                  filters={
                    Object.fromEntries(
                      Object.entries(reportingFilters).sort(
                        ([a], [b]) => filtersOrder.indexOf(a) - filtersOrder.indexOf(b),
                      ),
                    ) as { [key: string]: Array<{ [key: string]: string }> }
                  }
                  onSubmit={handleChangeFilterValues}
                >
                  {({ onCancel: onChildrenCancel, onSubmit: onChildrenSubmit, isValid: isChildrenValid }) => {
                    return (
                      <div className={css(blockStyle, customStyles)}>
                        <div className={css(wrapperButtonStyle)}>
                          <div className={css(buttonsWrapper)}>
                            <Button isDisabled={false} styles={[buttonCancelStyle]} onPress={onChildrenCancel}>
                              Clear filter
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

          <IconButton
            graphic='download'
            customVariantRules={{
              default: iconBtnStyle as Rule,
            }}
            iconStyles={iconDownloadStyle}
            onPress={() => navigate(buildPath(Page.REPORT_DOWNLOAD), { state: { filters: filterValues } })}
          />
        </div>
      </div>
      <Report year={year} tiles={tiles} savedFilters={filterValues} />
      {showModal && (
        <ReportModal
          tiles={tiles}
          onClose={(selectedCheckboxes = []) => {
            if (selectedCheckboxes.length) {
              setTiles(selectedCheckboxes.map((item) => item.label));
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

const iconDownloadStyle: Rule = () => ({
  height: '22px',
  position: 'relative',
});

const blockStyle: Rule = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
};

const countStyles: Rule = ({ theme }) => ({
  position: 'absolute',
  bottom: '-30px',
  left: 0,
  fontWeight: theme.font.weight.regular,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  color: theme.colors.base,
  whiteSpace: 'nowrap',
});
const downloadWrapperStyle: Rule = {
  display: 'flex',
  flexDirection: 'column',
  width: '40%',
  flexBasis: '202px',
  marginBottom: '29px',
  position: 'relative',
} as Styles;

const customStyles: Rule = ({ theme }) => {
  return {
    background: theme.colors.white,
    borderRadius: '0px 0px 10px 10px',
  };
};

const iconBtnStyle: Rule = ({ theme }) => ({
  padding: '0',
  marginLeft: '5px',
  display: 'flex',
  height: '38px',
  width: '38px',
  justifyContent: 'center',
  alignItems: 'center',
  outline: 0,
  border: `2px solid ${theme.colors.tescoBlue}`,
  borderRadius: '20px',
  cursor: 'pointer',
  position: 'relative',
  '& > span': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const flexCenterStyled: Rule = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'space-between',
  margin: '20px 0px',
};

const buttonCancelStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  fontWeight: theme.font.weight.bold,
  width: '100%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b2} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.tescoBlue}`,
});
const spaceBetween: CreateRule<{ mediumScreen: boolean }> = ({ mediumScreen }) => {
  return {
    display: 'flex',
    flexWrap: mediumScreen ? 'wrap' : 'nowrap',
    // ...(mediumScreen && { flexBasis: '250px' }),
    // Todo replace it in future due to applied filters
    // justifyContent: quantity ? 'space-between' : 'flex-end',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
};

const iconStyle: Rule = ({ theme }) => ({
  marginRight: theme.spacing.s2_5,
  marginTop: '5px',
});

const yearLabel: Rule = ({ theme }) => ({
  margin: `${theme.spacing.s0} ${theme.spacing.s0} 8px ${theme.spacing.s0}`,
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.fixed.f16.fontSize,
  lineHeight: theme.font.fixed.f16.lineHeight,
  color: theme.colors.link,
});

const hoverContainer: Rule = () => ({
  position: 'absolute',
  bottom: '-8px',
  left: '50%',
  transform: 'translate(-95%, 100%)',
});

const buttonsWrapper: Rule = () => ({
  padding: '30px 15px 30px 15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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
    width: '100%',
    margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
    background: `${theme.colors.tescoBlue}`,
    color: `${theme.colors.white}`,
    padding: '0px 20px',
    borderRadius: `${theme.spacing.s20}`,
    opacity: isValid ? '1' : '0.4',
    pointerEvents: isValid ? 'all' : 'none',
  });

export default ReportPage;
