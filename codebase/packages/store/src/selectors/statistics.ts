//@ts-ignore
import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';

interface SelectorFn {
  (reportingPeriodUuid: string, subsidiaryUui: string): any;
}

export const statisticsSelector = (state: RootState) => state.statistics;

export const bonusMeasuresReportDataSelector: SelectorFn = (reportingPeriodUuid, subsidiaryUuid) =>
  createSelector(statisticsSelector, (statistics) =>
    (statistics.bonusMeasures.data?.[reportingPeriodUuid]?.[subsidiaryUuid]?.data || []).reduce(
      (acc, [male, female], idx) => [...acc, { name: idx + 1, male, female }],
      [],
    ),
  );

export const bonusPayReportDataSelector: SelectorFn = (reportingPeriodUuid, subsidiaryUuid) =>
  createSelector(statisticsSelector, (statistics) =>
    statistics.bonusPay.data?.[reportingPeriodUuid]?.[subsidiaryUuid]?.data[0].slice(-2),
  );

export const bonusPayReportPopulationDataSelector: SelectorFn = (reportingPeriodUuid, subsidiaryUuid) =>
  createSelector(statisticsSelector, (statistics) =>
    statistics.bonusPay.data?.[reportingPeriodUuid]?.[subsidiaryUuid]?.data[0].slice(0, 2),
  );

export const hourlyPayReportDataSelector: SelectorFn = (reportingPeriodUuid, subsidiaryUuid) =>
  createSelector(statisticsSelector, (statistics) =>
    statistics.hourlyPay.data?.[reportingPeriodUuid]?.[subsidiaryUuid]?.data[0].slice(-2),
  );

export const hourlyPayReportPopulationDataSelector: SelectorFn = (reportingPeriodUuid, subsidiaryUuid) =>
  createSelector(statisticsSelector, (statistics) =>
    statistics.hourlyPay.data?.[reportingPeriodUuid]?.[subsidiaryUuid]?.data[0].slice(0, 2),
  );

export const payQuartilesReportDataSelector: SelectorFn = (reportingPeriodUuid, subsidiaryUuid) =>
  createSelector(statisticsSelector, (statistics) =>
    (statistics.payQuartiles.data?.[reportingPeriodUuid]?.[subsidiaryUuid]?.data || []).reduce(
      (acc, [name, male, female]) => [...acc, { name, male, female }],
      [],
    ),
  );

export const bonusPayDetailDataSelector = (reportingPeriodUuid: string) =>
  createSelector(statisticsSelector, (statistics) => {
    console.log(statistics, reportingPeriodUuid);
    return statistics.bonusPayDetail.data?.[reportingPeriodUuid] || {};
  });

export const hourlyPayDetailDataSelector = (reportingPeriodUuid: string) =>
  createSelector(statisticsSelector, (statistics) => {
    return statistics.hourlyPayDetail.data?.[reportingPeriodUuid] || {};
  });
