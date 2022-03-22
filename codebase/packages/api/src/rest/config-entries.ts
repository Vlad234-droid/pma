import httpClient from '../config/client';

const domain = '/config-entries';

export const getConfigEntries = () => {
  return httpClient.get(`${domain}/roots`);
};

export const getConfigEntriesByUuid = ({ uuid }) => {
  return httpClient.get(`${domain}/${uuid}`);
};
