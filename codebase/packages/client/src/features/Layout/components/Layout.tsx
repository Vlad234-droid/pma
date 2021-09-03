import React, { FC } from 'react';
import { Rule, useStyle } from 'styles';

export const TEST_ID = 'layout-wrapper';

const Layout: FC = ({ children }) => {
  const { css } = useStyle();

  return (
    <div data-testid={TEST_ID} className={css(layoutRule)}>
      {children}
    </div>
  );
};

const layoutRule: Rule = ({ theme }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  height: '100vh',
  background: theme.colors.backgroundDark,
});

export default Layout;
