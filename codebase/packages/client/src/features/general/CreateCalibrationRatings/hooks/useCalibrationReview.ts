import { useEffect } from 'react';
import {
  CalibrationReviewAction,
  calibrationReviewDataSelector,
  calibrationReviewMetaSelector,
  userPerformanceCyclesSelector,
  SchemaActions,
} from '@pma/store';
import { useSelector } from 'react-redux';
import useDispatch from 'hooks/useDispatch';
import { useParams } from 'react-router-dom';

export const useCalibrationReview = () => {
  const [cycle] = useSelector(userPerformanceCyclesSelector);
  const { uuid, userUuid: colleagueUuid } = useParams<{ uuid: string; userUuid: string }>() as {
    uuid: string;
    userUuid: string;
  };
  const { loading, loaded, updated } = useSelector(calibrationReviewMetaSelector);

  const calibrationReview = useSelector(calibrationReviewDataSelector(colleagueUuid)) || {};

  const isNew = uuid === 'new';

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isNew) {
      //TODO: replace CURRENT to cycle uuid in future
      cycle && dispatch(CalibrationReviewAction.getCalibrationReview({ colleagueUuid, cycleUuid: 'CURRENT' }));
    }
    dispatch(SchemaActions.getSchema({ colleagueUuid, cycleUuid: 'CURRENT' }));

    return () => {
      dispatch(CalibrationReviewAction.clearCalibrationReview());
    };
  }, [cycle]);
  return {
    loading,
    loaded,
    updated,
    calibrationReview,
  };
};
