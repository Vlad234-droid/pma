import { useLocation } from 'react-router-dom';
import qs from 'qs';

export default () => {
  const { search } = useLocation();
  if (!search) return {};
  return qs.parse(search, { ignoreQueryPrefix: true });
};
