import axios from "axios";
import { getTokenFromCookies } from "./auth";
import { BASE_API_URL } from "./main";

interface UserData {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: Date;
}

interface CreateUserData {
  username?: string;
  email?: string;
  password?: string;
  is_active?: boolean;
  first_name?: string;
  last_name?: string;
  is_staff?: boolean;
}

export const featchAllUsers = async (): Promise<UserData> => {
  const res = await axios(`${BASE_API_URL}/accounts/user-operations/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenFromCookies()}`,
    },
  });
  return res.data;
};

export const createUser = async (data: CreateUserData): Promise<UserData> => {
  const res = await axios.post(
    `${BASE_API_URL}/accounts/user-operations/`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromCookies()}`,
      },
    }
  );
  return res.data;
};

export const updateUser = async ({
  data,
  userId,
}: {
  data: CreateUserData;
  userId: number;
}): Promise<UserData> => {

const filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== "" && value !== undefined)
    );
    console.log(filteredData)

  const res = await axios.patch(
    `${BASE_API_URL}/accounts/user-operations/${userId}/`,
    filteredData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromCookies()}`,
      },
    }
  );
  return res.data;
};
