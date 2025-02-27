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
    ruc: number;
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
    productos?: Producto[];
  }
  
// src/types/types.ts (fragmento)
export interface Producto {
  id_producto: number;
  codigo_barras: string;
  nombre: string;
  descripcion: string;
  id_categoria: number | Categoria;
  precio_compra: number;
  precio_venta: number;
  stock_minimo: number;
  stock_maximo: number;
  id_empresa: number | Empresa;
  id_proveedor: number | Proveedor | null;
  fecha_creacion: string;
  ultima_actualizacion: string;
  alertas?: AlertaStock[];
  detalles?: DetallePedido[];
  movimientos?: MovimientoInventario[];
  stock_actual?: number; // Añadido para reflejar el cálculo
}
  
  // Entidad Inventario
  export interface Inventario {
    id_inventario: number;
    id_empresa: Empresa;
    fecha_actualizacion: string;
  }
  
// src/types/types.ts (fragmento)
export interface MovimientoInventario {
  id_movimiento: number;
  id_producto: Producto; // Espera un objeto Producto completo
  tipo_movimiento: "entrada" | "salida" | "ajuste";
  cantidad: number;
  fecha_movimiento: string;
  motivo: string;
  id_usuario: Partial<Usuario>;
  costo_unitario: number;
  ubicacion: string;
}
  
  // Entidad Pedido
  export interface Pedido {
    id_pedido: number;
    id_empresa: Empresa;
    fecha_solicitud: string;
    fecha_entrega: string;
    estado: "pendiente" | "entregado" | "cancelado";
    detalles?: DetallePedido[];
  }
  
  // Entidad Detalle_Pedido
  export interface DetallePedido {
    id_detalle_pedido: number;
    id_pedido: Pedido;
    id_producto: Producto;
    cantidad: number;
    precio_unitario: string; // Devuelto como string en el backend
  }
  
  // Entidad Proveedor
  export interface Proveedor {
    id_proveedor: number;
    nombre: string;
    contacto: string;
    telefono: string;
    email: string;
    direccion: string;
    fecha_creacion: string;
  }
  
  // Entidad Alerta_Stock
  export interface AlertaStock {
    id_alerta: number;
    id_producto: Producto;
    nivel_minimo: number;
    estado: boolean;
    fecha_creacion: string;
  }