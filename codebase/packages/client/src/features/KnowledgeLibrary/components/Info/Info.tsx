import React, { FC } from 'react';
import { useStyle, Rule, Icon } from '@dex-ddl/core';

type Props = {
  description: string;
};

const Info: FC<Props> = ({ description }) => {
  const { css } = useStyle();

  return (
    <div className={css(wrapperRule)}>
      <Icon graphic='information' />
      <span className={css(descriptionRule)}>{description}</span>
    </div>
  );
};

const wrapperRule: Rule = () => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '16px 0 24px 0',
});

const descriptionRule: Rule = ({ font, colors, spacing }) => ({
  ...font.fixed.f14,
  color: colors.tescoBlue,
  padding: `${spacing.s0} ${spacing.s2}`,
});

export default Info;
