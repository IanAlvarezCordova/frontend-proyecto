// src/components/inventarios/InventoryList.tsx
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Table } from "@chakra-ui/react";
import { getInventarios } from "../../services/inventario.service";
import { getEmpresas } from "../../services/empresa.service";
import { Inventario, Empresa } from "../../types/types";

export const InventoryList: React.FC = () => {
  const [inventarios, setInventarios] = useState<Inventario[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const toast = useToast();

  const fetchData = async () => {
    try {
      const inventariosData = await getInventarios();
      const empresasData = await getEmpresas();
      setInventarios(inventariosData);
      setEmpresas(empresasData);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los inventarios o empresas.",
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
    <Box mt={6}>
      <Table.Root variant="line" colorScheme="gray">
        <Table.Caption>Inventarios</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Empresa</Table.ColumnHeader>
            <Table.ColumnHeader>Fecha Actualización</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {inventarios.map((inv) => (
            <Table.Row key={inv.id_inventario}>
              <Table.Cell>{inv.id_inventario}</Table.Cell>
              <Table.Cell>{empresas.find(e => e.id_empresa === inv.id_empresa)?.nombre || inv.id_empresa}</Table.Cell>
              <Table.Cell>{new Date(inv.fecha_actualizacion).toLocaleString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};