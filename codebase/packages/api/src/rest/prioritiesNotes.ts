import httpClient from '../config/client';

const domain = '/reviews';

export const createPriorityNote = ({ reviewUuid, ...params }: any) => {
  return httpClient.post(`${domain}/${reviewUuid}/notes`, { ...params });
};

export const getPriorityNoteByOwner = ({ reviewUuid, ownerColleagueUuid }: any) => {
  return httpClient.get(`${domain}/${reviewUuid}/notes?ownerUUID=${ownerColleagueUuid}`);
};

export const updatePriorityNote = ({ reviewUuid, ...params }: any) => {
  return httpClient.put(`${domain}/${reviewUuid}/notes`, { ...params });
};

export const deletePriorityNote = ({ noteId }: any) => {
  return httpClient.delete(`${domain}/notes/${noteId}`);
};
