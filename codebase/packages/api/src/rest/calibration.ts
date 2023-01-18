import { CalibrationSession, RequestQuery } from '@pma/openapi';
import httpClient from '../config/client';
import qs from 'qs';

const domain = '/calibration';
type Config = { colleagueUuid: string; cycleUuid: string };

export const getCalibrationSessions = (params: RequestQuery) => {
  return httpClient.get(`${domain}/sessions`, { params });
};

export const createCalibrationSessions = (data: CalibrationSession) => {
  return httpClient.post(`${domain}/sessions`, data);
};

export const updateCalibrationSessions = (data: CalibrationSession) => {
  return httpClient.put(`${domain}/sessions/${data.uuid}`, data);
};

export const deleteCalibrationSessions = (params: { uuid: string }) => {
  const { uuid = undefined } = params;
  return httpClient.delete(`${domain}/sessions/${uuid}`);
};

export const startCalibrationSession = (data: CalibrationSession) => {
  return httpClient.put(`${domain}/sessions/${data.uuid}/start`, data);
};

export const closeCalibrationSession = (data: CalibrationSession) => {
  return httpClient.put(`${domain}/sessions/${data.uuid}/close`, data);
};

export const cancelCalibrationSession = (uuid: string) => {
  return httpClient.delete(`${domain}/sessions/${uuid}/cancel`);
};

export const getCalibrationReviews = ({ colleagueUuid, cycleUuid }: Config) =>
  httpClient.get(`${domain}/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/reviews`);

export const getCalibrationReviewByUuid = (uuid: string) => httpClient.post(`${domain}/colleagues/reviews/${uuid}`);

export const createCalibrationReview = ({ colleagueUuid, cycleUuid }: Config, data: any) =>
  httpClient.post(`${domain}/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/reviews`, data);

export const updateCalibrationReview = ({ colleagueUuid, cycleUuid }: Config, data: any) =>
  httpClient.put(`${domain}/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/reviews`, data);
///calibration

export const getCalibrationFilter = (params: RequestQuery) => {
  return httpClient.get(`${domain}/sessions/filters`, {
    params,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'indices' });
    },
  });
};

export const createCalibrationSessionReview = ({ sessionUuid, colleagueUuid, cycleUuid }, data) =>
  httpClient.post(`${domain}/sessions/${sessionUuid}/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/reviews`, data);

export const getCalibrationColleagues = (params: RequestQuery) => {
  return httpClient.get(`${domain}/sessions/colleagues`, {
    params,
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'indices' });
    },
  });
};

export const getCalibrationSessionColleagues = (params: any, sessionUuid: string) => {
  return httpClient.get(`${domain}/sessions/${sessionUuid}/colleagues`, {
    params,
  });
};

export const getUserCalibrationReviews = (params: any) => {
  const { sessionUuid, ...restParams } = params;
  const URL = sessionUuid ? `${domain}/sessions/${sessionUuid}/reviews` : `${domain}/reviews`;
  return httpClient.get(URL, {
    params: restParams,
  });
};

export const getCalibrationStatistics = (params = {}) => {
  //@ts-ignore
  const { sessionUuid, ...restParams } = params;
  const URL = sessionUuid ? `${domain}/sessions/${sessionUuid}/statistics` : `${domain}/statistics`;

  return httpClient.get(URL, {
    params: restParams,
  });
};
export const getCalibrationStatisticsRatings = (params = {}) => {
  //@ts-ignore
  const { sessionUuid, ...restParams } = params;
  const URL = sessionUuid ? `${domain}/sessions/${sessionUuid}/statistics/ratings` : `${domain}/statistics/ratings`;

  return httpClient.get(URL, {
    params: restParams,
  });
};

export const uploadCalibrationUsersReviews = (params: any) => {
  const { sessionUuid, ...restParams } = params;
  const URL = sessionUuid ? `${domain}/sessions/${sessionUuid}/reviews` : `${domain}/reviews`;
  return httpClient.get(URL, {
    params: restParams,
  });
};
