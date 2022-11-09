import { CalibrationSession, RequestQuery } from '@pma/openapi';
import httpClient from '../config/client';

const domain = '/calibration';
type Config = { colleagueUuid: string; cycleUuid: string };

export const getCalibrationSessions = (params: RequestQuery) => {
  // todo remove after demo
  return new Promise((resolve) =>
    resolve({
      success: true,
      data: [
        {
          status: 'CREATED',
          title: 'title_title_title_CREATED',
          uuid: '10',
          startTime: '2022-10-25T14:19:49.853Z',
          description: 'string',
        },
        {
          status: 'COMPLETED',
          title: 'title_title_title_COMPLETED',
          uuid: '11',
          startTime: '2022-10-25T14:19:49.853Z',
          description: 'string',
        },
        {
          status: 'STARTED',
          title: 'title_title_title_STARTED',
          uuid: '12',
          startTime: '2022-10-25T14:19:49.853Z',
          description: 'STARTED',
        },
      ],
    }),
  );
};

export const createCalibrationSessions = (data: CalibrationSession) => {
  return httpClient.post(`${domain}/sessions`, data);
};

export const updateCalibrationSessions = (data: CalibrationSession) => {
  return httpClient.put(`${domain}/sessions`, data);
};

export const deleteCalibrationSessions = (params: { uuid: string }) => {
  const { uuid = undefined } = params;
  return httpClient.delete(`${domain}/sessions/${uuid}`);
};

export const getCalibrationReviews = ({ colleagueUuid, cycleUuid }: Config) =>
  httpClient.get(`${domain}/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/reviews`);

export const getCalibrationReviewByUuid = (uuid: string) => httpClient.post(`${domain}/colleagues/reviews/${uuid}`);

export const createCalibrationReview = ({ colleagueUuid, cycleUuid }: Config, data: any) =>
  httpClient.post(`${domain}/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/reviews`, data);

export const updateCalibrationReview = ({ colleagueUuid, cycleUuid }: Config, data: any) =>
  httpClient.put(`${domain}/colleagues/${colleagueUuid}/pm-cycles/${cycleUuid}/reviews`, data);
///calibration
