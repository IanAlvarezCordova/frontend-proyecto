// src/services/rol.service.ts
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { Rol } from "../types/types";

const API_URL = `${API_BASE_URL}/rol`;

export const getRoles = async (): Promise<Rol[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};