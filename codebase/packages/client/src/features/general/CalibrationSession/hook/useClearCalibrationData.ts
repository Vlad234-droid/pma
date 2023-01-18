import { useEffect } from 'react';
import useDispatch from 'hooks/useDispatch';
import { CalibrationReviewsAction, CalibrationStatisticsAction } from '@pma/store';

export const useClearCalibrationData = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(CalibrationReviewsAction.clearCalibrationReviewsData());
      dispatch(CalibrationStatisticsAction.clearCalibrationStatistics());
    };
  }, []);
};
