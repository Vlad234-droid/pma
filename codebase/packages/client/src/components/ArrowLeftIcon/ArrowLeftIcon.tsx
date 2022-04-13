import React, { FC } from 'react';
import { useStyle, Rule } from '@pma/dex-wrapper';

import { Icon as IconComponent } from 'components/Icon';

const ArrowLeftIcon: FC<{ onClick: () => void; testId?: string }> = ({ onClick, testId = '' }) => {
  const { css } = useStyle();
  return (
    <span className={css(arrowLeftStyle)} onClick={onClick} data-test-id={testId}>
      <IconComponent graphic='arrowLeft' invertColors={true} />
    </span>
  );
};

const arrowLeftStyle: Rule = ({ theme }) => {
  const { matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  return {
    position: 'fixed',
    top: theme.spacing.s5,
    left: mobileScreen ? theme.spacing.s5 : theme.spacing.s10,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  };
};

export default ArrowLeftIcon;
