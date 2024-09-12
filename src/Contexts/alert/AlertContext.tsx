import { createContext, FC, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';
import { IAlertContext } from 'cores/alert';

export const AlertContext = createContext<IAlertContext>({} as IAlertContext);

const useAlert = () => useContext(AlertContext);

const AlertProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingError, setIsLoadingError] = useState(false);
  const [isLoadingSuccess, setIsLoadingSuccess] = useState(false);
  const [msg, setMsg] = useState('');

  return (
    <AlertContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isLoadingError,
        setIsLoadingError,
        msg,
        setMsg,
        setIsLoadingSuccess,
        isLoadingSuccess,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export { AlertProvider, useAlert };
