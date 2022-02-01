import React, { FC } from 'react';
import { colors, fontWeight, Rule, useStyle } from '@dex-ddl/core';

import { Avatar } from 'components/Avatar';
import { BaseEmployee } from 'config/types';
import { useTranslation } from 'components/Translation';

type Props = {
  firstName: string;
  lastName: string;
  jobName: string;
  businessType: string;
  manager?: BaseEmployee;
};

const ColleagueInfo: FC<Props> = ({ firstName, lastName, jobName, businessType, manager }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  return (
    <div data-test-id='colleague-info' className={css(wrapperStyle)}>
      <div className={css({ display: 'flex', alignItems: 'center' })}>
        <Avatar size={40} />
      </div>
      <div className={css(headerBlockStyle)}>
        <span className={css(titleStyle)}>{`${firstName} ${lastName}`}</span>
        <span className={css(descriptionStyle)}>{`${jobName}, ${businessType}`}</span>
        {manager && (
          <span className={css(managerStyle)}>{`${t('line_manager', 'Line manager')}: ${manager.firstName} ${
            manager.lastName
          }`}</span>
        )}
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

const titleStyle: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: fontWeight.bold,
  fontSize: `${theme.font.fixed.f18.fontSize}`,
  lineHeight: `${theme.font.fixed.f18.lineHeight}`,
  color: colors.tescoBlue,
});

const descriptionStyle: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: `${theme.font.fixed.f16.fontSize}`,
  lineHeight: `${theme.font.fixed.f16.lineHeight}`,
  color: colors.base,
});

const managerStyle: Rule = ({ theme }) => ({
  marginTop: '6px',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: `${theme.font.fixed.f12.fontSize}`,
  lineHeight: `${theme.font.fixed.f12.lineHeight}`,
  color: colors.base,
});

export default ColleagueInfo;
