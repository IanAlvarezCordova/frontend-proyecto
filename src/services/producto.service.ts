// src/services/producto.service.ts
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { Producto } from "../types/types";
import { getCategorias } from "./categoria.service";
import { getEmpresas } from "./empresa.service";
import { getMovimientos } from "./movimiento.service";

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

  return productosRaw.map((product) => {
    const categoria = categorias.find((c) => c.id_categoria === (typeof product.id_categoria === 'object' ? product.id_categoria.id_categoria : product.id_categoria));
    const empresa = empresas.find((e) => e.id_empresa === (typeof product.id_empresa === 'object' ? product.id_empresa.id_empresa : product.id_empresa));
    return {
      ...product,
      id_categoria: categoria || product.id_categoria,
      id_empresa: empresa || product.id_empresa,
    };
  });
};

export const createProducto = async (producto: Partial<Producto>): Promise<Producto> => {
  const payload = {
    ...producto,
    id_categoria: typeof producto.id_categoria === 'object' ? producto.id_categoria?.id_categoria : Number(producto.id_categoria),
    id_empresa: typeof producto.id_empresa === 'object' ? producto.id_empresa?.id_empresa : Number(producto.id_empresa),
    id_proveedor: typeof producto.id_proveedor === 'object' ? producto.id_proveedor?.id_proveedor : Number(producto.id_proveedor) || null,
  };
  console.log("Payload enviado en POST:", payload);
  const response = await axios.post(API_URL, payload);
  return response.data;
};

export const updateProducto = async (id: number, producto: Partial<Producto>): Promise<Producto> => {
  const payload = {
    ...producto,
    id_categoria: typeof producto.id_categoria === 'object' ? producto.id_categoria?.id_categoria : Number(producto.id_categoria),
    id_empresa: typeof producto.id_empresa === 'object' ? producto.id_empresa?.id_empresa : Number(producto.id_empresa),
    id_proveedor: typeof producto.id_proveedor === 'object' ? producto.id_proveedor?.id_proveedor : Number(producto.id_proveedor) || null,
    precio_venta: Number(producto.precio_venta), // Convertimos a número
    precio_compra: Number(producto.precio_compra) || 0, // Valor por defecto
    stock_minimo: Number(producto.stock_minimo) || 0, // Valor por defecto
    stock_maximo: Number(producto.stock_maximo) || 0, // Valor por defecto
  };
  // Excluimos id_producto del payload
  delete payload.id_producto;
  console.log("Payload enviado en PUT:", payload);
  const response = await axios.put(`${API_URL}/${id}`, payload);
  return response.data;
};

export const deleteProducto = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

// src/services/producto.service.ts (fragmento)
export const getProductosWithStock = async (): Promise<Producto[]> => {
  const [productos, movimientos] = await Promise.all([getProductos(), getMovimientos()]);
  return productos.map((product) => {
    const productMovements = movimientos.filter((mov) => mov.id_producto.id_producto === product.id_producto);
    const stock = productMovements.reduce((total, mov) => {
      const newTotal = mov.tipo_movimiento === "entrada" ? total + mov.cantidad : total - mov.cantidad;
      return Math.max(0, newTotal); // Evitamos stock negativo
    }, 0);
    return { ...product, stock_actual: stock };
  });
};