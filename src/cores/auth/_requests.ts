import axios from 'axios';
import { TLogin, TRegister } from 'cores';

const API_URL = process.env.REACT_APP_API_URL;

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
export function register({ email, password, name }: TRegister) {
  return axios.post(REGISTER_URL, {
    email,
    name,
    password,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
// export function requestPassword(email: string) {
//   return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
//     email,
//   });
// }

// type TUserByToken = {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export function getUserByToken(token: string) {
//   const headers = {
//     Accept: 'Application/json',
//     Authorization: `Bearer ${token}`,
//   };

//   return axios
//     .get<AxiosResponse<UserModel>>(GET_USER_BY_ACCESSTOKEN_URL, { headers })
//     .then((response) => response.data)
//     .then((response) => response.data);
// }
