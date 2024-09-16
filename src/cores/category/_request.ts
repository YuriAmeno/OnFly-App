
import axios, { AxiosResponse } from 'axios';
import { TCategory } from 'cores/category/_models';

const API_URL = process.env.REACT_APP_API_URL;

const CATEGORY_URL = `${API_URL}/product-categories`;

export function getAllCategory() {
    return axios
    .get(`${CATEGORY_URL}`)
    .then((response: any) => response.data)
    .then((response: any) => response.data)
}