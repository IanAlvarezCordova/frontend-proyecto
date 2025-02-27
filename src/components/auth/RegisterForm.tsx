// src/components/auth/RegisterForm.tsx
import { Button, Input } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { VStack } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUsuario } from "../../services/usuario.service";
import { Usuario } from "../../types/types";

export const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<Usuario>>();
  const navigate = useNavigate();

  const onSubmit = async (data: Partial<Usuario>) => {
    try {
      await createUsuario(data);
      navigate("/login");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  return (
    <VStack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
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
      <FormControl isInvalid={!!errors.password_hash}>
        <FormLabel>Contraseña</FormLabel>
        <Input type="password" {...register("password_hash", { required: "Contraseña es obligatoria" })} />
        <FormErrorMessage>{errors.password_hash?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" colorScheme="teal" size="md">Registrarse</Button>
    </VStack>
  );
};