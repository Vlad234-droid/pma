import React, { FC } from 'react';
import { useStyle, Rule, Icon } from '@pma/dex-wrapper';

export const WRAPPER_ID = 'wrapper-id';

const InfoBlock: FC<{ text: string }> = ({ text }) => {
  const { css } = useStyle();

  return (
    <div className={css(wrapperStyle)} data-test-id={WRAPPER_ID}>
      <Icon graphic='information' size={'20px'} />
      <span className={css(textStyle)}>{text}</span>
    </div>
  );
};

const wrapperStyle: Rule = ({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  ':hover': {
    textDecoration: 'underline',
    color: theme.colors['hoverBlue'],

    '& path': {
      fill: theme.colors['hoverBlue'],
    },
  },
});

const textStyle: Rule = ({ theme }) => ({
  ...theme.font.fixed.f16,
  color: theme.colors.tescoBlue,
  padding: `${theme.spacing.s0} ${theme.spacing.s2}`,
});

export default InfoBlock;
