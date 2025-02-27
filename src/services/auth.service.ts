// src/services/auth.service.ts
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

export const login = async (email: string, password: string): Promise<string> => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
  return response.data.token;
};
