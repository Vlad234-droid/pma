import React, { FC, useContext, useEffect, useMemo } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { pages } from 'pages';
import { buildPath } from 'features/Routes/utils';
import { CanPerform, role } from 'features/Permission';
import AccessDenied from 'components/AccessDenied';
import { Header } from 'components/Header';
import authContext from 'contexts/authContext';
import headerContext from 'contexts/headerContext';

export const TEST_ID = 'layout-wrapper';

const notHaveAccessMessage = `
  not_using_system_at_the_moment
  
  raise_a_ticket_to_access
  
  [go_to_ourtesco_com](https://ourtesco.com)
`;

const systemNotAvailableMessage = `
   system_not_available_at_the_moment
   
   please_try_again
   
   [go_to_ourtesco_com](https://ourtesco.com)
  `;

const Layout: FC = ({ children }) => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { error } = useContext(authContext);
  const { linkTitle } = useContext(headerContext);
  const { title, withHeader, backPath, withIcon, iconName } = useMemo(() => {
    const page = Object.keys(pages).find((page) => matchPath(page, pathname)) || '';
    const pageData = pages?.[page] || {};
    return { ...pageData, title: linkTitle?.[page] ? linkTitle[page] : pageData?.title };
  }, [pathname, linkTitle]);

  const handleBack = (backPath = '/') => navigate(backPath, { replace: true });

  useEffect(() => {
    const script = document.createElement('script');
    script.innerText = `window["adrum-start-time"] = new Date().getTime(); (function(config){ config.appKey = "AD-AAB-ABN-WNX"; config.adrumExtUrlHttp = "http://cdn.appdynamics.com"; config.adrumExtUrlHttps = "https://cdn.appdynamics.com"; config.beaconUrlHttp = "http://pdx-col.eum-appdynamics.com"; config.beaconUrlHttps = "https://pdx-col.eum-appdynamics.com"; config.resTiming = {"bufSize":200,"clearResTimingOnBeaconSend":true}; config.maxUrlLength = 512; })(window["adrum-config"] || (window["adrum-config"] = {}));`;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//cdn.appdynamics.com/adrum/adrum-20.12.0.3360.js';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <CanPerform
      perform={[role.COLLEAGUE]}
      yes={() => (
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
      )}
      no={() => (
        <AccessDenied massage={error?.code === 'SERVER_ERROR' ? systemNotAvailableMessage : notHaveAccessMessage} />
      )}
    />
  );
};
const layoutRule: Rule = () => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  minHeight: '100vh',
  maxHeight: '100vh',
  overflowY: 'auto',
  padding: '8px 16px 80px',
});

export default Layout;
