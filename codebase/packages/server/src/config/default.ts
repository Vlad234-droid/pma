export const defaultConfig = {
  applicationName: 'Performance Management Application',
  defaultRole: 'Viewer',
  port: 9000,
  oidcGroupFiltersRegex: [/GG-UK-TescoGlobal-(-[\w\d]+)+/],
  applicationCookieParserSecret: 'tesco.pma.session',
  applicationUserDataCookieName: 'tesco.pma.userinfo',
  cacheIdentityTokenKey: 'application.scope.identity.token',
  authPath: '/auth',
  buildPath: 'build',
  mfModule: 'tesco-pma.js',
  SSOLogoutPath: '/sso/logout',
  oidcRedirectAfterLogoutPath: '/sso/logout/callback',
};
