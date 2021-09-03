import React, { createContext, FC, useMemo, useCallback, useState } from 'react';

// config
import User from 'config/entities/User';

// hooks
import useDispatch from 'hooks/useDispatch';

// store
import { UerActions } from '@pma/store';

type LoginAction = (payload: { email: string; password: string }) => void;
type LogoutAction = () => void;

type AuthData = {
  authenticated: boolean;
  user: User | null;
  accessToken: string | null;
  login: LoginAction;
  logout: LogoutAction;
};

const defaultData = {
  authenticated: false, // to check if authenticated or not
  user: null, // store all the user details
  accessToken: null,
  login: () => null, // to start the login process
  logout: () => null, // logout the user
};

const AuthContext = createContext<AuthData>(defaultData);

type State = { user: User | null; token: string };

export const AuthProvider: FC = ({ children }) => {
  const [{ user, token }] = useState<State>({
    user: null,
    token: '',
  });
  const dispatch = useDispatch();

  const isAuthenticated = useMemo(() => Boolean(user?.id), [user]);

  const loginAction: LoginAction = useCallback((payload) => dispatch(UerActions.login(payload)), []);

  const logoutAction: LogoutAction = useCallback(() => dispatch(UerActions.logout()), []);

  return (
    <AuthContext.Provider
      value={{
        authenticated: isAuthenticated,
        user: user,
        accessToken: token,
        login: loginAction,
        logout: logoutAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;

export default AuthContext;
