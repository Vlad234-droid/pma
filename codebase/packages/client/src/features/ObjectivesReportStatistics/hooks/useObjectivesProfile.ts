import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPendingObjectivesSelector, getDoneObjectivesSelector, ReportActions } from '@pma/store';
import useQueryString from 'hooks/useQueryString';
import { ObjectiveType, ReportType } from '../config';
import { MetaDataReport } from 'config/enum';
import { useStatisticsReport } from 'features/Report/hooks';

const metaDataReport = [MetaDataReport.OBJECTIVES_SUBMITTED_PERCENTAGE, MetaDataReport.OBJECTIVES_APPROVED_PERCENTAGE];

export const useObjectivesProfile = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [objectiveType, setObjectiveType] = useState<ObjectiveType | null>(null);

  const query = useQueryString() as Record<string, string>;
  const navigate = useNavigate();

  const { objectivesSubmittedPercentage, objectivesApprovedPercentage } = useStatisticsReport([...metaDataReport]);

  useEffect(() => {
    if (!Object.entries(query).length || !query.year) navigate(-1);
  }, [query]);

  const getReport = useCallback(() => {
    dispatch(
      ReportActions.getObjectivesStatistics({
        year: query.year,
        topics_in: [...metaDataReport],
      }),
    );
    dispatch(
      ReportActions.getTargetingColleagues({
        year: query.year,
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(ReportActions.clearStatistics());
    if (pathname.includes(ObjectiveType.SUBMITTED.toLowerCase()) && pathname.includes('objectives')) {
      setObjectiveType(ObjectiveType.SUBMITTED);
      getReport();
      return;
    }
    setObjectiveType(ObjectiveType.APPROVED);
    getReport();
    return () => {
      dispatch(ReportActions.clearStatistics());
    };
  }, []);

  const getObjectiveType = () =>
    objectiveType && objectiveType === ObjectiveType.SUBMITTED
      ? ReportType.HAS_OBJECTIVE_SUBMITTED
      : ReportType.HAS_OBJECTIVE_APPROVED;

  const pending = useSelector(getPendingObjectivesSelector(getObjectiveType())) || [];

  const done = useSelector(getDoneObjectivesSelector(getObjectiveType())) || [];

  return [pending, done, objectiveType, objectivesSubmittedPercentage, objectivesApprovedPercentage];
};
