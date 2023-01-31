import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, CreateRule, IconButton as BackButton, Rule, useStyle } from '@pma/dex-wrapper';
import {
  ColleagueFilterAction,
  getColleagueFilterSelector,
  getTotalReviewsByType,
  ReportPage,
  StatisticsAction,
} from '@pma/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UnderlayModal from 'components/UnderlayModal';
import { useTranslation } from 'components/Translation';
import { ColleaguesCount } from 'components/ColleaguesCount';
import FilterForm from 'components/FilterForm';
import ViewItems from 'components/ViewItems';

import { ColleaguesStatistics } from 'features/general/Report/widgets';
import { convertToReportEnum } from 'features/general/ColleaguesReviews/utils';
import StatisticsReviews from 'features/general/ColleaguesReviews';
import { FilterOption } from 'features/general/Shared';
import { buildPath } from 'features/general/Routes';
import { useTileStatistics } from 'features/general/ColleaguesReviews/hooks/useTileStatistics';

import useQueryString from 'hooks/useQueryString';
import { useHeaderContainer } from 'contexts/headerContext';

import isEmpty from 'lodash.isempty';
import omit from 'lodash.omit';
import useDispatch from 'hooks/useDispatch';
import { Page } from 'pages';
import { ReportType } from 'config/enum';
import { filtersOrder, getFinancialYear, filterToRequest } from 'utils';

const getConfigReviewsKeys = (type): { key: string; configType: ReportType } => {
  const page = {
    [ReportPage.REPORT_APPROVED_OBJECTIVES]: {
      key: 'review',
      configType: ReportType.OBJECTIVE,
    },
    [ReportPage.REPORT_SUBMITTED_OBJECTIVES]: {
      key: 'review',
      configType: ReportType.OBJECTIVE,
    },
    [ReportPage.REPORT_MID_YEAR_REVIEW]: {
      key: 'review',
      configType: ReportType.MYR,
    },
    [ReportPage.REPORT_END_YEAR_REVIEW]: {
      key: 'review',
      configType: ReportType.EYR,
    },
    [ReportPage.REPORT_MYR_BREAKDOWN]: {
      key: 'overallRatings',
      configType: ReportType.MYR,
    },
    [ReportPage.REPORT_EYR_BREAKDOWN]: {
      key: 'overallRatings',
      configType: ReportType.EYR,
    },
    [ReportPage.REPORT_WORK_LEVEL]: {
      key: 'leadershipReviews',
      configType: ReportType.OBJECTIVE,
    },
    [ReportPage.REPORT_NEW_TO_BUSINESS]: {
      key: 'newToBusiness',
      configType: ReportType.NTB,
    },
    [ReportPage.REPORT_FEEDBACK]: {
      key: 'feedbacks',
      configType: ReportType.FEEDBACK,
    },
    [ReportPage.REPORT_ANNIVERSARY_REVIEWS]: {
      key: 'anniversaryReviews',
      configType: ReportType.EYR,
    },
  };
  return page[type];
};

const defineHeaderTitle = (type, t) => {
  const tilePage = Page.REPORT_STATISTICS;
  const titles = {
    [ReportPage.REPORT_APPROVED_OBJECTIVES]: {
      [tilePage]: t('objectives_approved', 'Objectives approved'),
    },
    [ReportPage.REPORT_SUBMITTED_OBJECTIVES]: {
      [tilePage]: t('objectives_submitted', 'Objectives submitted'),
    },
    [ReportPage.REPORT_MID_YEAR_REVIEW]: {
      [tilePage]: t('mid_year_review', 'Mid-year review'),
    },
    [ReportPage.REPORT_END_YEAR_REVIEW]: {
      [tilePage]: t('end_year_review', 'End year review'),
    },
    [ReportPage.REPORT_WORK_LEVEL]: {
      [tilePage]: t('WL4_and_5', 'WL4 & 5 Objectives submitted'),
    },
    [ReportPage.REPORT_NEW_TO_BUSINESS]: {
      [tilePage]: t('new_to_business', 'New to business'),
    },
    [ReportPage.REPORT_FEEDBACK]: {
      [tilePage]: t('everyday_feedback', 'Everyday Feedback'),
    },
    [ReportPage.REPORT_EYR_BREAKDOWN]: {
      [tilePage]: t('eyr_breakdown', 'Breakdown of Year-end review'),
    },
    [ReportPage.REPORT_MYR_BREAKDOWN]: {
      [tilePage]: t('myr_breakdown', 'Breakdown of approved Mid-year review'),
    },
    [ReportPage.REPORT_ANNIVERSARY_REVIEWS]: {
      [tilePage]: t('anniversary_reviews', 'Anniversary Reviews completed per quarterTileRport'),
    },
  };
  return titles[type];
};

