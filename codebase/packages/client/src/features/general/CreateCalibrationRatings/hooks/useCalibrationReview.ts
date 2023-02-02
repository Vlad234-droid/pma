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
import { useParams } from 'react-router-dom';

export const useCalibrationReview = () => {
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
      dispatch(CalibrationReviewAction.getCalibrationReview({ colleagueUuid, cycleUuid: currentCycle }));
    }
    dispatch(SchemaActions.getSchema({ colleagueUuid, cycleUuid: currentCycle }));

    return () => {
      dispatch(CalibrationReviewAction.clearCalibrationReview());
    };
  }, []);

  return {
    loading,
    loaded,
    updated,
    calibrationReview,
  };
};
