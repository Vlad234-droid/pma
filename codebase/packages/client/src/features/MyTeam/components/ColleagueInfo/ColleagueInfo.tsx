import React, { FC } from 'react';
import { colors, fontWeight, Rule, useStyle } from '@pma/dex-wrapper';

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
    <div data-test-id='colleague-info' className={css(wrapperStyles)}>
      <div className={css(avatarWrapperStyles)}>
        <Avatar size={40} />
      </div>
      <div className={css(headerBlockStyles)}>
        <span className={css(titleStyles)}>{`${firstName} ${lastName}`}</span>
        <span className={css(descriptionStyles)}>{`${jobName}, ${businessType}`}</span>
        {manager && (
          <span className={css(managerStyles)}>{`${t('line_manager', 'Line manager')}: ${manager.firstName} ${
            manager.lastName
          }`}</span>
        )}
      </div>
    </div>
  );
};

const wrapperStyles: Rule = {
  display: 'flex',
};

const avatarWrapperStyles: Rule = {
  display: 'flex',
  alignItems: 'center',
};

const headerBlockStyles: Rule = {
  display: 'grid',
  padding: '0 20px',
  alignSelf: 'center',
};

const titleStyles: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: fontWeight.bold,
  fontSize: `${theme.font.fixed.f18.fontSize}`,
  lineHeight: `${theme.font.fixed.f18.lineHeight}`,
  color: colors.tescoBlue,
});

const descriptionStyles: Rule = ({ theme }) => ({
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: `${theme.font.fixed.f16.fontSize}`,
  lineHeight: `${theme.font.fixed.f16.lineHeight}`,
  color: colors.base,
});

const managerStyles: Rule = ({ theme }) => ({
  marginTop: '6px',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: `${theme.font.fixed.f12.fontSize}`,
  lineHeight: `${theme.font.fixed.f12.lineHeight}`,
  color: colors.base,
});

export default ColleagueInfo;
