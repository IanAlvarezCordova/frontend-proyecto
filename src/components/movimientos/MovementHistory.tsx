// src/components/movimientos/MovementHistory.tsx
import { useEffect, useState } from "react";
import { Box, TableCaption } from "@chakra-ui/react";
import { Table, Tbody, Thead, Tr, Td, Th } from "@chakra-ui/table";
import { getMovimientos } from "../../services/movimiento.service";
import { getProductos } from "../../services/producto.service";
import { MovimientoInventario, Producto } from "../../types/types";

export const MovementHistory: React.FC = () => {
  const [movimientos, setMovimientos] = useState<MovimientoInventario[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const movs = await getMovimientos();
      const prods = await getProductos();
      setMovimientos(movs);
      setProductos(prods);
    };
    fetchData();
  }, []);

  return (
    <Box mt={6}>
      <Table variant="striped" colorScheme="gray">
        <TableCaption>Historial de Movimientos</TableCaption>
        <Thead>
          <Tr>
            <Th>ID Movimiento</Th>
            <Th>Producto</Th>
            <Th>Tipo</Th>
            <Th>Cantidad</Th>
            <Th>Fecha</Th>
          </Tr>
        </Thead>
        <Tbody>
          {movimientos.map((mov) => (
            <Tr key={mov.id_movimiento}>
              <Td>{mov.id_movimiento}</Td>
              <Td>{productos.find(p => p.id_producto === mov.id_producto)?.nombre || mov.id_producto}</Td>
              <Td>{mov.tipo_movimiento}</Td>
              <Td>{mov.cantidad}</Td>
              <Td>{new Date(mov.fecha_movimiento).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};