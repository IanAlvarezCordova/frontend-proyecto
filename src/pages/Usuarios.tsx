// src/pages/Usuarios.tsx
import { useState } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { UserList } from "../components/usuarios/UserList";
import { UserForm } from "../components/usuarios/UserForm";
import { UserRoles } from "../components/usuarios/UserRoles";
import { Usuario } from "../types/types";

export const Usuarios: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const toast = useToast();

  const handleSuccess = () => {
    setRefresh((prev) => !prev);
    setSelectedUser(null);
    toast({
      title: "Éxito",
      description: "Usuario guardado correctamente.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEdit = (user: Usuario) => {
    setSelectedUser(user);
  };

  const handleRoleAssigned = () => {
    setRefresh((prev) => !prev);
  };

  const handleCancel = () => {
    setSelectedUser(null);
  };

  const handleNewUser = () => {
    setSelectedUser(null); // Esto debería limpiar el formulario gracias al useEffect en UserForm
  };

  return (
    <Box ml="250px" mt="60px" p={6}>
      <Heading size="lg" mb={6}>
        Gestión de Usuarios
      </Heading>
      <Button colorScheme="teal" mb={4} onClick={handleNewUser}>
        Nuevo Usuario
      </Button>
      <UserList refresh={refresh} onEdit={handleEdit} />
      <UserForm user={selectedUser} onSuccess={handleSuccess} onCancel={handleCancel} />
      {selectedUser && <UserRoles userId={selectedUser.id_usuario} onRoleAssigned={handleRoleAssigned} />}
    </Box>
  );
};