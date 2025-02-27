// src/services/inventario.service.ts
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { Inventario } from "../types/types";

const API_URL = `${API_BASE_URL}/inventario`;

export const getInventarios = async (): Promise<Inventario[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getInventarioById = async (id: number): Promise<Inventario> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createInventario = async (inventario: Partial<Inventario>): Promise<Inventario> => {
  const response = await axios.post(API_URL, inventario);
  return response.data;
};