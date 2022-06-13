import React, { FC, useContext, useMemo } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { Rule, useStyle } from '@pma/dex-wrapper';
import { pages } from 'pages';
import { buildPath } from 'features/general/Routes/utils';
import { CanPerform, role } from 'features/general/Permission';
import AccessDenied from 'components/AccessDenied';
import { Header } from 'components/Header';
import authContext from 'contexts/authContext';
import headerContext from 'contexts/headerContext';
import { useTranslation, Trans } from 'components/Translation';
import MarkdownRenderer from 'components/MarkdownRenderer';
import { useFetchCommonData } from './useFetchCommonData';

export const TEST_ID = 'layout-wrapper';

const systemNotAvailableMessage = `
system_not_available_at_the_moment

please_try_again

[go_to_ourtesco_com](https://ourtesco.com)
`;

const A = ({ children, ...props }) => {
  const { css } = useStyle();
  return (
    <a className={css(link)} {...props} target='_blank'>
      <Trans>{children}</Trans>
    </a>
  );
};

const Yes: FC = ({ children }) => {
  const { css } = useStyle();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { linkTitle } = useContext(headerContext);

  const { title, withHeader, backPath, withIcon, iconName } = useMemo(() => {
    const page = Object.keys(pages).find((page) => matchPath(page, pathname)) || '';
    const pageData = pages?.[page] || {};
    return { ...pageData, title: linkTitle?.[page] ? linkTitle[page] : pageData?.title };
  }, [pathname, linkTitle]);

  const handleBack = (backPath = '/') => navigate(backPath, { replace: true });

  useFetchCommonData();

  return (
    <div data-test-id={TEST_ID} className={css(layoutRule)}>
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

const Layout: FC = ({ children }) => {
  const { css } = useStyle();
  const { t } = useTranslation();
  const { error } = useContext(authContext);

  const preHandleTrans = (str: string, replace: Record<string, string>) => {
    let res = t(str);
    Object.entries(replace).forEach(([key, value]) => {
      res = res.replace(key, value);
    });

    return res;
  };

  const raiseTicketMessage = preHandleTrans('raise_a_ticket_to_access', {
    '%colleague_help_link%': '[colleague_help_link_text](https://colleague-help.ourtesco.com/hc/en-us)',
    '%e_connect_link%': '[e_connect_link_text](https://e-connect.global.tesco.org/TicketCenter.aspx)',
  });

  const handleTabClose = () => {
    window.open('about:blank', '_self');
    window.close();
  };

  return (
    <CanPerform
      perform={[role.COLLEAGUE]}
      yes={() => <Yes>{children}</Yes>}
      no={() =>
        error?.code === 'SERVER_ERROR' ? (
          <AccessDenied message={systemNotAvailableMessage} />
        ) : (
          <AccessDenied
            customElement={
              <>
                <p className={css(text)}>
                  <Trans i18nKey='not_using_system_at_the_moment'>
                    You are seeing this message because your market is not yet using the Your Contribution System at the
                    moment.
                  </Trans>
                </p>
                <p className={css(text)}>
                  <MarkdownRenderer source={raiseTicketMessage} components={{ a: A }} />
                </p>
                <span className={css(text, button)} onClick={handleTabClose}>
                  <Trans i18nKey='close'>Close</Trans>
                </span>
              </>
            }
          />
        )
      }
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

const button: Rule = ({ theme }) => ({
  cursor: 'pointer',
  textAlign: 'center',
  backgroundColor: theme.colors.tescoBlue,
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fixed.f18.lineHeight,
  letterSpacing: '0px',
  padding: '20px 48px',
  color: theme.colors.white,
  borderRadius: '3px',
  marginTop: '32px',
  display: 'block',

  ':hover': {
    color: theme.colors.white,
  },
});

const link: Rule = ({ theme }) => ({
  fontSize: theme.font.fixed.f18.fontSize,
  lineHeight: theme.font.fixed.f18.lineHeight,
  color: theme.colors.tescoBlue,
});

const text: Rule = ({ theme }) => ({
  ...theme.font.fixed.f20,
  textAlign: 'center',
  margin: '0 0 7px',
});

export default Layout;
