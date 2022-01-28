import React, { FC, useMemo } from 'react';
import { useLocation, useNavigate, matchPath } from 'react-router-dom';
import { Rule, useBreakpoints, useStyle } from '@dex-ddl/core';
import { pages } from 'pages';
import { buildPath } from 'features/Routes/utils';
import { Header } from 'components/Header';

export const TEST_ID = 'layout-wrapper';

const Layout: FC = ({ children }) => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { title, withHeader, backPath, withIcon, iconName } = useMemo(() => {
    const page = Object.keys(pages).find((page) => matchPath(page, pathname)) || '';
    return pages[page] || {};
  }, [pathname]);

  const handleBack = (backPath = '/') => navigate(backPath, { replace: true });

  return (
    <div data-test-id={TEST_ID} className={css(layoutRule)}>
      {/*TODO: use separate component*/}
      {withHeader && (
        <Header
          title={title}
          withIcon={withIcon}
          iconName={iconName}
          onBack={backPath ? () => handleBack(buildPath(backPath)) : undefined}
        />
      )}
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
    minHeight: '100vh',
    maxHeight: '100vh',
    overflowY: 'auto',
    padding: '8px 16px 80px',
  };
};

export default Layout;
