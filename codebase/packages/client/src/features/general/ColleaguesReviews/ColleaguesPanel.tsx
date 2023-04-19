import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

import { Rule, Styles, useStyle } from '@pma/dex-wrapper';
import { StatisticsAction, getStatisticsMetaSelector } from '@pma/store';
import { Panel } from 'components/Accordion';
import InfinityScrollLoad from 'components/InfinityScrollLoad';
import { Table } from 'components/Table';
import ViewColleagueProfile from 'components/ViewColleagueProfile';
import { ReportPage, ReportType } from 'config/enum';
import { buildPath } from 'features/general/Routes';
import useDispatch from 'hooks/useDispatch';
import useQueryString from 'hooks/useQueryString';
import { Page } from 'pages';
import { filterToRequest, paramsReplacer } from 'utils';
import { defaultSort } from './config';

type Props = {
  type: ReportPage;
  filterValues: Record<string, Record<string, boolean>>;
  filters: ReturnType<typeof filterToRequest>;
  title: string;
  hasMore: boolean;
  data: any;
};

export const ColleaguesPanel: FC<Props> = ({ filterValues, type, title, filters, hasMore, data }) => {
  const query = useQueryString();
  const { year } = query;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector(getStatisticsMetaSelector);

  const { css } = useStyle();

  const { pathname, search } = useLocation();

  const handleView = (uuid: string) =>
    navigate(buildPath(paramsReplacer(`${Page.USER_REVIEWS}`, { ':uuid': uuid })), {
      state: {
        backPath: `${pathname}${search}`,
        filters: filterValues,
      },
    });

  const isWLPage = type === ReportPage.REPORT_WORK_LEVEL;

  return (
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
  );
};

const profileStyles: Rule = {
  '&:not(:first-child)': {
    marginTop: '8px',
  },
} as Styles;
