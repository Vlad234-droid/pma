import { useEffect } from 'react';
import { ReportActions, ReviewType } from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { ReportPage } from 'config/enum';

export const useChartStatistics = (type, query) => {
  const dispatch = useDispatch();
  const { year } = query;

  useEffect(() => {
    if (!type) return;

    switch (type) {
      case ReportPage.REPORT_APPROVED_OBJECTIVES: {
        dispatch(
          ReportActions.getReviewReport({
            year,
            'review-type_in': [ReviewType.MYR, ReviewType.EYR, ReviewType.OBJECTIVE],
          }),
        );
        break;
      }
      case ReportPage.REPORT_SUBMITTED_OBJECTIVES: {
        dispatch(
          ReportActions.getReviewReport({
            year,
            'review-type_in': [ReviewType.MYR, ReviewType.EYR, ReviewType.OBJECTIVE],
          }),
        );
        break;
      }
      case ReportPage.REPORT_MID_YEAR_REVIEW: {
        dispatch(ReportActions.getReviewReport({ year }));
        break;
      }
      case ReportPage.REPORT_END_YEAR_REVIEW: {
        dispatch(ReportActions.getReviewReport({ year }));
        break;
      }
      case ReportPage.REPORT_EYR_BREAKDOWN: {
        dispatch(ReportActions.getOverallRatingsReport({ year }));
        break;
      }
      case ReportPage.REPORT_MYR_BREAKDOWN: {
        dispatch(ReportActions.getOverallRatingsReport({ year }));
        break;
      }
      case ReportPage.REPORT_NEW_TO_BUSINESS: {
        dispatch(ReportActions.getNewToBusinessReport({ year }));
        break;
      }
      case ReportPage.REPORT_FEEDBACK: {
        dispatch(ReportActions.getFeedbacksReport({ year }));

        break;
      }
      case ReportPage.REPORT_ANNIVERSARY_REVIEWS: {
        dispatch(ReportActions.getAnniversaryReviewsReport({ year }));

        break;
      }
      case ReportPage.REPORT_WORK_LEVEL: {
        dispatch(ReportActions.getLeadershipReviewsReport({ year }));
        break;
      }
    }
  }, [type]);
};
