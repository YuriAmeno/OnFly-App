import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const USER_URL = `${API_URL}/users`;

export function getAllUsers() {
    return axios
    .get(`${USER_URL}`)
    .then((response: any) => response.data)
    .then((response: any) => response.data)
}
