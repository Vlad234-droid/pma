import React, { FC, useCallback, useMemo } from 'react';
import { getReportByType, getReportMetaSelector } from '@pma/store';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { buildPath, buildPathWithParams } from 'features/general/Routes';
import { CanPerform, role } from 'features/general/Permission';
import { HoverContainer } from 'components/HoverContainer';
import { useTranslation } from 'components/Translation';
import { HoverMessage } from 'components/HoverMessage';
import { TableWidget, ChartWidget } from './widgets';
import { PieChart } from 'components/PieChart';
import InfoTable from 'components/InfoTable';
import Spinner from 'components/Spinner';
import { Page } from 'pages';
import { ReportPage as ReportPageType, ReportType, TitlesReport } from 'config/enum';
import { convertToLink, IsReportTiles, View } from './config';
import { getCurrentYearWithStartDate } from './utils';
import { useReportDataLoader } from './hooks';
import useQueryString from 'hooks/useQueryString';
import { isSingular, paramsReplacer } from 'utils';

export const REPORT_WRAPPER = 'REPORT_WRAPPER';

const Report: FC<{ year: string; tiles: Array<string>; savedFilter: any }> = ({ year, tiles, savedFilter }) => {
  const query = useQueryString() as Record<string, string | number>;
  const { t } = useTranslation();
  const { css, matchMedia } = useStyle();
  const navigate = useNavigate();
  const small = matchMedia({ xSmall: true, small: true }) || false;
  const { loaded } = useSelector(getReportMetaSelector);
  const anniversary = useSelector(getReportByType('anniversaryReviews'));
  const anniversaryReport = anniversary?.find(({ type }) => type === ReportType.EYR) || {};

  useReportDataLoader(query, year);

  const getYear = useMemo(
    () => ({
      year:
        !year && !query?.year
          ? getCurrentYearWithStartDate()
          : query?.year && year
          ? year
          : !query.year
          ? year
          : query.year,
    }),
    [query.year, year],
  );

  const isDisplayTile = useCallback(
    (name) => {
      if (!tiles.length) return true;
      return !!(tiles.length && tiles.includes(name));
    },
    [tiles],
  );

  const filters = useMemo(() => (savedFilter ? { state: { filters: savedFilter } } : { state: null }), [savedFilter]);

  if (!loaded) return <Spinner />;

  return (
    <>
      <div className={css(pieChartWrapper)}>
        {isDisplayTile(IsReportTiles.OBJECTIVES_SUBMITTED) && (
          <div className={css(leftColumn)}>
            <HoverContainer
              isActive={!small}
              customStyles={{ width: '100%' }}
              message={
                <HoverMessage
                  text={t(
                    'percentage_of_objectives_submitted_by_colleagues',
                    'Percentage of objectives submitted by colleagues, prior to being reviewed and approved by their line manager.',
                  )}
                  customStyles={reportHoverMessage}
                />
              }
            >
              <ChartWidget
                configKey={ReportPageType.REPORT_SUBMITTED_OBJECTIVES}
                onClick={() =>
                  navigate(
                    buildPathWithParams(
                      buildPath(
                        paramsReplacer(Page.REPORT_STATISTICS, {
                          ':type': convertToLink(ReportPageType.REPORT_SUBMITTED_OBJECTIVES),
                        }),
                      ),
                      {
                        ...getYear,
                      },
                    ),
                    filters,
                  )
                }
              >
                {({ data }) => (
                  <PieChart
                    title={t(TitlesReport.OBJECTIVES_SUBMITTED, 'Objectives submitted')}
                    data={data}
                    display={View.CHART}
                  />
                )}
              </ChartWidget>
            </HoverContainer>
          </div>
        )}
        {isDisplayTile(IsReportTiles.OBJECTIVES_APPROVED) && (
          <div className={css(rightColumn)}>
            <HoverContainer
              customStyles={{ width: '100%' }}
              message={
                <HoverMessage
                  text={t(
                    'percentage_of_objectives_approved_by_colleagues',
                    'Percentage of objectives submitted by colleagues that have been approved by their line managers.',
                  )}
                  customStyles={reportHoverMessage}
                />
              }
              isActive={!small}
            >
              <ChartWidget
                configKey={ReportPageType.REPORT_APPROVED_OBJECTIVES}
                onClick={() =>
                  navigate(
                    buildPathWithParams(
                      buildPath(
                        paramsReplacer(Page.REPORT_STATISTICS, {
                          ':type': convertToLink(ReportPageType.REPORT_APPROVED_OBJECTIVES),
                        }),
                      ),
                      {
                        ...getYear,
                      },
                    ),
                    filters,
                  )
                }
              >
                {({ data }) => (
                  <PieChart
                    title={t(TitlesReport.OBJECTIVES_APPROVED, 'Objectives approved')}
                    data={data}
                    display={View.CHART}
                  />
                )}
              </ChartWidget>
            </HoverContainer>
          </div>
        )}
      </div>

      <div className={css(pieChartWrapper)}>
        {isDisplayTile(IsReportTiles.MID_YEAR_FORMS) && (
          <div className={css(leftColumn)}>
            <HoverContainer
              customStyles={{ width: '100%' }}
              message={
                <HoverMessage
                  text={t(
                    'when_a_colleague_has_completed_their_review',
                    'Submitted: All reviews submitted regardless of approval status. Approved: all reviews that have been submitted and subsequently approved by the Line Manager.',
                  )}
                  customStyles={reportHoverMessage}
                />
              }
              isActive={!small}
            >
              <ChartWidget
                configKey={ReportPageType.REPORT_MID_YEAR_REVIEW}
                onClick={() =>
                  navigate(
                    buildPathWithParams(
                      buildPath(
                        paramsReplacer(Page.REPORT_STATISTICS, {
                          ':type': convertToLink(ReportPageType.REPORT_MID_YEAR_REVIEW),
                        }),
                      ),
                      {
                        ...getYear,
                      },
                    ),
                    filters,
                  )
                }
              >
                {({ data }) => (
                  <PieChart title={t(TitlesReport.MYR, 'Mid-year review')} data={data} display={View.CHART} />
                )}
              </ChartWidget>
            </HoverContainer>
          </div>
        )}
        {isDisplayTile(IsReportTiles.BREAKDOWN_MID_YEAR_REVIEW) && (
          <div className={css(rightColumn)}>
            <TableWidget
              configKey={ReportPageType.REPORT_MYR_BREAKDOWN}
              onClick={() =>
                navigate(
                  buildPathWithParams(
                    buildPath(
                      paramsReplacer(Page.REPORT_STATISTICS, {
                        ':type': convertToLink(ReportPageType.REPORT_MYR_BREAKDOWN),
                      }),
                    ),
                    {
                      ...getYear,
                    },
                  ),
                  filters,
                )
              }
            >
              {({ data }) => (
                <InfoTable mainTitle={t(TitlesReport.MYR_BREAKDOWN, 'Breakdown of Mid-year review')} data={data} />
              )}
            </TableWidget>
          </div>
        )}
      </div>
      <div className={css(pieChartWrapper)}>
        {isDisplayTile(IsReportTiles.YEAR_END_FORMS) && (
          <div className={css(leftColumn)}>
            <HoverContainer
              customStyles={{ width: '100%' }}
              message={
                <HoverMessage
                  customStyles={reportHoverMessage}
                  text={t(
                    'when_a_colleague_has_completed_their_review',
                    'Submitted: All reviews submitted regardless of approval status. Approved: all reviews that have been submitted and subsequently approved by the Line Manager.',
                  )}
                />
              }
              isActive={!small}
            >
              <ChartWidget
                configKey={ReportPageType.REPORT_END_YEAR_REVIEW}
                onClick={() =>
                  navigate(
                    buildPathWithParams(
                      buildPath(
                        paramsReplacer(Page.REPORT_STATISTICS, {
                          ':type': convertToLink(ReportPageType.REPORT_END_YEAR_REVIEW),
                        }),
                      ),
                      {
                        ...getYear,
                      },
                    ),
                    filters,
                  )
                }
              >
                {({ data }) => (
                  <PieChart title={t(TitlesReport.EYR, 'Year-end review')} data={data} display={View.CHART} />
                )}
              </ChartWidget>
            </HoverContainer>
          </div>
        )}
        {isDisplayTile(IsReportTiles.BREAKDOWN_YEAR_END_REVIEW) && (
          <div className={css(rightColumn)}>
            <TableWidget
              configKey={ReportPageType.REPORT_EYR_BREAKDOWN}
              onClick={() =>
                navigate(
                  buildPathWithParams(
                    buildPath(
                      paramsReplacer(Page.REPORT_STATISTICS, {
                        ':type': convertToLink(ReportPageType.REPORT_EYR_BREAKDOWN),
                      }),
                    ),
                    {
                      ...getYear,
                    },
                  ),
                  filters,
                )
              }
            >
              {({ data }) => (
                <InfoTable mainTitle={t(TitlesReport.EYR_BREAKDOWN, 'Breakdown of End-year review')} data={data} />
              )}
            </TableWidget>
          </div>
        )}
      </div>
      <div className={css(pieChartWrapper)}>
        {isDisplayTile(IsReportTiles.WL4AND5) && (
          <CanPerform
            perform={[role.TALENT_ADMIN]}
            yes={() => (
              <div className={css(leftColumn)}>
                <ChartWidget
                  configKey={ReportPageType.REPORT_WORK_LEVEL}
                  onClick={() =>
                    navigate(
                      buildPathWithParams(
                        buildPath(
                          paramsReplacer(Page.REPORT_STATISTICS, {
                            ':type': convertToLink(ReportPageType.REPORT_WORK_LEVEL),
                          }),
                        ),
                        {
                          ...getYear,
                        },
                      ),
                      filters,
                    )
                  }
                >
                  {({ data }) => (
                    <PieChart
                      title={t(TitlesReport.WL4AND5, 'WL4 & 5 Objectives submitted')}
                      data={data}
                      display={View.CHART}
                    />
                  )}
                </ChartWidget>
              </div>
            )}
          />
        )}

        {isDisplayTile(IsReportTiles.NEW_TO_BUSINESS) && (
          <div className={css(rightColumn)}>
            <HoverContainer
              customStyles={{ width: '100%' }}
              message={
                <HoverMessage
                  text={t(
                    'colleagues_who_have_joined_the_business',
                    'Colleagues who have joined the business in the selected financial year.',
                  )}
                  customStyles={reportHoverMessage}
                />
              }
              isActive={!small}
            >
              <ChartWidget
                configKey={ReportPageType.REPORT_NEW_TO_BUSINESS}
                onClick={() =>
                  navigate(
                    buildPathWithParams(
                      buildPath(
                        paramsReplacer(Page.REPORT_STATISTICS, {
                          ':type': convertToLink(ReportPageType.REPORT_NEW_TO_BUSINESS),
                        }),
                      ),
                      {
                        ...getYear,
                      },
                    ),
                    filters,
                  )
                }
              >
                {({ data }) => (
                  <PieChart title={t(TitlesReport.BUSINESS, 'New to business')} data={data} display={View.QUANTITY} />
                )}
              </ChartWidget>
            </HoverContainer>
          </div>
        )}
      </div>
      <div className={css(pieChartWrapper)}>
        {isDisplayTile(IsReportTiles.MOMENT_FEEDBACK) && (
          <div className={css(leftColumn)}>
            <HoverContainer
              customStyles={{ width: '100%' }}
              message={
                <HoverMessage
                  text={t(
                    'percentage_of_colleagues_who_have_requested_or_given_feedback_this_year',
                    'Percentage of colleagues who have requested or given feedback this year.',
                  )}
                  customStyles={reportHoverMessage}
                />
              }
              isActive={!small}
            >
              <ChartWidget
                configKey={ReportPageType.REPORT_FEEDBACK}
                onClick={() =>
                  navigate(
                    buildPathWithParams(
                      buildPath(
                        paramsReplacer(Page.REPORT_STATISTICS, {
                          ':type': convertToLink(ReportPageType.REPORT_FEEDBACK),
                        }),
                      ),
                      {
                        ...getYear,
                      },
                    ),
                    filters,
                  )
                }
              >
                {({ data }) => (
                  <PieChart
                    title={t(TitlesReport.MOMENT_FEEDBACK, 'In the moment feedback')}
                    data={data}
                    display={View.CHART}
                  />
                )}
              </ChartWidget>
            </HoverContainer>
          </div>
        )}
        {isDisplayTile(IsReportTiles.ANNIVERSARY_REVIEWS) && (
          <div className={css(rightColumn)}>
            <HoverContainer
              customStyles={{ width: '100%' }}
              message={
                <HoverMessage
                  text={t(
                    'the_number_of_annual_reviews_a_line_manager_has_undertaken',
                    'The number of annual reviews a line manager has undertaken based on the number of direct reports they have. This is just indicative assuming a line manager will space reviews out equally during the year.',
                  )}
                  customStyles={reportHoverMessage}
                />
              }
              isActive={!small}
            >
              <TableWidget
                configKey={ReportPageType.REPORT_ANNIVERSARY_REVIEWS}
                onClick={() =>
                  navigate(
                    buildPathWithParams(
                      buildPath(
                        paramsReplacer(Page.REPORT_STATISTICS, {
                          ':type': convertToLink(ReportPageType.REPORT_ANNIVERSARY_REVIEWS),
                        }),
                      ),
                      {
                        ...getYear,
                      },
                    ),
                    filters,
                  )
                }
              >
                {() => {
                  const totalCount = anniversaryReport.totalCount ?? 0;
                  const completed = anniversaryReport?.statistics?.approved?.count ?? 0;
                  return (
                    <>
                      <InfoTable
                        mainTitle={t(TitlesReport.ANNIVERSARY_REVIEWS, 'Anniversary Reviews')}
                        preTitle={t(TitlesReport.HOURLY_PAID, 'Hourly paid colleagues only')}
                      />
                      <div className={css(anniversaryInfo)}>
                        <span className={css(infoStatistics)}>
                          <span>{totalCount}</span>{' '}
                          {isSingular(totalCount) ? t('colleague', 'Colleague') : t('colleagues', 'Colleagues')}
                        </span>
                        <span className={css(infoStatistics, { marginTop: '6px' })}>
                          <span>{completed}</span>{' '}
                          {isSingular(completed)
                            ? t('review_completed', 'Review completed')
                            : t('reviews_completed', 'Reviews completed')}
                        </span>
                      </div>
                    </>
                  );
                }}
              </TableWidget>
            </HoverContainer>
          </div>
        )}
      </div>
      <div className={css(pieChartWrapper)}>
        <div className={css(leftColumn)}>
          <HoverContainer
            customStyles={{ width: '100%' }}
            message={
              <HoverMessage
                text={t(
                  'the_number_of_annual_reviews_a_line_manager_has_undertaken',
                  'The number of annual reviews a line manager has undertaken based on the number of direct reports they have. This is just indicative assuming a line manager will space reviews out equally during the year.',
                )}
                customStyles={reportHoverMessage}
              />
            }
            isActive={false}
          >
            <TableWidget configKey={ReportPageType.REPORT_ANNIVERSARY_REVIEWS}>
              {({ data }) => {
                return (
                  <InfoTable
                    mainTitle={t('priorities_submitted_per_quarter', 'Priorities submitted per quarter')}
                    data={data}
                  />
                );
              }}
            </TableWidget>
          </HoverContainer>
        </div>

        <div className={css(rightColumn)}>
          <HoverContainer
            customStyles={{ width: '100%' }}
            message={
              <HoverMessage
                text={t(
                  'the_number_of_annual_reviews_a_line_manager_has_undertaken',
                  'The number of annual reviews a line manager has undertaken based on the number of direct reports they have. This is just indicative assuming a line manager will space reviews out equally during the year.',
                )}
                customStyles={reportHoverMessage}
              />
            }
            isActive={false}
          >
            <TableWidget configKey={ReportPageType.REPORT_ANNIVERSARY_REVIEWS}>
              {({ data }) => (
                <InfoTable
                  mainTitle={t('priorities_agreed_per_quarter', 'Priorities agreed per quarter')}
                  data={data}
                />
              )}
            </TableWidget>
          </HoverContainer>
        </div>
      </div>
      <div className={css(pieChartWrapper)}>
        <div className={css(leftColumn)}>
          <HoverContainer
            customStyles={{ width: '100%' }}
            message={
              <HoverMessage
                text={t(
                  'the_number_of_annual_reviews_a_line_manager_has_undertaken',
                  'The number of annual reviews a line manager has undertaken based on the number of direct reports they have. This is just indicative assuming a line manager will space reviews out equally during the year.',
                )}
                customStyles={reportHoverMessage}
              />
            }
            isActive={false}
          >
            <TableWidget configKey={ReportPageType.REPORT_ANNIVERSARY_REVIEWS}>
              {({ data }) => {
                return (
                  <InfoTable
                    mainTitle={t('priorities_completed_per_quarter', 'Priorities completed per quarter')}
                    data={data}
                  />
                );
              }}
            </TableWidget>
          </HoverContainer>
        </div>
      </div>
    </>
  );
};

