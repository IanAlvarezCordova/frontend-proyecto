// src/pages/Dashboard.tsx
import { Box, Heading, Text } from "@chakra-ui/react";

export const Dashboard: React.FC = () => {
  return (
    <Box ml="250px" mt="60px" p={6}>
      <Heading size="lg" mb={6}>
        Dashboard
      </Heading>
      <Text>Bienvenido al sistema de gestión de inventarios.</Text>
      <Text>Usa el menú lateral para navegar entre las secciones.</Text>
    </Box>
  );
};