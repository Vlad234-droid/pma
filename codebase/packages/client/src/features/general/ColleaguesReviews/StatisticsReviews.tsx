import React, { FC } from 'react';
import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { getListStatistics, getReportMetaSelector, getStatisticsMetaSelector, StatisticsAction } from '@pma/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import { Page } from 'pages';
import { buildPath } from 'features/general/Routes';
import Spinner from 'components/Spinner';
import InfinityScrollLoad from 'components/InfinityScrollLoad';
import ViewColleagueProfile from 'components/ViewColleagueProfile';
import { useTranslation } from 'components/Translation';
import { Accordion, BaseAccordion, Panel, Section, ExpandButton } from 'components/Accordion';

import useDispatch from 'hooks/useDispatch';
import useQueryString from 'hooks/useQueryString';
import { useChartStatistics } from './hooks/useChartStatistics';
import { useDetailsStatistics, useTotalReviews } from './hooks';
import { paramsReplacer } from 'utils';
import { List } from './config';
import { ReportPage, ReportType } from 'config/enum';

const StatisticsReviews: FC<{ type: ReportPage }> = ({ type }) => {
  const query = useQueryString();
  const { t } = useTranslation();
  const { css } = useStyle();
  const { loading: reportLoading } = useSelector(getReportMetaSelector);
  const list: List = useSelector(getListStatistics);
  const { loading } = useSelector(getStatisticsMetaSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname, search } = useLocation();

  const searchedLoading = useDetailsStatistics(type, query);
  useChartStatistics(type, query);
  const reviews = useTotalReviews(type);

  const handleView = (uuid: string) =>
    navigate(buildPath(paramsReplacer(`${Page.USER_REVIEWS}`, { ':uuid': uuid })), {
      state: {
        backPath: `${pathname}${search}`,
      },
    });

  const { year } = query;

  if (reportLoading || searchedLoading) return <Spinner fullHeight />;

  return (
    <div className={css({ width: '100%' })}>
      {Object.entries(list).map(([title, data]) => {
        const total = data?.length === reviews?.statistics?.[title]?.count;
        return (
          <Accordion id={`team-mate-accordion-${1}`} key={title} customStyle={{ marginTop: '0px' }}>
            <BaseAccordion id={`team-mate-base-accordion-${2}`}>
              {() => (
                <Section defaultExpanded={false}>
                  <div className={css(scrollContainer)}>
                    <div className={css(wrapperStyles)}>
                      <span className={css(titleStyles)}>
                        {t(title)} {data.length}
                      </span>
                      <div className={css(expandButtonStyles)}>
                        <ExpandButton />
                      </div>
                    </div>
                    <Panel>
                      <InfinityScrollLoad
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
                                }),
                              );
                              break;
                            }
                            case ReportPage.REPORT_FEEDBACK: {
                              dispatch(StatisticsAction.getFeedbacksStatistics({ year, type: title, _limit, _start }));
                              break;
                            }
                            case ReportPage.REPORT_ANNIVERSARY_REVIEWS: {
                              dispatch(
                                StatisticsAction.getAnniversaryReviewsStatistics({
                                  year,
                                  quarter: title,
                                  _limit,
                                  _start,
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
                                }),
                              );
                              break;
                            }
                          }
                        }}
                        loading={loading}
                        limit={10}
                        hasMore={!total}
                        render={() => (
                          <div key={title} className={css({ marginBottom: '24px' })}>
                            {data.map((item, i) => (
                              <div key={`${item.uuid}${i}`} className={css(profileStyles)}>
                                <ViewColleagueProfile colleague={item} onClick={() => handleView(item.uuid)} />
                              </div>
                            ))}
                          </div>
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

const wrapperStyles: Rule = {
  padding: '24px 14px 24px 0px',
  display: 'flex',
  justifyContent: 'space-between',
};

const scrollContainer: Rule = {
  '&:not(:first-child)': {
    marginTop: '20px',
  },
} as Styles;

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
