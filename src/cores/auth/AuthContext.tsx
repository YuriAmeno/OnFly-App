import { IUser_Auth } from 'cores/user';
import { IAuthModel } from './_models';
import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
} from 'react';

type AuthContextProps = {
  auth: IAuthModel | undefined;
  saveAuth: (auth: IAuthModel | undefined) => void;
  currentUser: IUser_Auth | undefined;
  setCurrentUser: Dispatch<SetStateAction<IUser_Auth | undefined>>;
  logout: () => void;
};

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  currentFranchise: undefined,
  setCurrentFranchise: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();
  const [currentFranchise, setCurrentFranchise] = useState<TFranchiseResponse | undefined>();
  useEffect(() => {
    if (currentUser === undefined || auth === undefined || currentUser!.first_login) {
      return;
    }
    async function init() {
      const franchise = await getUserFranchise();
      setCurrentFranchise(franchise);
    }
    init();
  }, [currentUser]);
  const saveAuth = (auth: AuthModel | undefined) => {
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
    <AuthContext.Provider
      value={{ auth, saveAuth, currentUser, setCurrentUser, currentFranchise, setCurrentFranchise, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, logout, setCurrentUser } = useAuth();
  const didRequest = useRef(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application

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
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };

    if (auth && auth.api_token) {
      requestUser(auth.api_token);
    } else {
      logout();
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>;
};

export { AuthProvider, AuthInit, useAuth };
