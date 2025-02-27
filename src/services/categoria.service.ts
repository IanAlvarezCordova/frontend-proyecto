// src/services/categoria.service.ts
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { Categoria } from "../types/types";

const API_URL = `${API_BASE_URL}/categoria`;

export const getCategorias = async (): Promise<Categoria[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCategoria = async (categoria: Partial<Categoria>): Promise<Categoria> => {
  const response = await axios.post(API_URL, categoria);
  return response.data;
};