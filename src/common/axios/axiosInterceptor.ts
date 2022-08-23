import axios from 'axios';

export const customAxios = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

customAxios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw new Error(error);
  },
);
