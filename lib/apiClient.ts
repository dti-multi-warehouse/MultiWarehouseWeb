import axios from 'axios';
import { getSession } from 'next-auth/react';

const apiClient = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, //api
  baseURL: 'http://localhost:8080', //api
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});


export default apiClient;
