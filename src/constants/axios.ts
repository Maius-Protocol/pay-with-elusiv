import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api-pwe.maius.fun/api',
});
