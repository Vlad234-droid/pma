import httpClient from '../config/client';

const domain = '/managers';

const REVIEWS = 'reviews';
const FULL_TEAM_REVIEWS = 'full-team-reviews';

export const getManagers = (params?: any) => {
  const { colleagueUuid, fullTeam } = params;

  return httpClient.get(`${domain}/${colleagueUuid}/${fullTeam ? FULL_TEAM_REVIEWS : REVIEWS}`, {
    params: { colleagueUuid },
  });
};
