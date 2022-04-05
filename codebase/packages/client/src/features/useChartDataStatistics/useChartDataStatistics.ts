import { TitlesReport, Rating, ReportPage } from 'config/enum';
import { useStatisticsReport } from 'features/Report/hooks';
import { metaStatuses } from 'features/Report/config';

export const useChartDataStatistics = (t, type) => {
  const {
    myrSubmittedPercentage,
    myrApprovedPercentage,
    eyrSubmittedPercentage,
    eyrApprovedPercentage,
    feedbackRequestedPercentage,
    feedbackGivenPercentage,
    objectivesSubmittedPercentage,
    objectivesApprovedPercentage,
    myrRatingBreakdownBelowExpectedPercentage,
    myrRatingBreakdownBelowExpectedCount,
    myrRatingBreakdownSatisfactoryPercentage,
    myrRatingBreakdownSatisfactoryCount,
    myrRatingBreakdownGreatPercentage,
    myrRatingBreakdownGreatCount,
    myrRatingBreakdownOutstandingPercentage,
    myrRatingBreakdownOutstandingCount,
    eyrRatingBreakdownBelowExpectedPercentage,
    eyrRatingBreakdownBelowExpectedCount,
    eyrRatingBreakdownSatisfactoryPercentage,
    eyrRatingBreakdownSatisfactoryCount,
    eyrRatingBreakdownGreatPercentage,
    eyrRatingBreakdownGreatCount,
    eyrRatingBreakdownOutstandingPercentage,
    eyrRatingBreakdownOutstandingCount,
    newToBusinessCount,
    anniversaryReviewPerQuarter1Percentage,
    anniversaryReviewPerQuarter1Count,
    anniversaryReviewPerQuarter2Percentage,
    anniversaryReviewPerQuarter2Count,
    anniversaryReviewPerQuarter3Percentage,
    anniversaryReviewPerQuarter3Count,
    anniversaryReviewPerQuarter4Percentage,
    anniversaryReviewPerQuarter4Count,
    colleaguesCount,
    approvedObjPercent,
    approvedObjTitle,
    notApprovedObjPercent,
    notApprovedObjTitle,
  } = useStatisticsReport([...metaStatuses]);

  const report = {
    [ReportPage.REPORT_MID_YEAR_REVIEW]: [
      { percent: myrSubmittedPercentage, title: t(TitlesReport.SUBMITTED, 'Submitted') },
      { percent: myrApprovedPercentage, title: t(TitlesReport.APPROVED, 'Approved') },
    ],
    [ReportPage.REPORT_END_YEAR_REVIEW]: [
      { pecent: eyrSubmittedPercentage, title: t(TitlesReport.SUBMITTED, 'Submitted') },
      { percent: eyrApprovedPercentage, title: t(TitlesReport.APPROVED, 'Approved') },
    ],
    [ReportPage.REPORT_FEEDBACK]: [
      { percent: feedbackRequestedPercentage, title: t(TitlesReport.REQUESTED, 'Requested') },
      { percent: feedbackGivenPercentage, title: t(TitlesReport.GIVEN, 'Given') },
    ],

    [ReportPage.REPORT_SUBMITTED_OBJECTIVES]: [{ percent: objectivesSubmittedPercentage }],

    [ReportPage.REPORT_APPROVED_OBJECTIVES]: [{ percent: objectivesApprovedPercentage }],
    [ReportPage.REPORT_WORK_LEVEL]: [
      { percent: notApprovedObjPercent, title: notApprovedObjTitle },
      { percent: approvedObjPercent, title: approvedObjTitle },
    ],

    [ReportPage.REPORT_NEW_TO_BUSINESS]: [{ percent: newToBusinessCount, title: t(Rating.COLLEAGUES, 'Colleagues') }],

    [ReportPage.REPORT_MYR_BREAKDOWN]: [
      {
        percent: myrRatingBreakdownBelowExpectedPercentage || 0,
        quantity: myrRatingBreakdownBelowExpectedCount || 0,
        title: t(Rating.BELOW_EXPECTED, 'Below expected'),
      },
      {
        percent: myrRatingBreakdownSatisfactoryPercentage || 0,
        quantity: myrRatingBreakdownSatisfactoryCount || 0,
        title: t(Rating.SATISFACTORY, 'Satisfactory'),
      },
      {
        percent: myrRatingBreakdownGreatPercentage || 0,
        quantity: myrRatingBreakdownGreatCount || 0,
        title: t(Rating.GREAT, 'Great'),
      },
      {
        percent: myrRatingBreakdownOutstandingPercentage || 0,
        quantity: myrRatingBreakdownOutstandingCount || 0,
        title: t(Rating.OUTSTANDING, 'Outstanding'),
      },
    ],
    [ReportPage.REPORT_EYR_BREAKDOWN]: [
      {
        percent: eyrRatingBreakdownBelowExpectedPercentage,
        quantity: eyrRatingBreakdownBelowExpectedCount,
        title: t(Rating.BELOW_EXPECTED, 'Below expected'),
      },
      {
        percent: eyrRatingBreakdownSatisfactoryPercentage,
        quantity: eyrRatingBreakdownSatisfactoryCount,
        title: t(Rating.SATISFACTORY, 'Satisfactory'),
      },
      {
        percent: eyrRatingBreakdownGreatPercentage,
        quantity: eyrRatingBreakdownGreatCount,
        title: t(Rating.GREAT, 'Great'),
      },
      {
        percent: eyrRatingBreakdownOutstandingPercentage,
        quantity: eyrRatingBreakdownOutstandingCount,
        title: t(Rating.OUTSTANDING, 'Outstanding'),
      },
    ],

    [ReportPage.REPORT_ANNIVERSARY_REVIEWS]: [
      {
        percent: anniversaryReviewPerQuarter1Percentage,
        quantity: anniversaryReviewPerQuarter1Count,
        title: t(Rating.QUARTER_1, 'Quarter 1'),
      },
      {
        percent: anniversaryReviewPerQuarter2Percentage,
        quantity: anniversaryReviewPerQuarter2Count,
        title: t(Rating.QUARTER_2, 'Quarter 2'),
      },
      {
        percent: anniversaryReviewPerQuarter3Percentage,
        quantity: anniversaryReviewPerQuarter3Count,
        title: t(Rating.QUARTER_3, 'Quarter 3'),
      },
      {
        percent: anniversaryReviewPerQuarter4Percentage,
        quantity: anniversaryReviewPerQuarter4Count,
        title: t(Rating.QUARTER_4, 'Quarter 4'),
      },
    ],

    colleaguesCount,
  };

  return report[type];
};
