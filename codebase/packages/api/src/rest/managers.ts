import httpClient from '../config/client';

const domain = '/managers';

const REVIEWS = 'reviews';
const FULL_TEAM_REVIEWS = 'reviews/full-team';

export const getManagersReviews = (params: {
  colleagueUuid: string;
  fullTeam: string;
  colleagueCycleStatuses?: string[];
  ({ ...any });
}) => {
  const { colleagueUuid, fullTeam, colleagueCycleStatuses, ...restParams } = params;

  const parameters = colleagueCycleStatuses
    ? { colleagueCycleStatuses: colleagueCycleStatuses.toString(), ...restParams }
    : restParams;

  return httpClient.get(`${domain}/${colleagueUuid}/${fullTeam ? FULL_TEAM_REVIEWS : REVIEWS}`, {
    params: parameters,
  });
};
