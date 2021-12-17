import React, { FC } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Rule, useStyle, useBreakpoints } from '@dex-ddl/core';
import { Header } from 'components/Header';
import { Page } from 'pages/types';
import { pages } from 'pages';
import { buildPath, getPageFromPath } from 'features/Routes/utils';

export const TEST_ID = 'layout-wrapper';

const Layout: FC = ({ children }) => {
  const { css } = useStyle();
  const history = useHistory();

  const handleBack = () => history.goBack();

  return (
    <div data-test-id={TEST_ID} className={css(layoutRule)}>
      <Route path={[...Object.values(Page).map((page) => buildPath(page))]}>
        {({ match }) => {
          //TODO: use separate component
          const { title, withHeader } = pages[getPageFromPath(match?.path)] || {};

          return withHeader ? <Header title={title} onBack={handleBack} /> : null;
        }}
      </Route>
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
    padding: '8px',
  };
};

export default Layout;
