import React, { FC } from 'react';
import { useStyle, Rule, Icon } from '@pma/dex-wrapper';

export const WRAPPER_ID = 'wrapper-id';

const InfoBlock: FC<{ text: string }> = ({ text }) => {
  const { css } = useStyle();

  return (
    <div className={css(wrapperStyle)} data-test-id={WRAPPER_ID}>
      <Icon graphic='information' size={'18px'} />
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
