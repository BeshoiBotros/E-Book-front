import axios from "axios";
import Cookies from "js-cookie";
import { BASE_API_URL } from "./main";

export interface LoginData {
  username: string;
  password: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
  role: string
}

export const loginUser = async (data: LoginData): Promise<TokenResponse> => {
  const res = await axios.post(`${BASE_API_URL}/accounts/token/`, data, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,  // Add this
  });
  return res.data;
};

export const getTokenFromCookies = (): string | undefined => {
  return Cookies.get("access");
};

import  { AxiosHeaders } from 'axios';  // Add AxiosHeaders import

// Create an Axios instance (optional, but recommended for managing configurations)
export const axiosInstance = axios.create({
  baseURL: 'https://turism.smartsminds.com',
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getTokenFromCookies();

    if (token) {
      // Initialize headers if undefined
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      // Use .set() to add the Bearer token
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);