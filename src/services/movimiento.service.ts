// src/services/movimiento.service.ts
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { MovimientoInventario } from "../types/types";

const API_URL = `${API_BASE_URL}/movimiento-inventario`;

export const getMovimientos = async (): Promise<MovimientoInventario[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createMovimiento = async (movimiento: Partial<MovimientoInventario>): Promise<MovimientoInventario> => {
  const response = await axios.post(API_URL, movimiento);
  return response.data;
};