const ReportStatistics = () => {
  const { css, matchMedia } = useStyle();
  const { t } = useTranslation();
  const { pathname, state } = useLocation();
  const dispatch = useDispatch();
  const { filters } = (state as any) || {};

  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const query = useQueryString() as Record<string, string>;
  const { year } = query;
  const navigate = useNavigate();
  const [focus, setFocus] = useState(false);
  const [searchedValue, setSearchedValue] = useState<string>('');
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [isFullView, toggleFullView] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<any>(filters || {});

  const { setLinkTitle } = useHeaderContainer();
  const { type } = useTileStatistics();

  useEffect(() => {
    if (!Object.entries(query).length || !year) navigate(buildPath(Page.REPORT));
  }, [query]);

  useEffect(() => {
    dispatch(
      ColleagueFilterAction.getReportingFilters({
        year,
        ...(!isEmpty(filterValues) ? filterToRequest(filterValues) : {}),
      }),
    );
  }, [JSON.stringify(filterValues)]);

  useEffect(() => {
    setLinkTitle(defineHeaderTitle(convertToReportEnum(pathname), t));
  }, []);

  const updateFilter = useCallback((data) => {
    dispatch(ColleagueFilterAction.getReportingFilters({ ...filterToRequest(data), year }));
  }, []);

  const handleChangeFilterValues = (values: Record<string, Record<string, boolean>>) => setFilterValues(values);

  const appliedFilters: Array<string> = useMemo(() => {
    return (
      filterValues &&
      //@ts-ignore
      Object.entries(filterValues).reduce((acc, [key, value]) => {
        //@ts-ignore
        if (Object.values(value).some((checked) => checked)) return [...acc, key];
        return acc;
      }, [])
    );
  }, [filterValues]);

  const totalCount: number = useSelector(getTotalReviewsByType(getConfigReviewsKeys(type))) || 0;
  const reportingFilters = useSelector(getColleagueFilterSelector) || {};

  return (
    <div className={css({ position: 'relative' })}>
      <div className={css(arrowLeftStyle)}>
        <BackButton
          testId={'test-back-button'}
          onPress={() => {
            navigate(
              {
                pathname: buildPath(Page.REPORT),
                //@ts-ignore
                search: new URLSearchParams({ year: year || getFinancialYear() }).toString(),
              },
              { state: { filters: filterValues } },
            );
          }}
          graphic='backwardLink'
        />
      </div>
      {!isEmpty(filterValues) && (
        <ViewItems onDelete={(item) => setFilterValues((prev) => omit({ ...prev }, item))} items={appliedFilters} />
      )}
      {type !== ReportPage.REPORT_NEW_TO_BUSINESS && (
        <ColleaguesCount
          countStyles={countStyles}
          count={totalCount}
          title={t('total_unique_colleagues', 'Total unique colleagues')}
        />
      )}

      <div className={css(header({ mobileScreen }))}>
        <div className={css(flexCenterStyled)}>
          <FilterOption
            testSettingsId='filter-options-id'
            focus={focus}
            customIcon={true}
            searchValue={searchedValue}
            onFocus={setFocus}
            withIcon={false}
            customStyles={{
              ...(focus ? { padding: '10px 20px 10px 16px' } : { padding: '0px' }),
              ...(focus ? { borderRadius: '50px' } : { transitionDelay: '.3s' }),
            }}
            onChange={(e) => setSearchedValue(() => e.target.value)}
            onSettingsPress={() => {
              setFilterOpen((prev) => !prev);
              setFocus(false);
            }}
            setSearchValueFilterOption={setSearchedValue}
          />
          {isFilterOpen && (
            <UnderlayModal onClose={() => setFilterOpen(false)} styles={{ maxWidth: !mobileScreen ? '500px' : '100%' }}>
              {({ onClose }) => (
                <FilterForm
                  defaultValues={filterValues}
                  onCancel={() => {
                    onClose();
                    setTimeout(() => {
                      updateFilter({});
                      handleChangeFilterValues({});
                    }, 300);
                  }}
                  filters={
                    Object.fromEntries(
                      Object.entries(reportingFilters).sort(
                        ([a], [b]) => filtersOrder.indexOf(a) - filtersOrder.indexOf(b),
                      ),
                    ) as { [key: string]: Array<{ [key: string]: string }> }
                  }
                  onSubmit={(data) => {
                    onClose();
                    setTimeout(() => {
                      dispatch(StatisticsAction.clearStatistics());
                      handleChangeFilterValues(data);
                    }, 300);
                  }}
                >
                  {({
                    onCancel: onChildrenCancel,
                    onSubmit: onChildrenSubmit,
                    isValid: isChildrenValid,
                    values: data,
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
                              onPress={() => {
                                dispatch(StatisticsAction.clearStatistics());
                                handleChangeFilterValues(data);
                              }}
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
      <div data-test-id={'test-pie-chart'} className={css(wrapperStyle)}>
        <div data-test-id={'content-id'} className={css(leftColumn)}>
          {type && (
            <StatisticsReviews
              type={type}
              filterValues={filterValues}
              isFullView={isFullView}
              toggleFullView={() => toggleFullView((prev) => !prev)}
            />
          )}
        </div>
        {!isFullView && (
          <div data-test-id={'full-view'} className={css(rightColumn)}>
            {type && <ColleaguesStatistics type={type} />}
          </div>
        )}
      </div>
    </div>
  );
};

const buttonsWrapper: Rule = () => ({
  padding: '30px 15px 30px 15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const buttonCancelStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  fontWeight: theme.font.weight.bold,
  width: '100%',
  margin: `${theme.spacing.s0} ${theme.spacing.s0_5}`,
  background: theme.colors.white,
  border: `${theme.border.width.b2} solid ${theme.colors.tescoBlue}`,
  color: `${theme.colors.tescoBlue}`,
});

const wrapperButtonStyle: Rule = ({ theme }) => ({
  position: 'relative',
  bottom: theme.spacing.s0,
  left: theme.spacing.s0,
  right: theme.spacing.s0,
  // @ts-ignore
  borderTop: `${theme.border.width.b2} solid ${theme.colors.lightGray}`,
});
const blockStyle: Rule = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
};

const customStyles: Rule = ({ theme }) => {
  return {
    background: theme.colors.white,
    borderRadius: '0px 0px 10px 10px',
  };
};

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
const arrowLeftStyle: Rule = ({ theme }) => {
  return {
    position: 'fixed',
    top: '34px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    left: theme.spacing.s4,
    zIndex: '2',
  };
};

const countStyles: CreateRule<{ isFiltersApplied: boolean }> =
  ({ isFiltersApplied }) =>
  ({ theme }) => ({
    position: 'absolute',
    top: isFiltersApplied ? '65px' : '27px',
    left: '5px',
    transform: 'translateY(-50%)',
    fontWeight: theme.font.weight.regular,
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f16.lineHeight,
    color: theme.colors.base,
  });

const wrapperStyle: Rule = ({ theme }) => {
  return {
    display: 'flex',
    gap: theme.spacing.s2,
    flexWrap: 'wrap-reverse',
    marginTop: theme.spacing.s2,
  };
};

const rightColumn: Rule = ({ theme }) => ({
  display: 'flex',
  gap: theme.spacing.s2,
  flex: 4,
  flexBasis: '400px',
  marginTop: '30px',
  alignSelf: 'flex-end',
});

const leftColumn: Rule = ({ theme }) => ({
  display: 'flex',
  gap: theme.spacing.s2,
  flexDirection: 'row',
  flex: 6,
  flexBasis: '550px',
});

const header: CreateRule<{ mobileScreen: boolean }> = ({ mobileScreen }) => ({
  position: 'relative',
  display: 'flex',
  flexWrap: mobileScreen ? 'wrap' : 'nowrap',
  ...(mobileScreen && { flexBasis: '250px' }),
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginTop: '10px',
});

const flexCenterStyled: Rule = {
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'space-between',
};
export default ReportStatistics;
