import { createSelector } from 'reselect';
//@ts-ignore
import { RootState } from 'typesafe-actions';
import { Status } from '../../../client/src/config/enum';

export const reportSelector = (state: RootState) => state.report;
const statusIndex = 8;

export const approvedObjectivesSelector = createSelector(reportSelector, (report: any) => {
  const { objectiveReports } = report;
  const approvedCount = objectiveReports.filter((item) => item[statusIndex] === Status.APPROVED).length;
  const approvedPercent = Math.floor((100 * approvedCount) / objectiveReports.length);
  return [approvedPercent, 'Approved'];
});

export const notApprovedObjectivesSelector = createSelector(reportSelector, (report: any) => {
  const { objectiveReports } = report;
  const notApprovedCount = objectiveReports.filter((item) => item[statusIndex] !== Status.APPROVED).length;
  const notApprovedPercent = Math.floor((100 * notApprovedCount) / objectiveReports.length) || 0;
  return [notApprovedPercent, 'Not approved'];
});
