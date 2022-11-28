import React, { useEffect, useMemo, useState } from 'react';
import { CreateRule, IconButton as BackButton, Rule, useStyle } from '@pma/dex-wrapper';
import { getTotalReviewsByType, ReportPage } from '@pma/store';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UnderlayModal from 'components/UnderlayModal';
import { useTranslation } from 'components/Translation';
import { ColleaguesCount } from 'components/ColleaguesCount';
import FilterForm, { defaultFilters } from 'components/FilterForm';
import ViewItems from 'components/ViewItems';

import { ColleaguesStatistics } from 'features/general/Report/widgets';
import StatisticsReviews from 'features/general/ColleaguesReviews';
import { FilterOption } from 'features/general/Shared';
import { buildPath } from 'features/general/Routes';
import { useTileStatistics } from 'features/general/ColleaguesReviews/hooks/useTileStatistics';

import useQueryString from 'hooks/useQueryString';
import { useHeaderContainer } from 'contexts/headerContext';

import { getCurrentYearWithStartDate } from 'features/general/Report/utils';
import { convertToReportEnum } from 'features/general/ColleaguesReviews/utils';
import { Page } from 'pages';
import { ReportType } from 'config/enum';

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
      [tilePage]: t('myr_breakdown', 'Breakdown of Mid-year review'),
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
  const { filters } = (state as any) || {};
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const query = useQueryString() as Record<string, string>;
  const navigate = useNavigate();
  const [focus, setFocus] = useState(false);
  const [searchedValue, setSearchedValue] = useState<string>('');
  const [isOpenFilter, toggleFilter] = useState(false);
  const [isFullView, toggleFullView] = useState<boolean>(false);
  const [savedFilter, setSavedFilter] = useState<any>(filters);

  const { setLinkTitle } = useHeaderContainer();
  const { type } = useTileStatistics();

  useEffect(() => {
    if (!Object.entries(query).length || !query.year) navigate(buildPath(Page.REPORT));
  }, [query]);

  useEffect(() => {
    setLinkTitle(defineHeaderTitle(convertToReportEnum(pathname), t));
  }, []);

  const appliedFilters = useMemo(() => {
    return (
      savedFilter &&
      //@ts-ignore
      Object.entries(savedFilter).reduce((acc, [key, value]) => {
        //@ts-ignore
        if (Object.values(value).some((checked) => checked)) return [...acc, key];
        return acc;
      }, [])
    );
  }, [savedFilter]);

  const totalCount: number = useSelector(getTotalReviewsByType(getConfigReviewsKeys(type))) || 0;

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
                search: new URLSearchParams({ year: query.year || getCurrentYearWithStartDate() }).toString(),
              },
              { state: { filters: savedFilter } },
            );
          }}
          graphic='backwardLink'
        />
      </div>
      {!!appliedFilters && !!appliedFilters?.length && (
        <ViewItems
          onDelete={(item) =>
            //TODO: dispatch filters without item checkboxes
            setSavedFilter((prev) => {
              const filters = { ...prev };
              delete filters[item];
              return filters;
            })
          }
          items={appliedFilters}
        />
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
              toggleFilter((prev) => !prev);
              setFocus(false);
            }}
            setSearchValueFilterOption={setSearchedValue}
          />
          {isOpenFilter && (
            <UnderlayModal onClose={() => toggleFilter(false)} styles={{ maxWidth: !mobileScreen ? '500px' : '100%' }}>
              {({ onClose }) => (
                <FilterForm
                  defaultValues={savedFilter}
                  onCancel={onClose}
                  filters={defaultFilters}
                  onSubmit={(data) => {
                    onClose();
                    setTimeout(() => setSavedFilter(data), 300);
                  }}
                />
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
