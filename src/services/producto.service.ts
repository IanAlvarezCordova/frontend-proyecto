// src/services/producto.service.ts
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { Producto } from "../types/types";
import { getCategorias } from "./categoria.service";
import { getEmpresas } from "./empresa.service";

const API_URL = `${API_BASE_URL}/producto`;

export const getProductos = async (): Promise<Producto[]> => {
  const [productosResponse, categoriasResponse, empresasResponse] = await Promise.all([
    axios.get(API_URL),
    getCategorias(),
    getEmpresas(),
  ]);

  const productosRaw: any[] = productosResponse.data;
  const categorias = categoriasResponse;
  const empresas = empresasResponse;

  return productosRaw.map((product) => ({
    ...product,
    id_categoria: categorias.find((c) => c.id_categoria === product.id_categoria.id_categoria || product.id_categoria),
    id_empresa: empresas.find((e) => e.id_empresa === product.id_empresa.id_empresa || product.id_empresa),
  }));
};

export const createProducto = async (producto: Partial<Producto>): Promise<Producto> => {
  const payload = {
    ...producto,
    id_categoria: producto.id_categoria?.id_categoria || producto.id_categoria,
    id_empresa: producto.id_empresa?.id_empresa || producto.id_empresa,
  };
  const response = await axios.post(API_URL, payload);
  return response.data;
};

export const updateProducto = async (id: number, producto: Partial<Producto>): Promise<Producto> => {
  const payload = {
    ...producto,
    id_categoria: producto.id_categoria?.id_categoria || producto.id_categoria,
    id_empresa: producto.id_empresa?.id_empresa || producto.id_empresa,
  };
  const response = await axios.put(`${API_URL}/${id}`, payload);
  return response.data;
};

export const deleteProducto = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};