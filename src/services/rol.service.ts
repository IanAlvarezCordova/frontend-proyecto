// src/services/rol.service.ts
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { Rol } from "../types/types";

const API_URL = `${API_BASE_URL}/rol`;

export const getRoles = async (): Promise<Rol[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getRolById = async (id: number): Promise<Rol> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createRol = async (rol: Partial<Rol>): Promise<Rol> => {
  const response = await axios.post(API_URL, rol);
  return response.data;
};

export const updateRol = async (id: number, rol: Partial<Rol>): Promise<Rol> => {
  const response = await axios.put(`${API_URL}/${id}`, rol);
  return response.data;
};

export const deleteRol = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};