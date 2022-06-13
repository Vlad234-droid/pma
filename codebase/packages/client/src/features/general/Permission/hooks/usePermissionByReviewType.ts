import { useSelector } from 'react-redux';
import { userReviewTypesSelector } from '@pma/store';
import { checkPermissions } from '../utils';

export default (actions: Array<string>) => {
  const reviewTypes = useSelector(userReviewTypesSelector);

  return checkPermissions(actions, reviewTypes);
};
