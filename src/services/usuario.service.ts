// src/services/usuario.service.ts
import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { Usuario, UsuarioRol } from "../types/types";

const API_URL = `${API_BASE_URL}/usuarios`;
const USUARIO_ROL_URL = `${API_BASE_URL}/usuario-rol`;
const ROL_URL = `${API_BASE_URL}/rol`;

export const getUsuarios = async (): Promise<Usuario[]> => {
  const [usuariosResponse, usuarioRolResponse, rolesResponse] = await Promise.all([
    axios.get(API_URL),
    axios.get(USUARIO_ROL_URL),
    axios.get(ROL_URL),
  ]);

  const usuariosRaw: any[] = usuariosResponse.data;
  const usuarioRoles: any[] = usuarioRolResponse.data;
  const roles: any[] = rolesResponse.data;

  return usuariosRaw.map((user) => {
    const userRoles = usuarioRoles
      .filter((ur) => ur.id_usuario.id_usuario === user.id_usuario)
      .map((ur) => ({
        id_usuario_rol: ur.id_usuario_rol,
        id_usuario: ur.id_usuario.id_usuario,
        id_rol: ur.id_rol.id_rol,
        fecha_asignacion: ur.fecha_asignacion,
      }));

    return {
      ...user,
      usuarioRoles: userRoles.map((ur) => ({
        ...ur,
        rol: roles.find((r) => r.id_rol === ur.id_rol),
      })),
    };
  });
};

export const getUsuarioById = async (id: number): Promise<Usuario> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createUsuario = async (usuario: Partial<Usuario>): Promise<Usuario> => {
  const payload = {
    ...usuario,
    id_empresa: usuario.id_empresa?.id_empresa || usuario.id_empresa, // Extraer el ID si es objeto
  };
  const response = await axios.post(API_URL, payload);
  return response.data;
};

export const updateUsuario = async (id: number, usuario: Partial<Usuario>): Promise<Usuario> => {
  const payload = {
    ...usuario,
    id_empresa: usuario.id_empresa?.id_empresa || usuario.id_empresa, // Extraer el ID si es objeto
  };
  const response = await axios.put(`${API_URL}/${id}`, payload);
  return response.data;
};

export const deleteUsuario = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const assignRol = async (userId: number, rolId: number): Promise<UsuarioRol> => {
  const response = await axios.post(USUARIO_ROL_URL, {
    id_usuario: userId,
    id_rol: rolId,
  });
  return response.data;
};