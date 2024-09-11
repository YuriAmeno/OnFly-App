export interface IAlertContext {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingError: boolean;
  setIsLoadingError: React.Dispatch<React.SetStateAction<boolean>>;
  isLoadingSuccess: boolean;
  setIsLoadingSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  msg: string | undefined | any;
  setMsg: React.Dispatch<React.SetStateAction<string | undefined | any>>;
}
