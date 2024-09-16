
import axios from 'axios';
import { TProductCreate } from 'cores/product/_models';

const API_URL = process.env.REACT_APP_API_URL;

const PRODUCT_URL = `${API_URL}/tasks`;

export function createProduct(data: TProductCreate) {
    return axios
    .post(`${PRODUCT_URL}`, data)
    .then((response: any) => response.data)
    .then((response: any) => response.data)
}