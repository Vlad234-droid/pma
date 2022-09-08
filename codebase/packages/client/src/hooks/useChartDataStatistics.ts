import { ChartReport, getReportByType } from '@pma/store';
import { useSelector } from 'react-redux';
import { getDefaultData } from 'features/general/Report/config';
import { useTranslation } from 'components/Translation';
import { ReportPage, ReportType } from 'config/enum';

export type Data = {
  percentage: string;
  count?: string;
  title?: string;
};

export const useChartDataStatistics = (configKey: ReportPage): Array<Data> => {
  const { t } = useTranslation();

  const withTitles = [
    ReportPage.REPORT_MID_YEAR_REVIEW,
    ReportPage.REPORT_END_YEAR_REVIEW,
    ReportPage.REPORT_EYR_BREAKDOWN,
    ReportPage.REPORT_MYR_BREAKDOWN,
    ReportPage.REPORT_ANNIVERSARY_REVIEWS,
    ReportPage.REPORT_WORK_LEVEL,
  ];

  const report = {
    [ReportPage.REPORT_SUBMITTED_OBJECTIVES]: {
      type: ReportType.OBJECTIVE,
      selectorType: 'review',
      key: 'submitted',
    },

    [ReportPage.REPORT_APPROVED_OBJECTIVES]: {
      type: ReportType.OBJECTIVE,
      selectorType: 'review',
      key: 'approved',
    },
    [ReportPage.REPORT_MID_YEAR_REVIEW]: {
      type: ReportType.MYR,
      selectorType: 'review',
    },
    [ReportPage.REPORT_END_YEAR_REVIEW]: {
      type: ReportType.EYR,
      selectorType: 'review',
    },
    [ReportPage.REPORT_EYR_BREAKDOWN]: {
      type: ReportType.EYR,
      selectorType: 'overallRatings',
    },
    [ReportPage.REPORT_MYR_BREAKDOWN]: {
      type: ReportType.MYR,
      selectorType: 'overallRatings',
    },
    [ReportPage.REPORT_NEW_TO_BUSINESS]: {
      type: ReportType.NTB,
      selectorType: 'newToBusiness',
      key: 'new-to-business',
      title: t('colleagues', 'Colleagues'),
    },
    [ReportPage.REPORT_FEEDBACK]: {
      type: ReportType.FEEDBACK,
      selectorType: 'feedbacks',
    },
    [ReportPage.REPORT_ANNIVERSARY_REVIEWS]: {
      type: ReportType.EYR,
      selectorType: 'anniversaryReviews',
    },
    [ReportPage.REPORT_WORK_LEVEL]: {
      type: ReportType.OBJECTIVE,
      selectorType: 'leadershipReviews',
    },
  };

  const reportData = report[configKey];

  const chartData = useSelector(getReportByType(reportData?.selectorType)) ?? [];

  if (!chartData.length) return getDefaultData(configKey, t);

  const isOneChart =
    configKey === ReportPage.REPORT_SUBMITTED_OBJECTIVES ||
    configKey === ReportPage.REPORT_APPROVED_OBJECTIVES ||
    configKey === ReportPage.REPORT_NEW_TO_BUSINESS
      ? Object.entries(chartData.filter((chart) => chart.type === reportData.type)[0].statistics)
          //@ts-ignore
          ?.find((item) => item[0] === reportData?.key)
          ?.slice(1)

          ?.map((item) => {
            return {
              [configKey === ReportPage.REPORT_NEW_TO_BUSINESS ? 'count' : 'percentage']:
                //@ts-ignore
                configKey === ReportPage.REPORT_NEW_TO_BUSINESS ? item.count : item.percentage,
              //@ts-ignore
              ...(reportData?.title && { title: reportData?.title }),
            };
          })
      : false;

  if (isOneChart) return isOneChart as Array<ChartReport>;

  const chart = Object.values(
    chartData.filter((chart) => chart.type === reportData.type)[0].statistics,
  ) as Array<ChartReport>;

  if (withTitles.includes(configKey)) {
    chart.forEach((item, index) => {
      item.title = t(Object.keys(chartData.filter((chart) => chart.type === reportData.type)[0].statistics)[index]);
    });
  }
  //TODO: remove until backend will be fixed
  // return chart;
  return chart.filter((item) => item.title !== 'Not submitted');
};
