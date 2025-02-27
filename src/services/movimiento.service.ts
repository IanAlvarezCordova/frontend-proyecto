// src/services/movimiento.service.ts
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { MovimientoInventario } from "../types/types";
import { getProductos } from "./producto.service";

const API_URL = `${API_BASE_URL}/movimiento-inventario`;

export const getMovimientos = async (): Promise<MovimientoInventario[]> => {
  const [movimientosResponse, productosResponse] = await Promise.all([
    axios.get(API_URL),
    getProductos(),
  ]);

  const movimientosRaw: any[] = movimientosResponse.data;
  const productos = productosResponse;

  return movimientosRaw.map((mov) => ({
    ...mov,
    id_producto: productos.find((p) => p.id_producto === mov.id_producto.id_producto),
  }));
};

export const createMovimiento = async (movimiento: Partial<MovimientoInventario>): Promise<MovimientoInventario> => {
  const payload = {
    ...movimiento,
    id_producto: movimiento.id_producto?.id_producto || movimiento.id_producto,
    id_usuario: movimiento.id_usuario?.id_usuario || movimiento.id_usuario, // Extraemos id_usuario como número
  };
  const response = await axios.post(API_URL, payload);
  return response.data;
};