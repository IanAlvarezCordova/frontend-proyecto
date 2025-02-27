// src/components/auth/LoginForm.tsx
import { Button, Input } from "@chakra-ui/react";

import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import  {VStack } from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

interface LoginData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = (data: LoginData) => {
    // Simulación de login: guardar un token ficticio
    const fakeToken = "fake-jwt-token";
    login(fakeToken);
    console.log("Datos de login:", data);
    navigate("/dashboard");
  };

  return (
    <VStack as="form" spacing="4" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email</FormLabel>
        <Input {...register("email", { required: "Email es obligatorio" })} />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.password}>
        <FormLabel>Contraseña</FormLabel>
        <Input type="password" {...register("password", { required: "Contraseña es obligatoria" })} />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Button type="submit" colorScheme="teal" size="md">Iniciar Sesión</Button>
    </VStack>
  );
};