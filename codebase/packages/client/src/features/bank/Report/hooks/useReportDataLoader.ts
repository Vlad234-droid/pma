import { useEffect } from 'react';
import { ReportActions, ReviewType } from '@pma/store';
import { useDispatch } from 'react-redux';

export const useReportDataLoader = (fields: Record<string, string | number> = {}, year: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {
      year,
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
    //TODO: remove comment when endpoint for total colleague will be ready
    // dispatch(ReportActions.getReportsTotalColleagues(payload));
  }, [year]);
};
