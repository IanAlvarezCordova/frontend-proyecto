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
  const payload = {
    ...movimiento,
    id_producto: { id_producto: Number(movimiento.id_producto) },
    id_usuario: { id_usuario: movimiento.id_usuario?.id_usuario || 1 },
    fecha_movimiento: movimiento.fecha_movimiento || new Date().toISOString(), // Aseguramos que siempre esté
    costo_unitario: movimiento.costo_unitario || 0,
    ubicacion: movimiento.ubicacion || "Sin especificar",
  };
  console.log("Payload enviado a POST /movimiento-inventario:", JSON.stringify(payload, null, 2));
  const response = await axios.post(API_URL, payload);
  return response.data;
};