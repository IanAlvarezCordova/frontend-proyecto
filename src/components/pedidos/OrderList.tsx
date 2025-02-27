// src/components/pedidos/OrderList.tsx
import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Table } from "@chakra-ui/react";
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
        <Table.Caption>Lista de Pedidos</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Empresa</Table.ColumnHeader>
            <Table.ColumnHeader>Fecha Solicitud</Table.ColumnHeader>
            <Table.ColumnHeader>Fecha Entrega</Table.ColumnHeader>
            <Table.ColumnHeader>Estado</Table.ColumnHeader>
            <Table.ColumnHeader>Acciones</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {pedidos.map((pedido) => (
            <Table.Row key={pedido.id_pedido}>
              <Table.Cell>{pedido.id_pedido}</Table.Cell>
              <Table.Cell>{typeof pedido.id_empresa === "object" ? pedido.id_empresa.nombre : pedido.id_empresa}</Table.Cell>
              <Table.Cell>{new Date(pedido.fecha_solicitud).toLocaleDateString()}</Table.Cell>
              <Table.Cell>{new Date(pedido.fecha_entrega).toLocaleDateString()}</Table.Cell>
              <Table.Cell>{pedido.estado}</Table.Cell>
              <Table.Cell>
                <Button size="sm" colorScheme="cyan" onClick={() => onEdit(pedido)}>
                  Editar
                </Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDelete(pedido.id_pedido)}>
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