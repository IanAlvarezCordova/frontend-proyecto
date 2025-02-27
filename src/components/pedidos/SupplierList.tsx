// src/components/pedidos/SupplierList.tsx
import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Table } from "@chakra-ui/react";
import { getProveedores, deleteProveedor } from "../../services/proveedor.service";
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

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar este proveedor?")) {
      try {
        await deleteProveedor(id);
        setProveedores((prev) => prev.filter((p) => p.id_proveedor !== id));
        toast({
          title: "Proveedor eliminado",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo eliminar el proveedor.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

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
            <Table.ColumnHeader>Acciones</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {proveedores.map((prov) => (
            <Table.Row key={prov.id_proveedor}>
              <Table.Cell>{prov.id_proveedor}</Table.Cell>
              <Table.Cell>{prov.nombre}</Table.Cell>
              <Table.Cell>{prov.contacto || "-"}</Table.Cell>
              <Table.Cell>{prov.telefono || "-"}</Table.Cell>
              <Table.Cell>{prov.email}</Table.Cell>
              <Table.Cell>
                <Button size="sm" colorScheme="red" onClick={() => handleDelete(prov.id_proveedor)}>
                  Eliminar
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};