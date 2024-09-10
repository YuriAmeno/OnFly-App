import axios from 'axios';
import { TLogin, TRegister } from 'cores';

const API_URL = process.env.REACT_APP_API_URL;

export const USER_URL = `${API_URL}/users`;

// export function get_user({ user_id }: TLogin) {
//   const headers = {
//     Accept: 'Application/json',
//   };
//   return axios.post(
//     LOGIN_URL,
//     {
//       email,
//       password,
//     },
//     { headers },
//   );
// }

// // Server should return AuthModel
// export function register({ email, password, name }: TRegister) {
//   return axios.post(REGISTER_URL, {
//     email,
//     name,
//     password,
//   });
// }
