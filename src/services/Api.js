// services/Api.js

import axios from 'axios';
import store from '@/store'; 

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
});

instance.interceptors.request.use(config => {
  const authToken = store.state.token; 
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export default instance;
