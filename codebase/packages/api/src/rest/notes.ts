import httpClient from '../config/client';

const domain = '/notes';

export const createFolderNotes = (params: any) => {
  return httpClient.post(`${domain}/folders`, params);
};

export const getFoldersNotess = (params: any) => {
  return httpClient.get(`${domain}/folders`, { params });
};

export const getNotes = (params: any) => {
  return httpClient.get(`${domain}`, { params });
};
export const createNote = (params: any) => {
  return httpClient.post(`${domain}`, params);
};

export const deleteNote = (noteId: any) => {
  return httpClient.delete(`${domain}/${noteId}`);
};

export const deleteFolder = (folderId: any) => {
  return httpClient.delete(`${domain}/folders/${folderId}`);
};

export const updateNote = (params: any) => {
  const { id } = params;
  return httpClient.put(`${domain}/${id}`, params);
};

export const updateFolder = (params: any) => {
  const { id } = params;
  return httpClient.put(`${domain}/folders/${id}`, params);
};
