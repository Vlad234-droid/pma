import React, { FC } from 'react';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { Employee } from 'config/types';

import ColleagueInfo from '../ColleagueInfo';

type Props = {
  employee: Employee;
  fullTeamView?: boolean;
  onClick?: () => void;
};

const ProfilePreview: FC<Props> = ({ employee, fullTeamView = false, onClick }) => {
  const { css } = useStyle();

  return (
    <div data-test-id='timeline-preview' className={css(wrapperStyles)} onClick={onClick}>
      <ColleagueInfo
        firstName={employee.firstName}
        lastName={employee.lastName}
        jobName={employee.jobName}
        businessType={employee.businessType}
        manager={fullTeamView ? employee.lineManager : undefined}
      />
    </div>
  );
};

export default ProfilePreview;

const wrapperStyles: Rule = {
  padding: '24px',
  display: 'flex',
};
