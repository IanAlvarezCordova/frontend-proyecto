// src/components/movimientos/MovementList.tsx
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Table } from "@chakra-ui/react";
import { getMovimientos } from "../../services/movimiento.service";
import { getProductos } from "../../services/producto.service";
import { MovimientoInventario, Producto } from "../../types/types";

export const MovementList: React.FC = () => {
  const [movimientos, setMovimientos] = useState<MovimientoInventario[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const toast = useToast();

  const fetchData = async () => {
    try {
      const movimientosData = await getMovimientos();
      const productosData = await getProductos();
      setMovimientos(movimientosData);
      setProductos(productosData);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los movimientos o productos.",
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
        <Table.Caption>Movimientos de Inventario</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Producto</Table.ColumnHeader>
            <Table.ColumnHeader>Tipo</Table.ColumnHeader>
            <Table.ColumnHeader>Cantidad</Table.ColumnHeader>
            <Table.ColumnHeader>Fecha</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {movimientos.map((mov) => (
            <Table.Row key={mov.id_movimiento}>
              <Table.Cell>{mov.id_movimiento}</Table.Cell>
              <Table.Cell>{productos.find(p => p.id_producto === mov.id_producto)?.nombre || mov.id_producto}</Table.Cell>
              <Table.Cell>{mov.tipo_movimiento}</Table.Cell>
              <Table.Cell>{mov.cantidad}</Table.Cell>
              <Table.Cell>{new Date(mov.fecha_movimiento).toLocaleString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};