import { CalibrationSession, RequestQuery } from '@pma/openapi';
import httpClient from '../config/client';

const uri = '/calibration/sessions';

export const getCalibrationSessions = (params: RequestQuery) => {
  return httpClient.get(uri, { params });
};

export const createCalibrationSessions = (data: CalibrationSession) => {
  return httpClient.post(uri, data);
};

export const updateCalibrationSessions = (data: CalibrationSession) => {
  return httpClient.put(uri, data);
};

export const deleteCalibrationSessions = (params: { uuid: string }) => {
  const { uuid = undefined } = params;
  return httpClient.delete(`${uri}/${uuid}`);
};
