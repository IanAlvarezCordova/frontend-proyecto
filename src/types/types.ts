// src/types/types.ts

// Entidad Rol
export interface Rol {
    id_rol: number;
    nombre: string;
    descripcion: string;
  }
  
  // Entidad Usuario
  export interface Usuario {
    id_usuario: number;
    nombre_completo: string;
    email: string;
    telefono: string;
    estado: boolean;
    fecha_creacion: string;
    ultima_conexion: string;
    password_hash: string;
    id_empresa: Empresa; // Revertido a objeto Empresa
    usuarioRoles?: (UsuarioRol & { rol?: Rol })[];
  }
  
  // Entidad Usuario_Rol (Intermedia)
  export interface UsuarioRol {
    id_usuario_rol: number;
    id_usuario: number;
    id_rol: number;
    fecha_asignacion: string;
  }
  
  // Entidad Empresa
  export interface Empresa {
    id_empresa: number;
    nombre: string;
    ruc: string;
    direccion: string;
    telefono: string;
    email_contacto: string;
    sector: string;
    fechaCreacion: string;
    Estado: boolean;
  }
  
  // Entidad Categoría
  export interface Categoria {
    id_categoria: number;
    nombre: string;
    descripcion: string;
    fecha_creacion: string;
  }
  
  // Entidad Producto
  export interface Producto {
    id_producto: number;
    codigo_barras: string;
    nombre: string;
    descripcion: string;
    id_categoria: number;
    precio_compra: number;
    precio_venta: number;
    stock_minimo: number;
    stock_maximo: number;
    id_empresa: number;
    id_proveedor: number;
    fecha_creacion: string;
    ultima_actualizacion: string;
  }
  
  // Entidad Inventario
  export interface Inventario {
    id_inventario: number;
    id_empresa: number;
    fecha_actualizacion: string;
  }
  
  // Entidad Movimiento_Inventario
  export interface MovimientoInventario {
    id_movimiento: number;
    id_producto: number;
    tipo_movimiento: "entrada" | "salida" | "ajuste";
    cantidad: number;
    fecha_movimiento: string;
    motivo: string;
    id_usuario: number;
    costo_unitario: number;
    ubicacion: string;
  }