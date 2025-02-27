// src/services/proveedor.service.ts
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { Proveedor } from "../types/types";

const API_URL = `${API_BASE_URL}/proveedor`;

export const getProveedores = async (): Promise<Proveedor[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createProveedor = async (proveedor: Partial<Proveedor>): Promise<Proveedor> => {
  const response = await axios.post(API_URL, proveedor);
  return response.data;
};

export const updateProveedor = async (id: number, proveedor: Partial<Proveedor>): Promise<Proveedor> => {
  const response = await axios.put(`${API_URL}/${id}`, proveedor);
  return response.data;
};

export const deleteProveedor = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};