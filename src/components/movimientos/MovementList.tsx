// src/components/movimientos/MovementList.tsx
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Table, TableCaption, TableHeader, TableBody, TableRow, TableCell, TableColumnHeader } from "@chakra-ui/react";
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
      <Table.Root striped colorScheme="gray">
        <TableCaption>Movimientos de Inventario</TableCaption>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>ID</TableColumnHeader>
            <TableColumnHeader>Producto</TableColumnHeader>
            <TableColumnHeader>Tipo</TableColumnHeader>
            <TableColumnHeader>Cantidad</TableColumnHeader>
            <TableColumnHeader>Fecha</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movimientos.map((mov) => (
            <TableRow key={mov.id_movimiento}>
              <TableCell>{mov.id_movimiento}</TableCell>
              <TableCell>{productos.find(p => p.id_producto === mov.id_producto.id_producto)?.nombre || mov.id_producto.id_producto || "-"}</TableCell>
              <TableCell>{mov.tipo_movimiento}</TableCell>
              <TableCell>{mov.cantidad}</TableCell>
              <TableCell>{new Date(mov.fecha_movimiento).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table.Root>
    </Box>
  );
};