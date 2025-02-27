// src/components/usuarios/UserList.tsx
import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Table } from "@chakra-ui/react";
import { getUsuarios, deleteUsuario } from "../../services/usuario.service";
import { Usuario } from "../../types/types";

interface UserListProps {
  refresh: boolean;
  onEdit: (user: Usuario) => void;
}

export const UserList: React.FC<UserListProps> = ({ refresh, onEdit }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const toast = useToast();

  const fetchData = async () => {
    try {
      const usuariosData = await getUsuarios();
      setUsuarios(usuariosData);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los usuarios.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        await deleteUsuario(id);
        setUsuarios((prev) => prev.filter((u) => u.id_usuario !== id));
        toast({
          title: "Usuario eliminado",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo eliminar el usuario.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box mt={6} borderWidth={1} borderRadius="md" p={4}>
      <Table.Root size="sm" striped>
        <Table.Caption>Lista de Usuarios</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Nombre</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Teléfono</Table.ColumnHeader>
            <Table.ColumnHeader>Empresa</Table.ColumnHeader>
            <Table.ColumnHeader>Estado</Table.ColumnHeader>
            <Table.ColumnHeader>Roles</Table.ColumnHeader>
            <Table.ColumnHeader>Acciones</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {usuarios.map((user) => (
            <Table.Row key={user.id_usuario}>
              <Table.Cell>{user.id_usuario}</Table.Cell>
              <Table.Cell>{user.nombre_completo}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.telefono || "-"}</Table.Cell>
              <Table.Cell>{user.id_empresa?.nombre || "-"}</Table.Cell>
              <Table.Cell>{user.estado ? "Activo" : "Inactivo"}</Table.Cell>
              <Table.Cell>
                {user.usuarioRoles?.map((ur) => ur.rol?.nombre || ur.id_rol).join(", ") || "Sin roles"}
              </Table.Cell>
              <Table.Cell>
                <Button size="sm" colorScheme="cyan" onClick={() => onEdit(user)}>
                  Editar
                </Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDelete(user.id_usuario)}>
                  Eliminar
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};