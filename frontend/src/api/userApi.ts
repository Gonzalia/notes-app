import axios from "axios";
import { USERURL } from "../utils/constants";
import { User } from "../models/user";

export const getLoggedInUser = async (): Promise<User> => {
  try {
    const response = await axios.get(USERURL);
    return response.data;
  } catch (error) {
    console.error("Error fetching notes: ", error);
    throw error;
  }
};

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export const signUp = async (credentials: SignUpCredentials): Promise<User> => {
  try {
    const response = await axios.post(`${USERURL}/signup`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error on register user: ", error);
    throw error;
  }
};

export interface LoginCredentials {
  username: string;
  password: string;
}
export const login = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const response = await axios.post(`${USERURL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error on login user: ", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${USERURL}/logout`);
    return response.data;
  } catch (error) {
    console.error("Error on logout user: ", error);
    throw error;
  }
};
