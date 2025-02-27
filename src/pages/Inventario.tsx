// src/pages/Inventario.tsx
import { Box, Heading } from "@chakra-ui/react";
import { InventoryTable } from "../components/inventarios/InventoryTable";
import { InventoryUpdate } from "../components/inventarios/InventoryUpdate";
import { Alerts } from "../components/inventarios/Alerts";

export const Inventario: React.FC = () => {
  const handleSuccess = () => {
    // Refrescar inventario si necesario
  };

  return (
    <Box ml="250px" mt="60px" p={6}>
      <Heading size="lg" mb={6}>
        Gestión de Inventarios
      </Heading>
      <InventoryTable />
      <InventoryUpdate onSuccess={handleSuccess} />
      <Alerts />
    </Box>
  );
};