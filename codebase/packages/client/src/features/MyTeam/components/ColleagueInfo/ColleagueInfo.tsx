import React, { FC } from 'react';
import { colors, fontWeight, Rule, useStyle } from '@dex-ddl/core';

import { Avatar } from 'components/Avatar';
import { BaseEmployee } from 'config/types';

type Props = {
  firstName: string;
  lastName: string;
  jobName: string;
  businessType: string;
  manager?: BaseEmployee;
};

const ColleagueInfo: FC<Props> = ({ firstName, lastName, jobName, businessType, manager }) => {
  const { css } = useStyle();

  return (
    <div className={css(wrapperStyle)}>
      <div className={css({ display: 'flex', alignItems: 'center' })}>
        <Avatar size={40} />
      </div>
      <div className={css(headerBlockStyle)}>
        <span className={css(titleStyle)}>{`${firstName} ${lastName}`}</span>
        <span className={css(descriptionStyle)}>{`${jobName}, ${businessType}`}</span>
        {manager && <span className={css(managerStyle)}>{`${manager.firstName} ${manager.lastName}`}</span>}
      </div>
    </div>
  );
};

const wrapperStyle: Rule = {
  display: 'flex',
};

const headerBlockStyle: Rule = {
  display: 'grid',
  padding: '0 20px',
  alignSelf: 'center',
};

const titleStyle: Rule = {
  fontStyle: 'normal',
  fontWeight: fontWeight.bold,
  fontSize: '18px',
  lineHeight: '22px',
  color: colors.tescoBlue,
};

const descriptionStyle: Rule = {
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '16x',
  lineHeight: '18px',
  color: colors.base,
};

const managerStyle: Rule = {
  marginTop: '6px',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '12px',
  lineHeight: '14px',
  color: colors.base,
};

export default ColleagueInfo;
