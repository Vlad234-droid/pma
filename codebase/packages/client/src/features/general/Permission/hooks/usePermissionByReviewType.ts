import { useSelector } from 'react-redux';
import { colleagueUUIDSelector, userReviewTypesSelector } from '@pma/store';
import { checkPermissions } from '../utils';

export default (actions: Array<string>) => {
  const colleagueUuid = useSelector(colleagueUUIDSelector);
  const reviewTypes = useSelector(userReviewTypesSelector(colleagueUuid));

  return checkPermissions(actions, reviewTypes);
};
