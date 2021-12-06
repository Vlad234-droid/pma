import httpClient from '../config/client';

const domain = '/colleagues';

export const stopSharingColleagueObjectives = (params: any) => {
  return httpClient.delete(
    `${domain}/${params.colleagueUuid}/pm-cycles/${params.cycleUuid}/review-types/objective/sharing`,
    { params: { ...params } },
  );
};

export const checkColleagueObjectivesShared = (params: any) => {
  return httpClient.get(
    `${domain}/${params.colleagueUuid}/pm-cycles/${params.cycleUuid}/review-types/objective/sharing`,
    { params: { ...params } },
  );
};

export const getAllCharedObjectives = (params: any) => {
  return httpClient.get(`${domain}/${params.colleagueUuid}/review-types/objective/sharing`, { params: { ...params } });
};

export const shareColleagueObjectives = (params: any) => {
  return httpClient.post(
    `${domain}/${params.colleagueUuid}/pm-cycles/${params.cycleUuid}/review-types/objective/sharing`,
    { params: { ...params } },
  );
};
