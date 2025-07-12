import axiosInstance from './axiosInstance';

export const createTodo = (data) => axiosInstance.post('/todo', data);
export const getTodos = (params) => axiosInstance.get('/todo', { params });
export const updateTodo = (id, data) => axiosInstance.put(`/todo/${id}`, data);
export const deleteTodo = (id) => axiosInstance.delete(`/todo/${id}`);