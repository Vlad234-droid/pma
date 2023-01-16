import React, { FC } from 'react';
import { CreateRule, Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { getListStatistics, getReportMetaSelector, getStatisticsMetaSelector, StatisticsAction } from '@pma/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import { Page } from 'pages';
import { buildPath } from 'features/general/Routes';

import Spinner from 'components/Spinner';
import InfinityScrollLoad from 'components/InfinityScrollLoad';
import ViewColleagueProfile from 'components/ViewColleagueProfile';
import { TFunction, Trans, useTranslation } from 'components/Translation';
import { Table } from 'components/Table';
import { IconButton } from 'components/IconButton';
import { Accordion, BaseAccordion, ExpandButton, Panel, Section } from 'components/Accordion';

import useDispatch from 'hooks/useDispatch';
import useQueryString from 'hooks/useQueryString';
import useDownloadExelFile from 'hooks/useDownloadExelFile';
import { useChartStatistics } from './hooks/useChartStatistics';
import { useDetailsStatistics, useTotalReviews } from './hooks';
import { isSingular, paramsReplacer, filterToRequest, formatDateStringFromISO, getFinancialYear } from 'utils';
import { defaultSort, List } from './config';
import { ReportPage, ReportType, Status } from 'config/enum';

const switchTitles = (titleToSwitch, t: TFunction) => {
  const titles = {
    'not-submitted': t('total_reviews_not_submitted', 'Total reviews not submitted'),
    approved: t('total_reviews_submitted_&_approved_by_manager', 'Total reviews submitted & approved by manager'),
    submitted: t(
      'total_reviews_submitted_approved_and_not_approved',
      'Total reviews submitted (approved and not approved)',
    ),
  };
  return titles[titleToSwitch];
};

const getReviewsTitles = (type): List => {
  const page = {
    [ReportPage.REPORT_APPROVED_OBJECTIVES]: {
      titles: { approved: [] },
    },
    [ReportPage.REPORT_SUBMITTED_OBJECTIVES]: {
      titles: { 'not-submitted': [], submitted: [] },
    },
    [ReportPage.REPORT_MID_YEAR_REVIEW]: {
      titles: { 'not-submitted': [], submitted: [], approved: [] },
    },
    [ReportPage.REPORT_END_YEAR_REVIEW]: {
      titles: { 'not-submitted': [], submitted: [], approved: [] },
    },
    [ReportPage.REPORT_MYR_BREAKDOWN]: {
      titles: { 'New to business': [], 'Below expected': [], Great: [], Outstanding: [], Satisfactory: [] },
    },
    [ReportPage.REPORT_EYR_BREAKDOWN]: {
      titles: { 'New to business': [], 'Below expected': [], Great: [], Outstanding: [], Satisfactory: [] },
    },
    [ReportPage.REPORT_WORK_LEVEL]: {
      titles: { approved: [] },
    },
    [ReportPage.REPORT_NEW_TO_BUSINESS]: {
      titles: { 'new-to-business': [] },
    },
    [ReportPage.REPORT_FEEDBACK]: {
      titles: { given: [], requested: [] },
    },
    [ReportPage.REPORT_ANNIVERSARY_REVIEWS]: {
      titles: { 'not-submitted': [], submitted: [], approved: [] },
    },
  };
  return page[type];
};

const REPORT_URL = 'reports/linked-objective-report/formats/excel';

type Props = {
  type: ReportPage;
  toggleFullView: () => void;
  isFullView: boolean;
  filterValues: Record<string, Record<string, boolean>>;
};

const StatisticsReviews: FC<Props> = ({ type, toggleFullView, isFullView, filterValues }) => {
  const query = useQueryString();
  const { year } = query;
  const { t } = useTranslation();
  const { css } = useStyle();
  const { loading: reportLoading } = useSelector(getReportMetaSelector);
  const list: List = useSelector(getListStatistics);

  const { loading } = useSelector(getStatisticsMetaSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname, search } = useLocation();

  const filters = filterToRequest(filterValues) || {};

  const searchedLoading = useDetailsStatistics(type, filters);
  useChartStatistics(type, filters);
  const reviews = useTotalReviews(type);

  const downloadReport = useDownloadExelFile({
    resource: {
      url: REPORT_URL,
      params: {
        year: year || getFinancialYear(),
        status: Status.APPROVED.toLocaleLowerCase(),
        ...filters,
      },
    },
    fileName: `Objectives Report (${formatDateStringFromISO(new Date().toISOString(), 'dd LLL yyyy HH:mm:ms')})`,
    ext: 'xlsx',
    errorMassage: {
      title: t('statistics_not_found', 'Statistics not found'),
      description: t('try_to_select_another_year', 'Try to select another year.'),
    },
  });

  const handleView = (uuid: string) =>
    navigate(buildPath(paramsReplacer(`${Page.USER_REVIEWS}`, { ':uuid': uuid })), {
      state: {
        backPath: `${pathname}${search}`,
      },
    });

  if (reportLoading || searchedLoading) return <Spinner fullHeight />;

  const isWLPage = type === ReportPage.REPORT_WORK_LEVEL;

  return (
    <div className={css({ width: '100%' })}>
      {type &&
        Object.entries({ ...getReviewsTitles(type).titles, ...list }).map(([title, data]) => {
          const total = reviews?.statistics?.[title]?.count ?? 0;
          const hasMore = (data as any)?.length !== reviews?.statistics?.[title]?.count;

          return (
            <Accordion
              id={`colleague-review-accordion-${title}`}
              key={`${title}`}
              customStyle={{ marginTop: '0px', ...(isWLPage && { border: 'none !important' }) }}
            >
              <BaseAccordion id={`colleague-review-accordion-${title}`}>
                {() => (
                  <Section defaultExpanded={isWLPage}>
                    <div className={css(scrollContainer)}>
                      <div className={css(wrapperStyles({ isWLPage }))}>
                        <span className={css(titleStyles)}>
                          {type === ReportPage.REPORT_MID_YEAR_REVIEW ||
                          type === ReportPage.REPORT_END_YEAR_REVIEW ||
                          type === ReportPage.REPORT_ANNIVERSARY_REVIEWS
                            ? switchTitles(title, t)
                            : t(title)}
                          : {total} {isSingular(total) ? t('colleague', 'Colleague') : t('colleagues', 'Colleagues')}
                        </span>
                        {!!(data as any).length && !isWLPage && (
                          <div className={css(expandButtonStyles)}>
                            <ExpandButton />
                          </div>
                        )}
                        {isWLPage && (
                          <div>
                            <IconButton
                              onPress={downloadReport}
                              graphic='download'
                              customVariantRules={{ default: iconButtonStyles }}
                              iconStyles={iconStyles}
                            >
                              <Trans i18nKey='download'>Download</Trans>
                            </IconButton>
                            <IconButton
                              onPress={toggleFullView}
                              graphic='full'
                              customVariantRules={{ default: iconButtonStyles }}
                              iconStyles={iconStyles}
                              data-test-id={'full-button'}
                            >
                              {!isFullView ? (
                                <Trans i18nKey='full_view'>Full view</Trans>
                              ) : (
                                <Trans i18nKey='show_less'>Show less</Trans>
                              )}
                            </IconButton>
                          </div>
                        )}
                      </div>
                      <Panel>
                        <InfinityScrollLoad
                          loadOnScroll={false}
                          loadMore={(_limit, _start) => {
                            switch (type) {
                              case ReportPage.REPORT_APPROVED_OBJECTIVES: {
                                dispatch(
                                  StatisticsAction.getStatisticsReview({
                                    _limit,
                                    _start,
                                    year,
                                    status: title,
                                    'review-type': ReportType.OBJECTIVE,
                                    ...defaultSort,
                                    ...filters,
                                  }),
                                );
                                break;
                              }
                              case ReportPage.REPORT_SUBMITTED_OBJECTIVES: {
                                dispatch(
                                  StatisticsAction.getStatisticsReview({
                                    year,
                                    _limit,
                                    _start,
                                    status: title,
                                    'review-type': ReportType.OBJECTIVE,
                                    ...defaultSort,
                                    ...filters,
                                  }),
                                );
                                break;
                              }
                              case ReportPage.REPORT_MID_YEAR_REVIEW: {
                                dispatch(
                                  StatisticsAction.getStatisticsReview({
                                    year,
                                    'review-type': ReportType.MYR,
                                    status: title,
                                    _limit,
                                    _start,
                                    ...defaultSort,
                                    ...filters,
                                  }),
                                );
                                break;
                              }
                              case ReportPage.REPORT_END_YEAR_REVIEW: {
                                dispatch(
                                  StatisticsAction.getStatisticsReview({
                                    year,
                                    'review-type': ReportType.EYR,
                                    status: title,
                                    _limit,
                                    _start,
                                    ...defaultSort,
                                    ...filters,
                                  }),
                                );
                                break;
                              }
                              case ReportPage.REPORT_EYR_BREAKDOWN: {
                                dispatch(
                                  StatisticsAction.getOverallRatingsStatistics({
                                    year,
                                    'review-type': ReportType.EYR,
                                    'overall-rating': title,
                                    _limit,
                                    _start,
                                    ...defaultSort,
                                    ...filters,
                                  }),
                                );
                                break;
                              }
                              case ReportPage.REPORT_MYR_BREAKDOWN: {
                                dispatch(
                                  StatisticsAction.getOverallRatingsStatistics({
                                    year,
                                    'review-type': ReportType.MYR,
                                    'overall-rating': title,
                                    _limit,
                                    _start,
                                    ...defaultSort,
                                    ...filters,
                                  }),
                                );
                                break;
                              }
                              case ReportPage.REPORT_NEW_TO_BUSINESS: {
                                dispatch(
                                  StatisticsAction.getNewToBusinessStatistics({
                                    year,
                                    _limit,
                                    _start,
                                    ...defaultSort,
                                    ...filters,
                                  }),
                                );
                                break;
                              }
                              case ReportPage.REPORT_FEEDBACK: {
                                dispatch(
                                  StatisticsAction.getFeedbacksStatistics({
                                    year,
                                    type: title,
                                    _limit,
                                    _start,
                                    ...defaultSort,
                                    ...filters,
                                  }),
                                );
                                break;
                              }
                              case ReportPage.REPORT_ANNIVERSARY_REVIEWS: {
                                dispatch(
                                  StatisticsAction.getAnniversaryReviewsStatistics({
                                    year,
                                    status: title,
                                    _limit,
                                    _start,
                                    ...defaultSort,
                                    ...filters,
                                  }),
                                );
                                break;
                              }
                              case ReportPage.REPORT_WORK_LEVEL: {
                                dispatch(
                                  StatisticsAction.getLeadershipReviewsStatistics({
                                    year,
                                    status: title,
                                    _limit,
                                    _start,
                                    ...defaultSort,
                                    ...filters,
                                  }),
                                );
                                break;
                              }
                            }
                          }}
                          loading={loading}
                          limit={10}
                          hasMore={hasMore}
                          render={() => (
                            <>
                              {!isWLPage ? (
                                <div key={title} className={css({ marginBottom: '24px', width: '100%' })}>
                                  {!!(data as any)?.length &&
                                    (data as any).map((item, i) => (
                                      //@ts-ignore
                                      <div key={`${title}${i}`} className={css(profileStyles)}>
                                        <ViewColleagueProfile colleague={item} onClick={() => handleView(item.uuid)} />
                                      </div>
                                    ))}
                                </div>
                              ) : (
                                <Table
                                  tableTitles={['business_type', 'first_name', 'job_name', 'last_name']}
                                  //@ts-ignore
                                  currentItems={data.map(({ businessType, firstName, jobName, lastName }) => ({
                                    businessType,
                                    firstName,
                                    jobName,
                                    lastName,
                                  }))}
                                />
                              )}
                            </>
                          )}
                        />
                      </Panel>
                    </div>
                  </Section>
                )}
              </BaseAccordion>
            </Accordion>
          );
        })}
    </div>
  );
};
const wrapperStyles: CreateRule<{ isWLPage: boolean }> = ({ isWLPage }) => ({
  padding: isWLPage ? '24px 14px 2px 0px' : '24px 14px 24px 0px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const scrollContainer: Rule = {
  '&:not(:first-child)': {
    marginTop: '20px',
  },
} as Styles;

const iconStyles: Rule = ({ theme }) => ({
  marginRight: theme.spacing.s2_5,
});

const iconButtonStyles: Rule = ({ theme }) => ({
  padding: theme.spacing.s2_5,
  color: theme.colors.tescoBlue,
  fontWeight: 700,
});

const profileStyles: Rule = {
  '&:not(:first-child)': {
    marginTop: '8px',
  },
} as Styles;

const expandButtonStyles: Rule = { paddingLeft: '12px' };

const titleStyles: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: `${theme.font.fixed.f18.fontSize}`,
  display: 'inline-block',
  color: theme.colors.tescoBlue,
});

export default StatisticsReviews;
