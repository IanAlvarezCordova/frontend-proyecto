// src/components/movimientos/MovementHistory.tsx
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Table } from "@chakra-ui/react";
import { getMovimientos } from "../../services/movimiento.service";
import { MovimientoInventario } from "../../types/types";

interface MovementHistoryProps {
  filters: { type?: string; date?: string };
  refresh: boolean; // Añadimos refresh como prop
}

export const MovementHistory: React.FC<MovementHistoryProps> = ({ filters, refresh }) => {
  const [movimientos, setMovimientos] = useState<MovimientoInventario[]>([]);
  const toast = useToast();

  const fetchData = async () => {
    try {
      const movimientosData = await getMovimientos();
      let filteredMovimientos = movimientosData;
      if (filters.type) {
        filteredMovimientos = filteredMovimientos.filter((mov) =>
          mov.tipo_movimiento.toLowerCase() === filters.type?.toLowerCase()
        );
      }
      if (filters.date) {
        filteredMovimientos = filteredMovimientos.filter((mov) =>
          new Date(mov.fecha_movimiento).toISOString().split("T")[0] === filters.date
        );
      }
      setMovimientos(filteredMovimientos);
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
  }, [filters, refresh]); // Añadimos 'refresh' como dependencia

  return (
    <Box mt={6} borderWidth={1} borderRadius="md" p={4}>
      <Table.Root size="sm" striped colorScheme="gray">
        <Table.Caption>Historial de Movimientos</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Producto</Table.ColumnHeader>
            <Table.ColumnHeader>Tipo</Table.ColumnHeader>
            <Table.ColumnHeader>Cantidad</Table.ColumnHeader>
            <Table.ColumnHeader>Fecha</Table.ColumnHeader>
            <Table.ColumnHeader>Motivo</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {movimientos.map((mov) => (
            <Table.Row key={mov.id_movimiento}>
              <Table.Cell>{mov.id_movimiento}</Table.Cell>
              <Table.Cell>{typeof mov.id_producto === "object" ? mov.id_producto.nombre : mov.id_producto}</Table.Cell>
              <Table.Cell>{mov.tipo_movimiento}</Table.Cell>
              <Table.Cell>{mov.cantidad}</Table.Cell>
              <Table.Cell>{new Date(mov.fecha_movimiento).toLocaleString()}</Table.Cell>
              <Table.Cell>{mov.motivo}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};