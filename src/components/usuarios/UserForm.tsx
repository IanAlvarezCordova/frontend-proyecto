// src/components/usuarios/UserForm.tsx
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { FormErrorMessage, FormLabel, FormControl } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";
import { VStack } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { createUsuario, updateUsuario } from "../../services/usuario.service";
import { Usuario } from "../../types/types";
import { getEmpresas } from "../../services/empresa.service";
import { useState, useEffect } from "react";
import { Empresa } from "../../types/types";

interface UserFormProps {
  user?: Usuario | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ user, onSuccess, onCancel }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Partial<Usuario>>({
    defaultValues: user || {}, // Valores iniciales basados en user
  });
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  useEffect(() => {
    const fetchEmpresas = async () => {
      const data = await getEmpresas();
      setEmpresas(data);
    };
    fetchEmpresas();
  }, []);

  // Actualizar los valores del formulario cuando cambie el usuario seleccionado
useEffect(() => {
    reset(user || {
        nombre_completo: "",
        email: "",
        telefono: "",
        password_hash: "",
        id_empresa: undefined,
        estado: undefined,
    } as Partial<Usuario>); // Limpiar explícitamente todos los campos si user es null
}, [user, reset]);

const onSubmit = async (data: Partial<Usuario>) => {
    try {
        if (user) {
            await updateUsuario(user.id_usuario, data);
        } else {
            await createUsuario(data);
        }
        reset({
            nombre_completo: "",
            email: "",
            telefono: "",
            password_hash: "",
            id_empresa: undefined,
            estado: undefined,
        } as Partial<Usuario>); // Limpiar formulario tras éxito
        onSuccess();
    } catch (error) {
        console.error("Error al guardar usuario:", error);
    }
};

  return (
    <Box mt={6} borderWidth={1} borderRadius="md" p={4}>
      <Text fontWeight="bold" mb={4}>{user ? "Editar Usuario" : "Crear Nuevo Usuario"}</Text>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.nombre_completo}>
            <FormLabel>Nombre Completo</FormLabel>
            <Input {...register("nombre_completo", { required: "Nombre es obligatorio" })} />
            <FormErrorMessage>{errors.nombre_completo?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input {...register("email", { required: "Email es obligatorio" })} />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.telefono}>
            <FormLabel>Teléfono</FormLabel>
            <Input {...register("telefono", { required: "Teléfono es obligatorio" })} />
            <FormErrorMessage>{errors.telefono?.message}</FormErrorMessage>
          </FormControl>
          {!user && (
            <FormControl isInvalid={!!errors.password_hash}>
              <FormLabel>Contraseña</FormLabel>
              <Input type="password" {...register("password_hash", { required: "Contraseña es obligatoria" })} />
              <FormErrorMessage>{errors.password_hash?.message}</FormErrorMessage>
            </FormControl>
          )}
          <FormControl isInvalid={!!errors.id_empresa}>
            <FormLabel>Empresa</FormLabel>
            <Select {...register("id_empresa", { required: "Empresa es obligatoria" })}>
              <option value="">Selecciona una empresa</option>
              {empresas.map((empresa) => (
                <option key={empresa.id_empresa} value={empresa.id_empresa}>
                  {empresa.nombre}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.id_empresa?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.estado}>
            <FormLabel>Estado</FormLabel>
            <Select {...register("estado", { required: "Estado es obligatorio" })}>
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </Select>
            <FormErrorMessage>{errors.estado?.message}</FormErrorMessage>
          </FormControl>
          <VStack spacing="4" width="full">
            <Button type="submit" colorScheme="teal" flex={1}>
              {user ? "Actualizar" : "Crear"}
            </Button>
            <Button colorScheme="gray" flex={1} onClick={onCancel}>
              Cancelar
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
};