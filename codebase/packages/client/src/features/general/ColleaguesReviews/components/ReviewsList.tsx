import React from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';
import { StatisticsAction } from '@pma/store';
import { useLocation, useNavigate } from 'react-router-dom';

import ViewColleagueProfile from 'components/ViewColleagueProfile';
import { useTranslation } from 'components/Translation';
import InfinityScrollLoad from 'components/InfinityScrollLoad';
import { workLevel } from 'features/general/Permission';
import { buildPath } from 'features/general/Routes';
import { paramsReplacer } from 'utils';
import { Page } from 'pages';
import useDispatch from 'hooks/useDispatch';
import { ReportPage, ReportType } from 'config/enum';

export const ReviewsList = ({ type, query, loading, list }) => {
  const { css } = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const { t } = useTranslation();

  const handleView = (uuid: string) =>
    navigate(buildPath(paramsReplacer(`${Page.USER_REVIEWS}`, { ':uuid': uuid })), {
      state: {
        backPath: `${pathname}${search}`,
      },
    });

  return (
    <div className={css({ width: '100%' })}>
      <InfinityScrollLoad
        loadMore={(_limit, _start) => {
          // TODO: need to think about best methods to clarify which action to dispatch
          if (type === ReportPage.REPORT_APPROVED_OBJECTIVES || ReportPage.REPORT_APPROVED_OBJECTIVES) {
            dispatch(
              StatisticsAction.getStatisticsReview({
                _start,
                _limit,
                year: query.year,
                'review-type': ReportType.OBJECTIVE,
              }),
            );
          }
          if (type === ReportPage.REPORT_MID_YEAR_REVIEW) {
            dispatch(
              StatisticsAction.getStatisticsReview({ _start, _limit, year: query.year, 'review-type': ReportType.MYR }),
            );
          }
          if (type === ReportPage.REPORT_END_YEAR_REVIEW) {
            dispatch(
              StatisticsAction.getStatisticsReview({ _start, _limit, year: query.year, 'review-type': ReportType.EYR }),
            );
          }
          if (type === ReportPage.REPORT_EYR_BREAKDOWN) {
            dispatch(
              StatisticsAction.getOverallRatingsStatistics({
                _start,
                _limit,
                year: query.year,
                'review-type': ReportType.EYR,
              }),
            );
          }
          if (type === ReportPage.REPORT_MYR_BREAKDOWN) {
            dispatch(
              StatisticsAction.getOverallRatingsStatistics({
                _start,
                _limit,
                year: query.year,
                'review-type': ReportType.MYR,
              }),
            );
          }
          if (type === ReportPage.REPORT_NEW_TO_BUSINESS) {
            dispatch(StatisticsAction.getNewToBusinessStatistics({ _start, _limit, year: query.year }));
          }
          if (type === ReportPage.REPORT_FEEDBACK) {
            dispatch(StatisticsAction.getFeedbacksStatistics({ _start, _limit, year: query.year }));
          }
          if (type === ReportPage.REPORT_ANNIVERSARY_REVIEWS) {
            dispatch(StatisticsAction.getAnniversaryReviewsStatistics({ _start, _limit, year: query.year }));
          }
          if (type === ReportPage.REPORT_WORK_LEVEL) {
            dispatch(
              StatisticsAction.getLeadershipReviewsStatistics({
                _start,
                _limit,
                year: query.year,
                'review-type': ReportType.OBJECTIVE,
                work_level_in: [workLevel.WL4, workLevel.WL5],
              }),
            );
          }
        }}
        loading={loading}
        limit={18}
        //TODO: change when api will be prepared
        hasMore
        render={() => (
          <>
            {Object.entries(list).map(
              ([title, data]) =>
                !!(data as []).length && (
                  <div key={title} className={css({ marginBottom: '24px' })}>
                    <span className={css(objectiveTypeStyle)}>{t(title)}</span>
                    {/*//@ts-ignore*/}
                    {data.map((item, i) => (
                      <div key={`${item.uuid}${i}`} className={css({ marginTop: '8px' })}>
                        <ViewColleagueProfile colleague={item} onClick={() => handleView(item.uuid)} />
                      </div>
                    ))}
                  </div>
                ),
            )}
          </>
        )}
      />
    </div>
  );
};

const objectiveTypeStyle: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: `${theme.font.fixed.f18.fontSize}`,
  marginBottom: '22px',
  display: 'inline-block',
});
