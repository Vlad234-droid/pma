import React, { FC } from 'react';
import { useStyle, Rule, Icon } from '@pma/dex-wrapper';

type Props = {
  description: string;
};

export const TEST_ID = 'info-component';

const Info: FC<Props> = ({ description }) => {
  const { css } = useStyle();

  return (
    <div data-test-id={TEST_ID} className={css(wrapperRule)}>
      <Icon graphic='information' iconStyles={{ minWidth: '24px' }} />
      <span className={css(descriptionRule)}>{description}</span>
    </div>
  );
};

const wrapperRule: Rule = () => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '16px 0 24px 0',
});

const descriptionRule: Rule = ({ font, colors, spacing }) => ({
  ...font.fixed.f14,
  color: colors.tescoBlue,
  padding: `${spacing.s0} ${spacing.s2}`,
});

export default Info;
