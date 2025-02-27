// src/pages/Movimientos.tsx
import { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { MovementHistory } from "../components/movimientos/MovementHistory";
import { MovementForm } from "../components/movimientos/MovementForm";
import { MovementFilter } from "../components/movimientos/MovementFilter";

export const Movimientos: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  const [filters, setFilters] = useState<{ type?: string; date?: string }>({});

  const handleSuccess = () => {
    setRefresh((prev) => !prev);
  };

  const handleFilter = (newFilters: { type?: string; date?: string }) => {
    setFilters(newFilters);
    setRefresh((prev) => !prev); // Simplificación para el MVP
  };

  return (
    <Box ml="250px" mt="60px" p={6}>
      <Heading size="lg" mb={6}>
        Movimientos de Inventario
      </Heading>
      <MovementHistory refresh={refresh} />
      <MovementForm onSuccess={handleSuccess} />
      <MovementFilter onFilter={handleFilter} />
    </Box>
  );
};