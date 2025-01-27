import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = async () => {
  return await axios.get(API_URL);
};

export const getUserById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const addUser = async (userData) => {
  return await axios.post(API_URL, userData);
};

export const editUser = async (id, userData) => {
  return await axios.put(`${API_URL}/${id}`, userData);
};

export const deleteUser = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
