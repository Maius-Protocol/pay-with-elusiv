import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api-pwe.maius.fun/api',
});
// export const axiosInstance = axios.create({
//   baseURL: 'http://0.0.0.0:3008/api',
// });
