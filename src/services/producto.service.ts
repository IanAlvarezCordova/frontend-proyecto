// src/services/producto.service.ts
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { Producto } from "../types/types";

const API_URL = `${API_BASE_URL}/producto`;

export const getProductos = async (): Promise<Producto[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createProducto = async (producto: Partial<Producto>): Promise<Producto> => {
  const response = await axios.post(API_URL, producto);
  return response.data;
};

export const updateProducto = async (id: number, producto: Partial<Producto>): Promise<Producto> => {
  const response = await axios.put(`${API_URL}/${id}`, producto);
  return response.data;
};

export const deleteProducto = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};