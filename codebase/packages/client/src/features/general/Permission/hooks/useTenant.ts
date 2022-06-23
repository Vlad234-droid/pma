import { useContext } from 'react';
import authContext from 'contexts/authContext';

const useTenant = () => {
  const { tenant } = useContext(authContext);
  return tenant;
};

export default useTenant;
