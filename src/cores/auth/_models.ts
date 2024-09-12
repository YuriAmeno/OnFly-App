import { IUser_Auth } from 'cores/user';
import { Dispatch, SetStateAction } from 'react';

export interface IAuthModel {
  api_token: string;
}

export type TAuthContextProps = {
  auth: IAuthModel | undefined;
  saveAuth: (auth: IAuthModel | undefined) => void;
  currentUser: IUser_Auth | undefined;
  setCurrentUser: Dispatch<SetStateAction<IUser_Auth | undefined>>;
  logout: () => void;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TRegister = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
