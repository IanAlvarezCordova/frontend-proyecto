// src/services/pedido.service.ts
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { Pedido } from "../types/types";
import { getEmpresas } from "./empresa.service";

const API_URL = `${API_BASE_URL}/pedido`;

export const getPedidos = async (): Promise<Pedido[]> => {
  const [pedidosResponse, empresasResponse] = await Promise.all([
    axios.get(API_URL),
    getEmpresas(),
  ]);

  const pedidosRaw: any[] = pedidosResponse.data;
  const empresas = empresasResponse;

  return pedidosRaw.map((pedido) => ({
    ...pedido,
    id_empresa: empresas.find((e) => e.id_empresa === pedido.id_empresa),
  }));
};

export const createPedido = async (pedido: Partial<Pedido>): Promise<Pedido> => {
  const payload = {
    ...pedido,
    id_empresa: pedido.id_empresa?.id_empresa || pedido.id_empresa,
  };
  const response = await axios.post(API_URL, payload);
  return response.data;
};

export const updatePedido = async (id: number, pedido: Partial<Pedido>): Promise<Pedido> => {
  const payload = {
    ...pedido,
    id_empresa: pedido.id_empresa?.id_empresa || pedido.id_empresa,
  };
  const response = await axios.put(`${API_URL}/${id}`, payload);
  return response.data;
};

export const deletePedido = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};