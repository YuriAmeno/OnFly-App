import { getUserByToken, IAuthModel, IUser_Auth, TAuthContextProps } from 'cores';
import React, { createContext, FC, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';

import * as authHelper from '../../helpers';
import LoginApp from 'pages/auth/Login';
import { DashboardApp } from 'pages';

export const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
};

export const AuthContext = createContext<TAuthContextProps>(initAuthContextPropsState);

const useAuth = () => useContext(AuthContext);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<IAuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<IUser_Auth | undefined>();

  const saveAuth = (auth: IAuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ auth, saveAuth, logout, currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit: FC<PropsWithChildren> = ({ children }) => {
  const { auth, logout, setCurrentUser } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const didRequest = useRef(false);

  useEffect(() => {
    const requestUser = async (apiToken: string) => {
      try {
        if (!didRequest.current) {
          const userByToken = await getUserByToken(apiToken);
          if (userByToken) {
            setCurrentUser(userByToken);
          }
        }
      } catch (error) {
        console.error(error);
        if (!didRequest.current) {
          logout();
        }
      } finally {
        setShowLogin(false);
      }

      return () => (didRequest.current = true);
    };

    if (auth && auth.api_token) {
      requestUser(auth.api_token);
    } else {
      logout();
      setShowLogin(false);
    }
    // eslint-disable-next-line
  }, []);

  console.log(showLogin);

  return showLogin ? <DashboardApp /> : <>{children}</>;
};

export { AuthProvider, AuthInit, useAuth };
