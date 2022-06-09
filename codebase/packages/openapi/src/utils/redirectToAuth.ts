export const redirectToAuth = (returnUri?: string) => {
  const applicationPrefix = process.env.PUBLIC_URL ?? '';
  const redirectToAuthKey = `${applicationPrefix}/redirectToAuth`;
  const redirectToAuth = window.localStorage.getItem(redirectToAuthKey);

  if (redirectToAuth === null) {
    window.localStorage.setItem(redirectToAuthKey, new Date().toISOString());

    setTimeout(() => {
      window.localStorage.removeItem(redirectToAuthKey);
      if (returnUri) {
        window.location.assign(`${applicationPrefix}/sso/auth?onelogin_return_uri=${encodeURI(returnUri)}`);
      } else {
        window.location.assign(`${applicationPrefix}/sso/auth`);
      }
    }, 100);
  }
};
