import React, { FC } from 'react';
import { AuthConsumer } from 'contexts/authContext';
import { Profile } from 'features/Profile';

const DashboardProfile: FC = () => (
  <AuthConsumer>
    {({ user = {} }) => {
      // @ts-ignore
      const { fullName, job, department, manager } = user;
      return <Profile fullName={fullName} job={job} department={department} manager={manager} />;
    }}
  </AuthConsumer>
);

export default DashboardProfile;
