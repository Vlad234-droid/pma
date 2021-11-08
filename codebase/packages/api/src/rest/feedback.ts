import httpClient from '../config/client';

const domain = '/v1/feedbacks';

export const createNewFeedback = (params?: any) => httpClient.post(`${domain}`, { params });
