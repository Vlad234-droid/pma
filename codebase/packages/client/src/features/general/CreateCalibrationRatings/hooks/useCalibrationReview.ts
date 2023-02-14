import { useEffect } from 'react';
import {
  CalibrationReviewAction,
  calibrationReviewDataSelector,
  calibrationReviewMetaSelector,
  colleagueCurrentCycleSelector,
  SchemaActions,
} from '@pma/store';
import { useSelector } from 'react-redux';
import useDispatch from 'hooks/useDispatch';
import { useLocation, useParams } from 'react-router-dom';

export const useCalibrationReview = () => {
  const { state } = useLocation();
  const { currentCycle: cycle } = (state as any) || {};
  const { uuid, userUuid: colleagueUuid } = useParams<{ uuid: string; userUuid: string }>() as {
    uuid: string;
    userUuid: string;
  };
  const currentCycle = useSelector(colleagueCurrentCycleSelector(colleagueUuid));
  const dispatch = useDispatch();
  const { loading, loaded, updated } = useSelector(calibrationReviewMetaSelector);
  const calibrationReview = useSelector(calibrationReviewDataSelector(colleagueUuid)) || {};
  const isNew = uuid === 'new';

  useEffect(() => {
    if (!isNew) {
      dispatch(CalibrationReviewAction.getCalibrationReview({ colleagueUuid, cycleUuid: cycle || currentCycle }));
    }
    dispatch(SchemaActions.getSchema({ colleagueUuid, cycleUuid: cycle || currentCycle }));
  }, [currentCycle, colleagueUuid]);

  return {
    loading,
    loaded,
    updated,
    calibrationReview,
  };
};
