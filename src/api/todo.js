import axiosInstance from './axiosInstance';

export const createTodo = (data) => axiosInstance.post('/todo', data);
export const getTodos = (params) => axiosInstance.get('/todo', { params });
export const updateTodo = (id, data) => axiosInstance.put(`/todo/${id}`, data);
export const deleteTodo = (id) => axiosInstance.delete(`/todo/${id}`);
export const changeStatus = (id, status) => axiosInstance.patch(`/todo/${id}/status`, { status });
export const exportTodos = (format) =>
  axiosInstance.get(`/todo/export?format=${format}`, {
    responseType: 'blob', 
  });
