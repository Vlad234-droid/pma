import { useEffect } from 'react';
import { ReportActions, ReviewType } from '@pma/store';
import { useDispatch } from 'react-redux';
import { filterToRequest } from 'utils';

export const useReportData = (filters: Record<string, Record<string, boolean>> = {}, year: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {
      year,
      ...filterToRequest(filters),
    };
    dispatch(
      ReportActions.getReviewReport({
        ...payload,
        'review-type_in': [ReviewType.MYR, ReviewType.EYR, ReviewType.OBJECTIVE],
      }),
    );
    dispatch(ReportActions.getOverallRatingsReport(payload));
    dispatch(ReportActions.getNewToBusinessReport(payload));
    dispatch(ReportActions.getFeedbacksReport(payload));
    dispatch(ReportActions.getAnniversaryReviewsReport(payload));
    dispatch(ReportActions.getLeadershipReviewsReport(payload));
    dispatch(ReportActions.getReportsTotalColleagues(payload));
  }, [year, JSON.stringify(filters)]);
};
