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
}

export const loginUser = async (data: LoginData): Promise<TokenResponse> => {
  const res = await axios.post(`${BASE_API_URL}/accounts/token/`, data, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

export const getTokenFromCookies = (): string | undefined => {
  return Cookies.get("access");
};
