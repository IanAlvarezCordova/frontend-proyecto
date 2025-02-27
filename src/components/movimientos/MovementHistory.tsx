// src/components/movimientos/MovementHistory.tsx
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Table, TableCaption, TableHeader, TableBody, TableRow, TableCell, TableColumnHeader } from "@chakra-ui/react";
import { getMovimientos } from "../../services/movimiento.service";
import { MovimientoInventario } from "../../types/types";

interface MovementHistoryProps {
  refresh: boolean;
}

export const MovementHistory: React.FC<MovementHistoryProps> = ({ refresh }) => {
  const [movimientos, setMovimientos] = useState<MovimientoInventario[]>([]);
  const toast = useToast();

  const fetchData = async () => {
    try {
      const movimientosData = await getMovimientos();
      setMovimientos(movimientosData);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los movimientos.",
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
        <TableCaption>Historial de Movimientos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>ID</TableColumnHeader>
            <TableColumnHeader>Producto</TableColumnHeader>
            <TableColumnHeader>Tipo</TableColumnHeader>
            <TableColumnHeader>Cantidad</TableColumnHeader>
            <TableColumnHeader>Fecha</TableColumnHeader>
            <TableColumnHeader>Motivo</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movimientos.map((mov) => (
            <TableRow key={mov.id_movimiento}>
              <TableCell>{mov.id_movimiento}</TableCell>
              <TableCell>{mov.id_producto?.nombre || mov.id_producto?.id_producto || "-"}</TableCell>
              <TableCell>{mov.tipo_movimiento}</TableCell>
              <TableCell>{mov.cantidad}</TableCell>
              <TableCell>{new Date(mov.fecha_movimiento).toLocaleString()}</TableCell>
              <TableCell>{mov.motivo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table.Root>
    </Box>
  );
};