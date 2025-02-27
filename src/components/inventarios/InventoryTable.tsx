// src/components/inventarios/InventoryTable.tsx
import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Table } from "@chakra-ui/react";
import { getProductosWithStock } from "../../services/producto.service";
import { Producto } from "../../types/types";

interface InventoryTableProps {
  onUpdate: (product: Producto) => void;
  refresh: boolean; // Para actualización automática
}

export const InventoryTable: React.FC<InventoryTableProps> = ({ onUpdate, refresh }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const toast = useToast();

  const fetchData = async () => {
    try {
      const productosData = await getProductosWithStock();
      setProductos(productosData);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  return (
    <Box mt={6} borderWidth={1} borderRadius="md" p={4}>
      <Table.Root size="sm" striped colorScheme="gray">
        <Table.Caption>Inventario de Productos</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Nombre</Table.ColumnHeader>
            <Table.ColumnHeader>Empresa</Table.ColumnHeader>
            <Table.ColumnHeader>Stock Actual</Table.ColumnHeader>
            <Table.ColumnHeader>Stock Mínimo</Table.ColumnHeader>
            <Table.ColumnHeader>Stock Máximo</Table.ColumnHeader>
            <Table.ColumnHeader>Acciones</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {productos.map((prod) => (
            <Table.Row key={prod.id_producto}>
              <Table.Cell>{prod.id_producto}</Table.Cell>
              <Table.Cell>{prod.nombre}</Table.Cell>
              <Table.Cell>{typeof prod.id_empresa === "object" ? prod.id_empresa.nombre : prod.id_empresa}</Table.Cell>
              <Table.Cell color={prod.stock_actual! < 0 ? "red.700" : "inherit"}>{prod.stock_actual ?? 0}</Table.Cell>
              <Table.Cell>{prod.stock_minimo}</Table.Cell>
              <Table.Cell>{prod.stock_maximo}</Table.Cell>
              <Table.Cell>
                <Button size="sm" colorScheme="teal" onClick={() => onUpdate(prod)}>
                  Actualizar
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};