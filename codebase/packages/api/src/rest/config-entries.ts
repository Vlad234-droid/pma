import httpClient from '../config/client';

const configEntriesDomain = '/config-entries';

export const getConfigEntries = () => {
  return httpClient.get(`${configEntriesDomain}/roots`);
};

export const getConfigEntriesByUuid = ({ uuid }) => {
  return httpClient.get(`${configEntriesDomain}/${uuid}`);
};
