import { useEffect, useState } from 'react';
import { getStatisticsMetaSelector, StatisticsAction } from '@pma/store';
import { useSelector } from 'react-redux';

import { ReportPage, ReportType } from 'config/enum';
import { defaultSort, initialFields } from '../config';
import useDispatch from 'hooks/useDispatch';
import useQueryString from 'hooks/useQueryString';

export const useDetailsStatistics = (type, filters = {}) => {
  const query = useQueryString();
  const dispatch = useDispatch();
  const { year } = query;
  const { loading: detailsLoading } = useSelector(getStatisticsMetaSelector);
  const [loading, setLoading] = useState<boolean>(false);

  const getDetails = () => {
    setLoading(true);
    switch (type) {
      case ReportPage.REPORT_APPROVED_OBJECTIVES: {
        dispatch(
          StatisticsAction.getStatisticsReview({
            ...filters,
            ...initialFields,
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
            ...filters,
            ...initialFields,
            ...defaultSort,
            year,
            status: 'submitted',
            'review-type': ReportType.OBJECTIVE,
          }),
        );

        dispatch(
          StatisticsAction.getStatisticsReview({
            ...filters,
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
            ...filters,
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.MYR,
            status: 'submitted',
          }),
        );
        dispatch(
          StatisticsAction.getStatisticsReview({
            ...filters,
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.MYR,
            status: 'not-submitted',
          }),
        );
        dispatch(
          StatisticsAction.getStatisticsReview({
            ...filters,
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
            ...filters,
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.EYR,
            status: 'submitted',
          }),
        );
        dispatch(
          StatisticsAction.getStatisticsReview({
            ...filters,
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.EYR,
            status: 'not-submitted',
          }),
        );
        dispatch(
          StatisticsAction.getStatisticsReview({
            ...filters,
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
            ...filters,
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.EYR,
            'overall-rating': 'Below expected',
          }),
        );
        dispatch(
          StatisticsAction.getOverallRatingsStatistics({
            ...filters,
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.EYR,
            'overall-rating': 'Outstanding',
          }),
        );
        dispatch(
          StatisticsAction.getOverallRatingsStatistics({
            ...filters,
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.EYR,
            'overall-rating': 'Great',
          }),
        );
        dispatch(
          StatisticsAction.getOverallRatingsStatistics({
            ...filters,
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.EYR,
            'overall-rating': 'Satisfactory',
          }),
        );
        dispatch(
          StatisticsAction.getOverallRatingsStatistics({
            ...filters,
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.EYR,
            'overall-rating': 'New to business',
          }),
        );
        break;
      }
      case ReportPage.REPORT_MYR_BREAKDOWN: {
        dispatch(
          StatisticsAction.getOverallRatingsStatistics({
            ...filters,
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.MYR,
            'overall-rating': 'Below expected',
          }),
        );
        dispatch(
          StatisticsAction.getOverallRatingsStatistics({
            ...filters,
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.MYR,
            'overall-rating': 'New to business',
          }),
        );
        dispatch(
          StatisticsAction.getOverallRatingsStatistics({
            ...filters,
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.MYR,
            'overall-rating': 'Outstanding',
          }),
        );
        dispatch(
          StatisticsAction.getOverallRatingsStatistics({
            ...filters,
            ...initialFields,
            ...defaultSort,
            year,
            'review-type': ReportType.MYR,
            'overall-rating': 'Great',
          }),
        );
        dispatch(
          StatisticsAction.getOverallRatingsStatistics({
            ...filters,
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
        dispatch(StatisticsAction.getNewToBusinessStatistics({ ...initialFields, ...defaultSort, year, ...filters }));
        break;
      }
      case ReportPage.REPORT_FEEDBACK: {
        dispatch(
          StatisticsAction.getFeedbacksStatistics({
            ...initialFields,
            ...defaultSort,
            year,
            type: 'requested',
            ...filters,
          }),
        );
        dispatch(
          StatisticsAction.getFeedbacksStatistics({
            ...initialFields,
            ...defaultSort,
            year,
            type: 'given',
            ...filters,
          }),
        );
        break;
      }
      case ReportPage.REPORT_ANNIVERSARY_REVIEWS: {
        ['EYR_START', 'EYR_END'].forEach((type) => {
          dispatch(
            StatisticsAction.getAnniversaryReviewsStatistics({
              ...filters,
              ...initialFields,
              ...defaultSort,
              year,
              status: 'not-submitted',
              type,
            }),
          );
          dispatch(
            StatisticsAction.getAnniversaryReviewsStatistics({
              ...filters,
              ...initialFields,
              ...defaultSort,
              year,
              status: 'submitted',
              type,
            }),
          );
          dispatch(
            StatisticsAction.getAnniversaryReviewsStatistics({
              ...filters,
              ...initialFields,
              ...defaultSort,
              year,
              status: 'approved',
              type,
            }),
          );
        });
        break;
      }
      case ReportPage.REPORT_WORK_LEVEL: {
        dispatch(
          StatisticsAction.getLeadershipReviewsStatistics({
            ...filters,
            ...initialFields,
            ...defaultSort,
            year,
            status: 'approved',
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
  }, [type, JSON.stringify(filters)]);

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