const infoStatistics: Rule = ({ theme }) =>
  ({
    color: theme.colors.base,
    fontSize: theme.font.fixed.f16.fontSize,
    fontWeight: theme.font.weight.bold,
    '& > span': {
      fontSize: '20px',
      color: theme.colors.link,
    },
  } as Styles);

const anniversaryInfo: Rule = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '12px',
};

const pieChartWrapper: Rule = ({ theme }) => ({
  display: 'flex',
  gap: theme.spacing.s2,
  flexWrap: 'wrap',
  marginTop: theme.spacing.s2,
});
const leftColumn: Rule = ({ theme }) => {
  return {
    display: 'flex',
    gap: theme.spacing.s2,
    flex: 4,
    flexBasis: '400px',
    fontSize: theme.font.fixed.f16.fontSize,
    lineHeight: theme.font.fixed.f12.lineHeight,
  };
};
const rightColumn: Rule = ({ theme }) => ({
  display: 'flex',
  gap: theme.spacing.s2,
  flexDirection: 'row',
  flex: 6,
  flexBasis: '550px',
});

const reportHoverMessage: Rule = ({ theme }) => ({
  zIndex: '2',
  background: theme.colors.link,
  padding: theme.spacing.s4,
  width: '294px',
  maxWidth: '294px',
  color: theme.colors.white,
  borderRadius: theme.spacing.s2_5,
  position: 'absolute',
  bottom: '-8px',
  left: '50%',
  transform: 'translate(-50%, 100%)',
});

export default Report;
