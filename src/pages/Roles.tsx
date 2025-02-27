// src/pages/Roles.tsx

import { Box, Heading, Text } from "@chakra-ui/react";

export const Roles: React.FC = () => {
  return (
    <Box ml="200px" mt="60px" p={4}>
      <Heading>Gestión de Roles</Heading>
      <Text mt={4}>Aquí podrás gestionar los roles de los usuarios.</Text>
    </Box>
  );
};