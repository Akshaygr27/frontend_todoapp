import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const loginUser = (data) => axios.post(`${BASE_URL}/login`, data);
export const signupUser = (data) => axios.post(`${BASE_URL}/signup`, data);