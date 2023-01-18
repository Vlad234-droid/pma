import React, { FC } from 'react';
import { useTranslation } from 'components/Translation';
import { Rule, useStyle } from '@pma/dex-wrapper';

import { Icon } from 'components/Icon';

const DateBadge: FC<{ time: string }> = ({ time }) => {
  const { css } = useStyle();
  const { t } = useTranslation();

  return (
    <div className={css(wrapperStyles)}>
      <Icon graphic={'calenderFilled'} color={'tescoBlue'} iconStyles={iconStyles} title={'calender'} size={'17px'} />
      <span className={css(labelStyles)}>
        <div>{t('full_date', { date: new Date(time || '') })}</div>
      </span>
    </div>
  );
};

const wrapperStyles: Rule = ({ theme }) => ({
  display: 'flex',
  padding: '8px 16px',
  alignItems: 'center',
  background: theme.colors.white,
  borderRadius: '40px',
});

const iconStyles: Rule = {
  marginRight: '10px',
};

const labelStyles: Rule = ({ theme }) => ({
  fontSize: `${theme.font.fixed.f14.fontSize}`,
  lineHeight: `${theme.font.fixed.f14.lineHeight}`,
  letterSpacing: '0px',
  fontWeight: `${theme.font.weight.bold}`,
  display: 'block',
  color: theme.colors.base,
});

export default DateBadge;
