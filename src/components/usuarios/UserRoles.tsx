// src/components/usuarios/UserRoles.tsx
import { useEffect, useState } from "react";
import { Box, Button, Text, HStack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { getRoles } from "../../services/rol.service";
import { getUsuarioById, assignRol, deleteUsuarioRol } from "../../services/usuario.service";
import { Rol, Usuario, UsuarioRol } from "../../types/types";

interface UserRolesProps {
  userId: number;
  onRoleAssigned: () => void;
}

export const UserRoles: React.FC<UserRolesProps> = ({ userId, onRoleAssigned }) => {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [selectedRol, setSelectedRol] = useState<number | null>(null);
  const [assignedRoles, setAssignedRoles] = useState<(UsuarioRol & { rol?: Rol })[]>([]);
  const toast = useToast();

// src/components/usuarios/UserRoles.tsx (Alternativa)
const fetchData = async () => {
    try {
      const [rolesData, userData] = await Promise.all([
        getRoles(),
        getUsuarioById(userId),
      ]);
      console.log("Roles obtenidos:", rolesData);
      console.log("Usuario obtenido:", userData);
      const enrichedRoles = (userData.usuarioRoles || []).map((ur) => ({
        ...ur,
        rol: rolesData.find((r) => r.id_rol === ur.id_rol),
      }));
      setRoles(rolesData);
      setAssignedRoles(enrichedRoles);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los roles o datos del usuario.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleAssign = async () => {
    if (!selectedRol) {
      toast({
        title: "Error",
        description: "Por favor selecciona un rol.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await assignRol(userId, selectedRol);
      toast({
        title: "Rol asignado",
        description: "Rol asignado correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setSelectedRol(null);
      fetchData();
      onRoleAssigned();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo asignar el rol.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (usuarioRolId: number) => {
    if (confirm("¿Estás seguro de eliminar esta asignación de rol para el usuario?")) {
      try {
        await deleteUsuarioRol(usuarioRolId);
        toast({
          title: "Asignación eliminada",
          description: "La asignación de rol fue eliminada correctamente.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        fetchData();
        onRoleAssigned();
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo eliminar la asignación de rol.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box mt={6} borderWidth={1} borderRadius="md" p={4}>
      <Text fontWeight="bold" mb={2}>Roles del Usuario (ID: {userId})</Text>
      <VStack spacing={4} align="stretch">
        {/* Roles asignados */}
        {assignedRoles.length > 0 ? (
          assignedRoles.map((role) => (
            <HStack key={role.id_usuario_rol} justify="space-between">
              <Text>{role.rol?.nombre || `Rol ID: ${role.id_rol}`}</Text> {/* Fallback si nombre no está */}
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => handleDelete(role.id_usuario_rol)}
              >
                Eliminar Asignación
              </Button>
            </HStack>
          ))
        ) : (
          <Text>Sin roles asignados</Text>
        )}

        {/* Asignar nuevo rol */}
        <Text fontWeight="bold" mt={4}>Asignar Nuevo Rol</Text>
        <Select
          placeholder="Selecciona un rol"
          value={selectedRol || ""}
          onChange={(e) => setSelectedRol(Number(e.target.value))}
        >
          {roles.map((rol) => (
            <option key={rol.id_rol} value={rol.id_rol}>
              {rol.nombre}
            </option>
          ))}
        </Select>
        <Button colorScheme="teal" onClick={handleAssign} width="full">
          Asignar
        </Button>
      </VStack>
    </Box>
  );
};