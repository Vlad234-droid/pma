import { useEffect } from 'react';
import { CalibrationReviewAction, colleaguePerformanceCyclesSelector, SchemaActions } from '@pma/store';
import { useSelector } from 'react-redux';
import useDispatch from 'hooks/useDispatch';

export const useCalibrationReview = (isNew, colleagueUuid) => {
  const [cycle] = useSelector(colleaguePerformanceCyclesSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isNew) {
      //TODO: replace CURRENT to cycle uuid in future
      cycle &&
        dispatch(CalibrationReviewAction.getCalibrationReview({ colleagueUuid, cycleUuid: cycle?.uuid || 'CURRENT' }));
    }
    dispatch(SchemaActions.getSchema({ colleagueUuid }));
  }, [cycle]);
};
