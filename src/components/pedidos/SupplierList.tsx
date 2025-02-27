// src/components/pedidos/SupplierList.tsx
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Table } from "@chakra-ui/react";
import { getProveedores } from "../../services/proveedor.service";
import { Proveedor } from "../../types/types";

export const SupplierList: React.FC = () => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const toast = useToast();

  const fetchData = async () => {
    try {
      const proveedoresData = await getProveedores();
      setProveedores(proveedoresData);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los proveedores.",
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
        <Table.Caption>Lista de Proveedores</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Nombre</Table.ColumnHeader>
            <Table.ColumnHeader>Contacto</Table.ColumnHeader>
            <Table.ColumnHeader>Teléfono</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {proveedores.map((supplier) => (
            <Table.Row key={supplier.id_proveedor}>
              <Table.Cell>{supplier.id_proveedor}</Table.Cell>
              <Table.Cell>{supplier.nombre}</Table.Cell>
              <Table.Cell>{supplier.contacto}</Table.Cell>
              <Table.Cell>{supplier.telefono}</Table.Cell>
              <Table.Cell>{supplier.email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};