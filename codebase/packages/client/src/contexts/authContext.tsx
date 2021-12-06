import React, { createContext, FC, useCallback, useContext, useEffect } from 'react';
import { LINKS } from 'config/constants';
// store
import { currentUserMetaSelector, currentUserSelector, UerActions } from '@pma/store';

// config
import User from 'config/entities/User';

// hooks
import useDispatch from 'hooks/useDispatch';
import { useSelector } from 'react-redux';

type LoginAction = (payload: { email: string; password: string }) => void;
type LogoutAction = () => void;

type AuthData = {
  authenticated: boolean;
  user?: User;
  accessToken?: string;
  login: LoginAction;
  logout: LogoutAction;
};

const defaultData = {
  authenticated: false, // to check if authenticated or not
  login: () => undefined, // to start the login process
  logout: () => undefined, // logout the user
};

const AuthContext = createContext<AuthData>(defaultData);

export const AuthProvider: FC = ({ children }) => {
  const { info, authenticated } = useSelector(currentUserSelector) || {};
  const { loaded, error } = useSelector(currentUserMetaSelector) || {};

  const dispatch = useDispatch();

  useEffect(() => {
    if (!loaded) dispatch(UerActions.getCurrentUser());
  }, [loaded]);

  const loginAction: LoginAction = useCallback((payload) => dispatch(UerActions.login(payload)), []);

  const logoutAction: LogoutAction = useCallback(() => dispatch(UerActions.logout()), []);

  if (error?.code === 'UNAUTHENTICATED') {
    window?.location.replace(LINKS.signOut);
    return null;
  }

  if (!loaded) return null;

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user: info,
        login: loginAction,
        logout: logoutAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
export const useAuthContainer = () => useContext(AuthContext);

export default AuthContext;
