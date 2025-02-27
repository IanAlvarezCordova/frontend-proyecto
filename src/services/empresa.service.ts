// src/services/empresa.service.ts
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { Empresa } from "../types/types";

const API_URL = `${API_BASE_URL}/empresa`;

export const getEmpresas = async (): Promise<Empresa[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createEmpresa = async (empresa: Partial<Empresa>): Promise<Empresa> => {
  const response = await axios.post(API_URL, empresa);
  return response.data;
};