import { useEffect } from 'react';
import { CalibrationReviewAction, SchemaActions } from '@pma/store';
import useDispatch from 'hooks/useDispatch';

export const useCalibrationReview = (isNew, colleagueUuid) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isNew) {
      dispatch(CalibrationReviewAction.getCalibrationReview({ colleagueUuid, cycleUuid: 'CURRENT' }));
    }
    dispatch(SchemaActions.getSchema({ colleagueUuid }));
  }, []);
};
