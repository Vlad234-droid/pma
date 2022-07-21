import React, { FC } from 'react';
import { useStyle, Rule, Icon } from '@pma/dex-wrapper';

const InfoBlock: FC<{ text: string }> = ({ text }) => {
  const { css } = useStyle();

  return (
    <div className={css(wrapperStyle)}>
      <Icon graphic='information' />
      <span className={css(textStyle)}>{text}</span>
    </div>
  );
};

const wrapperStyle: Rule = { display: 'flex', alignItems: 'center' };

const textStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f14,
  color: theme.colors.tescoBlue,
  padding: `${theme.spacing.s0} ${theme.spacing.s2}`,
});

export default InfoBlock;
