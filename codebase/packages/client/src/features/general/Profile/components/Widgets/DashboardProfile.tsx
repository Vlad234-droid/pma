import React, { FC, useContext } from 'react';
import AuthContext from 'contexts/authContext';
import { Profile } from 'features/general/Profile';

const DashboardProfile: FC = () => {
  const {
    user: { fullName, job, department, manager },
  } = useContext<any>(AuthContext);

  return <Profile fullName={fullName} job={job} department={department} manager={manager} />;
};

export default DashboardProfile;
