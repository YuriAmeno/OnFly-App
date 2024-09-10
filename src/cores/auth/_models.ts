export interface IAuthModel {
  api_token: string;
}

export type TLogin = {
  email: string;
  password: string;
};

export type TRegister = {
  name: string;
  email: string;
  password: number;
};
