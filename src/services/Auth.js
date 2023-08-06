// services/Auth.js
import axios from "axios";
import store from "../store";
import router from "../router";

const authApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const Auth = {
  signin: (data) => {
    return authApi.post('/signin', data)
      .then(response => {
        if (response.data.success) {
          
          return response.data; // Return the response data
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch(error => {
        throw error;
      });
  },
  signup: (data) => {
    return authApi.post('/signup', data)
      .then(response => {
        if (response.data.success) {
          return response.data; 
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch(error => {
        throw error;
      });
  },
  logout: () => {
    localStorage.removeItem('token'); 
    store.commit('SET_TOKEN', null); 
    router.push('/signin');            
  }
};