// src/components/movimientos/MovementFilter.tsx
import { useState } from "react";
import { Box, Input, Button, Text } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { VStack } from "@chakra-ui/layout";

interface MovementFilterProps {
  onFilter: (filters: { type?: string; date?: string }) => void;
}

export const MovementFilter: React.FC<MovementFilterProps> = ({ onFilter }) => {
  const [type, setType] = useState<string | undefined>(undefined);
  const [date, setDate] = useState<string | undefined>(undefined);

  const handleApplyFilter = () => {
    onFilter({ type, date });
  };

  return (
    <Box mt={6} borderWidth={1} borderRadius="md" p={4}>
      <Text fontWeight="bold" mb={2}>Filtrar Movimientos</Text>
      <VStack spacing={4}>
        <Select
          placeholder="Selecciona un tipo"
          value={type || ""}
          onChange={(e) => setType(e.target.value || undefined)}
        >
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
          <option value="ajuste">Ajuste</option>
        </Select>
        <Input
          type="date"
          value={date || ""}
          onChange={(e) => setDate(e.target.value || undefined)}
        />
        <Button colorScheme="teal" onClick={handleApplyFilter} width="full">
          Aplicar Filtro
        </Button>
      </VStack>
    </Box>
  );
};