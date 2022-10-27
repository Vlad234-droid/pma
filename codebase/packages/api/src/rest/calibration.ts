import httpClient from '../config/client';

const uri = '/calibration/sessions';

export const getCalibrationSessions = (params: any) => {
  return httpClient.get(uri, { params });
};

export const createCalibrationSessions = (params: any) => {
  const { data = {} } = params;
  return httpClient.post(uri, data);
};
