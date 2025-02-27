// src/components/pedidos/OrderList.tsx
import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Table, TableCaption, TableHeader, TableBody, TableRow, TableCell, TableColumnHeader } from "@chakra-ui/react";
import { getPedidos, deletePedido } from "../../services/pedido.service";
import { Pedido } from "../../types/types";

interface OrderListProps {
  refresh: boolean;
  onEdit: (order: Pedido) => void;
}

export const OrderList: React.FC<OrderListProps> = ({ refresh, onEdit }) => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const toast = useToast();

  const fetchData = async () => {
    try {
      const pedidosData = await getPedidos();
      setPedidos(pedidosData);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los pedidos.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar este pedido?")) {
      try {
        await deletePedido(id);
        setPedidos((prev) => prev.filter((p) => p.id_pedido !== id));
        toast({
          title: "Pedido eliminado",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo eliminar el pedido.",
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
        <TableCaption>Lista de Pedidos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>ID</TableColumnHeader>
            <TableColumnHeader>Empresa</TableColumnHeader>
            <TableColumnHeader>Fecha Solicitud</TableColumnHeader>
            <TableColumnHeader>Estado</TableColumnHeader>
            <TableColumnHeader>Acciones</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pedidos.map((order) => (
            <TableRow key={order.id_pedido}>
              <TableCell>{order.id_pedido}</TableCell>
              <TableCell>{order.id_empresa?.nombre || order.id_empresa?.id_empresa || "-"}</TableCell>
              <TableCell>{new Date(order.fecha_solicitud).toLocaleString()}</TableCell>
              <TableCell>{order.estado}</TableCell>
              <TableCell>
                <Button size="sm" colorScheme="cyan" onClick={() => onEdit(order)}>
                  Editar
                </Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDelete(order.id_pedido)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table.Root>
    </Box>
  );
};