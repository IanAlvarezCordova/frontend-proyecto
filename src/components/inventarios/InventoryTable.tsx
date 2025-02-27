// src/components/inventarios/InventoryTable.tsx
import { useEffect, useState } from "react";
import { Box,  TableCaption } from "@chakra-ui/react";
import { Table, Tbody, Thead, Tr, Td, Th } from "@chakra-ui/table"; // Importar desde @chakra-ui/table
import { getInventarios } from "../../services/inventario.service";
import { Inventario } from "../../types/types";

export const InventoryTable: React.FC = () => {
  const [inventarios, setInventarios] = useState<Inventario[]>([]);

  useEffect(() => {
    const fetchInventarios = async () => {
      const data = await getInventarios();
      setInventarios(data);
    };
    fetchInventarios();
  }, []);

  return (
    <Box mt={6}>
      <Table variant="striped" colorScheme="gray">
        <TableCaption>Inventario Actual</TableCaption>
        <Thead>
          <Tr>
            <Th>ID Inventario</Th>
            <Th>ID Empresa</Th>
            <Th>Fecha Actualización</Th>
          </Tr>
        </Thead>
        <Tbody>
          {inventarios.map((inv) => (
            <Tr key={inv.id_inventario}>
              <Td>{inv.id_inventario}</Td>
              <Td>{inv.id_empresa}</Td>
              <Td>{new Date(inv.fecha_actualizacion).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};