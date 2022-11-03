import { CalibrationSession, RequestQuery } from '@pma/openapi';
import httpClient from '../config/client';

const uri = '/calibration/sessions';

export const getCalibrationSessions = (params: RequestQuery) => {
  // return httpClient.get(uri, { params });

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
  return httpClient.post(uri, data);
};

export const updateCalibrationSessions = (data: CalibrationSession) => {
  return httpClient.put(uri, data);
};

export const deleteCalibrationSessions = (params: { uuid: string }) => {
  const { uuid = undefined } = params;
  return httpClient.delete(`${uri}/${uuid}`);
};
