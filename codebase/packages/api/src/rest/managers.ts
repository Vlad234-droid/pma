import httpClient from '../config/client';

const domain = '/managers';

const reviews = 'reviews';
const full_team_reviews = 'full-team-reviews';

export const getManagers = (params?: any) => {
  const { colleagueUuid, fullTeam } = params;

  return httpClient.get(`${domain}/${colleagueUuid}/${fullTeam ? full_team_reviews : reviews}`, {
    params: { colleagueUuid },
  });
};
