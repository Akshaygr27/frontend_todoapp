import axiosInstance from './axiosInstance';

export const loginUser = (data) => axiosInstance.post('/login', data);
export const signupUser = (data) => axiosInstance.post('/signup', data);