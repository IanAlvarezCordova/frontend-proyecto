// src/services/inventario.service.ts
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { Inventario } from "../types/types";
import { getEmpresas } from "./empresa.service";

const API_URL = `${API_BASE_URL}/inventario`;

export const getInventarios = async (): Promise<Inventario[]> => {
  const [inventariosResponse, empresasResponse] = await Promise.all([
    axios.get(API_URL),
    getEmpresas(),
  ]);

  const inventariosRaw: any[] = inventariosResponse.data;
  const empresas = empresasResponse;

  return inventariosRaw.map((inv) => ({
    ...inv,
    id_empresa: empresas.find((e) => e.id_empresa === inv.id_empresa.id_empresa || inv.id_empresa),
  }));
};

export const createInventario = async (inventario: Partial<Inventario>): Promise<Inventario> => {
  const payload = {
    ...inventario,
    id_empresa: inventario.id_empresa?.id_empresa || inventario.id_empresa,
  };
  const response = await axios.post(API_URL, payload);
  return response.data;
};