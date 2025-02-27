// src/pages/Movimientos.tsx
import { useState } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { MovementHistory } from "../components/movimientos/MovementHistory";
import { MovementForm } from "../components/movimientos/MovementForm";
import { MovementFilter } from "../components/movimientos/MovementFilter";

export const Movimientos: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  const [filters, setFilters] = useState<{ type?: string; date?: string }>({});

  const handleSuccess = () => {
    setRefresh((prev) => !prev); // Esto dispara la actualización en MovementHistory
  };

  const handleFilter = (newFilters: { type?: string; date?: string }) => {
    setFilters(newFilters);
  };

  return (
    <Box ml="250px" mt="60px" p={6}>
      <Heading size="lg" mb={6}>
        Movimientos de Inventario
      </Heading>
      <Button colorScheme="teal" mb={4}>Nuevo Movimiento</Button>
      <MovementForm onSuccess={handleSuccess} />
      <MovementFilter onFilter={handleFilter} />
      <MovementHistory filters={filters} refresh={refresh} />
    </Box>
  );
};