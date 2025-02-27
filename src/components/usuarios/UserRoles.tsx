// src/components/usuarios/UserRoles.tsx
import { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { VStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { getRoles } from "../../services/rol.service";
import { assignRol } from "../../services/usuario.service";
import { Rol } from "../../types/types";

interface UserRolesProps {
  userId: number;
  onRoleAssigned: () => void;
}

export const UserRoles: React.FC<UserRolesProps> = ({ userId, onRoleAssigned }) => {
  const [roles, setRoles] = useState<Rol[]>([]);
  const [selectedRol, setSelectedRol] = useState<number | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await getRoles();
        setRoles(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los roles.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchRoles();
  }, []);

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

  return (
    <Box mt={6} borderWidth={1} borderRadius="md" p={4}>
      <Text fontWeight="bold" mb={2}>Asignar Rol (Usuario ID: {userId})</Text>
      <VStack spacing={4}>
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