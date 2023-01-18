import { useEffect } from 'react';
import { CalibrationSessionStatusEnum } from '@pma/openapi';
import { CalibrationSessionsAction, calibrationSessionsMetaSelector, getCalibrationSessionSelector } from '@pma/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useDispatch from 'hooks/useDispatch';

export const useCalibrationSession = () => {
  const { sessionUuid } = useParams<{ sessionUuid: string }>() as {
    sessionUuid: string;
  };
  const dispatch = useDispatch();

  const calibrationSession = useSelector(getCalibrationSessionSelector(sessionUuid || '')) || {};
  const { loading: csLoading } = useSelector(calibrationSessionsMetaSelector);
  const isStarted =
    calibrationSession?.status === CalibrationSessionStatusEnum.Started ||
    calibrationSession?.status === CalibrationSessionStatusEnum.Updated;

  useEffect(() => {
    dispatch(CalibrationSessionsAction.getCalibrationSessions({}));
  }, []);
  return { csLoading, isStarted };
};
