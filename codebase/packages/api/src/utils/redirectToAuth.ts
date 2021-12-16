export const redirectToAuth = (returnUri?: string) => {
  const redirectToAuth = window.localStorage.getItem('redirectToAuth');
  const applicationRootPrefix = process.env.PUBLIC_URL ?? '';

  if (redirectToAuth === null) {
    window.localStorage.setItem('redirectToAuth', new Date().toISOString());

    setTimeout(() => {
      window.localStorage.removeItem('redirectToAuth');
      if (returnUri) {
        window.location.assign(`${applicationRootPrefix}/sso/auth?onelogin_return_uri=${encodeURI(returnUri)}`);
      } else {
        window.location.assign(`${applicationRootPrefix}/sso/auth`);
      }
    }, 100);
  }
};
