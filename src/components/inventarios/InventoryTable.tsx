// src/components/inventarios/InventoryTable.tsx
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Table, TableCaption, TableHeader, TableBody, TableRow, TableCell, TableColumnHeader } from "@chakra-ui/react";
import { getInventarios } from "../../services/inventario.service";
import { Inventario } from "../../types/types";

export const InventoryTable: React.FC = () => {
  const [inventarios, setInventarios] = useState<Inventario[]>([]);
  const toast = useToast();

  const fetchData = async () => {
    try {
      const inventariosData = await getInventarios();
      setInventarios(inventariosData);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los inventarios.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box mt={6} borderWidth={1} borderRadius="md" p={4}>
      <Table.Root size="sm" striped colorScheme="gray">
        <TableCaption>Inventarios</TableCaption>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>ID</TableColumnHeader>
            <TableColumnHeader>Empresa</TableColumnHeader>
            <TableColumnHeader>Fecha Actualización</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventarios.map((inv) => (
            <TableRow key={inv.id_inventario}>
              <TableCell>{inv.id_inventario}</TableCell>
              <TableCell>{inv.id_empresa?.nombre || inv.id_empresa?.id_empresa || "-"}</TableCell>
              <TableCell>{new Date(inv.fecha_actualizacion).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table.Root>
    </Box>
  );
};