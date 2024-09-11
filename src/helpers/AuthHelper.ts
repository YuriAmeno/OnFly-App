import { IAuthModel } from 'cores';

const AUTH_LOCAL_STORAGE_KEY = 'token-api';

const getAuth = (): IAuthModel | undefined => {
  if (!localStorage) {
    return;
  }

  const storageValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);

  if (!storageValue) {
    return;
  }

  try {
    const auth: IAuthModel = JSON.parse(storageValue) as IAuthModel;
    if (auth) {
      return auth;
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error);
  }
};

const setAuth = (auth: IAuthModel) => {
  if (!localStorage) {
    return;
  }

  try {
    const storageValue = JSON.stringify(auth);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, storageValue);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error);
  }
};

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json';
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string } }) => {
      const auth = getAuth();
      if (auth && auth.api_token) {
        config.headers.Authorization = `Bearer ${auth.api_token}`;
      }

      return config;
    },
    (err: any) => Promise.reject(err),
  );
}

export { getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY };
