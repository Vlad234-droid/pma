import React, { FC } from 'react';
import { Rule, useStyle, useBreakpoints } from '@dex-ddl/core';

export const TEST_ID = 'layout-wrapper';

const Layout: FC = ({ children }) => {
  const { css } = useStyle();

  return (
    <div data-test-id={TEST_ID} className={css(layoutRule)}>
      {children}
    </div>
  );
};

const layoutRule: Rule = () => {
  const [, isBreakpoint] = useBreakpoints();
  const mobileScreen = isBreakpoint.small || isBreakpoint.xSmall || isBreakpoint.medium;
  return {
    ...(!mobileScreen ? {} : {}),
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100vh',
  };
};

export default Layout;
