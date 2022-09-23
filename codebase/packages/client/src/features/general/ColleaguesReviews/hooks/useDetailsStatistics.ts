import { useEffect, useState } from 'react';
import { getStatisticsMetaSelector, StatisticsAction } from '@pma/store';
import { useSelector } from 'react-redux';

import { ReportPage, ReportType } from 'config/enum';
import { defaultSort, initialFields } from '../config';
import useDispatch from 'hooks/useDispatch';

export const useDetailsStatistics = (type, query) => {
  const dispatch = useDispatch();
  const { year } = query;
  const { loading: detailsLoading } = useSelector(getStatisticsMetaSelector);
  const [loading, setLoading] = useState<boolean>(false);

  const getDetails = (query = {}) => {
    if (Object.keys(query)?.length) setLoading(true);
    switch (type) {
      case ReportPage.REPORT_APPROVED_OBJECTIVES: {
        dispatch(
          StatisticsAction.getStatisticsReview({
            ...initialFields,
            ...query,
            ...defaultSort,
            year,
            status: 'approved',
            'review-type': ReportType.OBJECTIVE,
          }),
        );
        break;
      }
      case ReportPage.REPORT_SUBMITTED_OBJECTIVES: {
        dispatch(
          StatisticsAction.getStatisticsReview({
            ...initialFields,
            ...defaultSort,
            year,
            status: 'submitted',
            'review-type': ReportType.OBJECTIVE,
          }),
        );

        dispatch(
          StatisticsAction.getStatisticsReview({
            ...initialFields,
            ...defaultSort,
            year,
            status: 'not-submitted',
            'review-type': ReportType.OBJECTIVE,
          }),
        );

        break;
      }
      case ReportPage.REPORT_MID_YEAR_REVIEW: {
        dispatch(
          StatisticsAction.getStatisticsReview({
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.MYR,
            status: 'submitted',
          }),
        );
        dispatch(
          StatisticsAction.getStatisticsReview({
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.MYR,
            status: 'not-submitted',
          }),
        );
        dispatch(
          StatisticsAction.getStatisticsReview({
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.MYR,
            status: 'approved',
          }),
        );
        break;
      }
      case ReportPage.REPORT_END_YEAR_REVIEW: {
        dispatch(
          StatisticsAction.getStatisticsReview({
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.EYR,
            status: 'submitted',
          }),
        );
        dispatch(
          StatisticsAction.getStatisticsReview({
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.EYR,
            status: 'not-submitted',
          }),
        );
        dispatch(
          StatisticsAction.getStatisticsReview({
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.EYR,
            status: 'approved',
          }),
        );
        break;
      }
      case ReportPage.REPORT_EYR_BREAKDOWN: {
        dispatch(
          StatisticsAction.getOverallRatingsStatistics({
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.EYR,
            'overall-rating': 'Below expected',
          }),
        );
        dispatch(
          StatisticsAction.getOverallRatingsStatistics({
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.EYR,
            'overall-rating': 'Outstanding',
          }),
        );
        dispatch(
          StatisticsAction.getOverallRatingsStatistics({
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.EYR,
            'overall-rating': 'Great',
          }),
        );
        dispatch(
          StatisticsAction.getOverallRatingsStatistics({
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.EYR,
            'overall-rating': 'Satisfactory',
          }),
        );
        break;
      }
      case ReportPage.REPORT_MYR_BREAKDOWN: {
        dispatch(
          StatisticsAction.getOverallRatingsStatistics({
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.MYR,
            'overall-rating': 'Below expected',
          }),
        );
        dispatch(
          StatisticsAction.getOverallRatingsStatistics({
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.MYR,
            'overall-rating': 'Outstanding',
          }),
        );
        dispatch(
          StatisticsAction.getOverallRatingsStatistics({
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.MYR,
            'overall-rating': 'Great',
          }),
        );
        dispatch(
          StatisticsAction.getOverallRatingsStatistics({
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.MYR,
            'overall-rating': 'Satisfactory',
          }),
        );
        break;
      }
      case ReportPage.REPORT_NEW_TO_BUSINESS: {
        dispatch(StatisticsAction.getNewToBusinessStatistics({ ...initialFields, ...defaultSort, year }));
        break;
      }
      case ReportPage.REPORT_FEEDBACK: {
        dispatch(
          StatisticsAction.getFeedbacksStatistics({ ...initialFields, ...defaultSort, year, type: 'requested' }),
        );
        dispatch(StatisticsAction.getFeedbacksStatistics({ ...initialFields, ...defaultSort, year, type: 'given' }));
        break;
      }
      case ReportPage.REPORT_ANNIVERSARY_REVIEWS: {
        dispatch(
          StatisticsAction.getAnniversaryReviewsStatistics({
            ...initialFields,
            ...defaultSort,
            year,
            quarter: 'quarter1',
          }),
        );
        dispatch(
          StatisticsAction.getAnniversaryReviewsStatistics({
            ...initialFields,
            ...defaultSort,
            year,
            quarter: 'quarter2',
          }),
        );
        dispatch(
          StatisticsAction.getAnniversaryReviewsStatistics({
            ...initialFields,
            ...defaultSort,
            year,
            quarter: 'quarter3',
          }),
        );
        dispatch(
          StatisticsAction.getAnniversaryReviewsStatistics({
            ...initialFields,
            ...defaultSort,
            year,
            quarter: 'quarter4',
          }),
        );
        break;
      }
      case ReportPage.REPORT_WORK_LEVEL: {
        dispatch(
          StatisticsAction.getLeadershipReviewsStatistics({
            ...initialFields,
            ...defaultSort,
            year,
            status: 'approved',
            ...(type === ReportPage.REPORT_WORK_LEVEL && { _limit: 10 }),
          }),
        );
        break;
      }
    }
  };

  useEffect(() => {
    if (loading && detailsLoading) return setLoading(true);
    setLoading(false);
  }, [detailsLoading]);

  useEffect(() => {
    if (!type) return;
    getDetails();
  }, [type]);

  // const searchedDetails = useCallback(
  //   debounce((query) => {
  //     getDetails(query);
  //   }, 300),
  //   [],
  // );
  // useEffect(() => {
  //   if (!type) return;
  //   if (searchedValue.length <= 2) return;
  //   dispatch(StatisticsAction.clearStatistics());
  //   searchedDetails(buildSearchColleaguesReviews(searchedValue));
  // }, [type, searchedValue]);
  //   TODO: uncomment when backend will be ready for search functionality

  useEffect(() => {
    return () => {
      dispatch(StatisticsAction.clearStatistics());
    };
  }, []);

  return loading;
};
