import axios, { AxiosResponse } from 'axios';
import { IUser_Auth, TLogin, TRegister } from 'cores';

const API_URL = process.env.REACT_APP_API_URL;
export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;

export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/first-login`;

export function login({ email, password }: TLogin) {
  const headers = {
    Accept: 'Application/json',
  };
  return axios.post(
    LOGIN_URL,
    {
      email,
      password,
    },
    { headers },
  );
}

// Server should return AuthModel
export function register({ email, password, name, password_confirmation }: TRegister) {
  return axios.post(REGISTER_URL, {
    email,
    name,
    password,
    password_confirmation,
  });
}

export function getUserByToken(token: string) {
  const headers = {
    Accept: 'Application/json',
    Authorization: `Bearer ${token}`,
  };

  return axios
    .get<AxiosResponse<IUser_Auth>>(GET_USER_BY_ACCESSTOKEN_URL, { headers })
    .then((response) => response.data)
    .then((response) => response.data);
}
