// src/services/proveedor.service.ts
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { Proveedor } from "../types/types";

const API_URL = `${API_BASE_URL}/proveedor`;

export const getProveedores = async (): Promise<Proveedor[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};