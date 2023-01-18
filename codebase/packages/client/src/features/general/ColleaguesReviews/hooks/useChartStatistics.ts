import { useEffect } from 'react';
import { ReportActions, ReviewType } from '@pma/store';
import useDispatch from 'hooks/useDispatch';
import { ReportPage } from 'config/enum';
import useQueryString from 'hooks/useQueryString';

export const useChartStatistics = (type, filters) => {
  const dispatch = useDispatch();
  const query = useQueryString();

  const { year } = query;

  useEffect(() => {
    if (!type) return;

    switch (type) {
      case ReportPage.REPORT_APPROVED_OBJECTIVES: {
        dispatch(
          ReportActions.getReviewReport({
            ...filters,
            year,
            'review-type_in': [ReviewType.MYR, ReviewType.EYR, ReviewType.OBJECTIVE],
          }),
        );
        break;
      }
      case ReportPage.REPORT_SUBMITTED_OBJECTIVES: {
        dispatch(
          ReportActions.getReviewReport({
            ...filters,
            year,
            'review-type_in': [ReviewType.MYR, ReviewType.EYR, ReviewType.OBJECTIVE],
          }),
        );
        break;
      }
      case ReportPage.REPORT_MID_YEAR_REVIEW: {
        dispatch(ReportActions.getReviewReport({ year, ...filters }));
        break;
      }
      case ReportPage.REPORT_END_YEAR_REVIEW: {
        dispatch(ReportActions.getReviewReport({ year, ...filters }));
        break;
      }
      case ReportPage.REPORT_EYR_BREAKDOWN: {
        dispatch(ReportActions.getOverallRatingsReport({ year, ...filters }));
        break;
      }
      case ReportPage.REPORT_MYR_BREAKDOWN: {
        dispatch(ReportActions.getOverallRatingsReport({ year, ...filters }));
        break;
      }
      case ReportPage.REPORT_NEW_TO_BUSINESS: {
        dispatch(ReportActions.getNewToBusinessReport({ year, ...filters }));
        break;
      }
      case ReportPage.REPORT_FEEDBACK: {
        dispatch(ReportActions.getFeedbacksReport({ year, ...filters }));

        break;
      }
      case ReportPage.REPORT_ANNIVERSARY_REVIEWS: {
        dispatch(ReportActions.getAnniversaryReviewsReport({ year, ...filters }));

        break;
      }
      case ReportPage.REPORT_WORK_LEVEL: {
        dispatch(ReportActions.getLeadershipReviewsReport({ year, ...filters }));
        break;
      }
    }
  }, [type, JSON.stringify(filters)]);
};
