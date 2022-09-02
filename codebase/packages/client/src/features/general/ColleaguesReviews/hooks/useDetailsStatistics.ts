import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ReportActions, ReviewType, StatisticsAction } from '@pma/store';
import { workLevel } from 'features/general/Permission';

import { ReportPage, ReportType } from 'config/enum';
import { initialFields } from '../config';

export const useDetailsStatistics = (type, query) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!type) return;
    switch (type) {
      case ReportPage.REPORT_APPROVED_OBJECTIVES:
      case ReportPage.REPORT_SUBMITTED_OBJECTIVES: {
        dispatch(
          ReportActions.getReviewReport({
            year: query.year,
            'review-type_in': [ReviewType.MYR, ReviewType.EYR, ReviewType.OBJECTIVE],
          }),
        );
        dispatch(
          StatisticsAction.getStatisticsReview({
            ...initialFields,
            year: query.year,
            'review-type': ReportType.OBJECTIVE,
          }),
        );
        return;
      }
      case ReportPage.REPORT_MID_YEAR_REVIEW: {
        dispatch(ReportActions.getReviewReport({ year: query.year }));
        dispatch(
          StatisticsAction.getStatisticsReview({ ...initialFields, year: query.year, 'review-type': ReportType.MYR }),
        );
        return;
      }
      case ReportPage.REPORT_END_YEAR_REVIEW: {
        dispatch(ReportActions.getReviewReport({ year: query.year }));
        dispatch(
          StatisticsAction.getStatisticsReview({ ...initialFields, year: query.year, 'review-type': ReportType.EYR }),
        );
        return;
      }
      case ReportPage.REPORT_EYR_BREAKDOWN: {
        dispatch(ReportActions.getOverallRatingsReport({ year: query.year }));
        dispatch(
          StatisticsAction.getOverallRatingsStatistics({
            ...initialFields,
            year: query.year,
            'review-type': ReportType.EYR,
          }),
        );
        return;
      }
      case ReportPage.REPORT_MYR_BREAKDOWN: {
        dispatch(ReportActions.getOverallRatingsReport({ year: query.year }));
        dispatch(
          StatisticsAction.getOverallRatingsStatistics({
            ...initialFields,
            year: query.year,
            'review-type': ReportType.MYR,
          }),
        );
        return;
      }
      case ReportPage.REPORT_NEW_TO_BUSINESS: {
        dispatch(ReportActions.getNewToBusinessReport({ year: query.year }));
        dispatch(StatisticsAction.getNewToBusinessStatistics({ ...initialFields, year: query.year }));
        return;
      }
      case ReportPage.REPORT_FEEDBACK: {
        dispatch(ReportActions.getFeedbacksReport({ year: query.year }));
        dispatch(StatisticsAction.getFeedbacksStatistics({ ...initialFields, year: query.year }));
        return;
      }
      case ReportPage.REPORT_ANNIVERSARY_REVIEWS: {
        dispatch(ReportActions.getAnniversaryReviewsReport({ year: query.year }));
        dispatch(StatisticsAction.getAnniversaryReviewsStatistics({ ...initialFields, year: query.year }));
        return;
      }
      case ReportPage.REPORT_WORK_LEVEL: {
        dispatch(ReportActions.getLeadershipReviewsReport({ year: query.year }));
        dispatch(
          StatisticsAction.getLeadershipReviewsStatistics({
            ...initialFields,
            year: query.year,
            'review-type': ReportType.OBJECTIVE,
            'work-level-in': [workLevel.WL4, workLevel.WL5],
          }),
        );
        return;
      }
      default:
        return;
    }
  }, [type]);
};
