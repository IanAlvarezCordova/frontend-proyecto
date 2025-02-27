// src/pages/Pedidos.tsx
import { useState } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { OrderList } from "../components/pedidos/OrderList";
import { OrderForm } from "../components/pedidos/OrderForm";
import { SupplierList } from "../components/pedidos/SupplierList";
import { Pedido } from "../types/types";

export const Pedidos: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Pedido | null>(null);

  const handleSuccess = () => {
    setRefresh((prev) => !prev);
    setSelectedOrder(null);
  };

  const handleEdit = (order: Pedido) => {
    setSelectedOrder(order);
  };

  const handleCancel = () => {
    setSelectedOrder(null);
  };

  const handleNewOrder = () => {
    setSelectedOrder(null);
  };

  return (
    <Box ml="250px" mt="60px" p={6}>
      <Heading size="lg" mb={6}>
        Gestión de Pedidos y Proveedores
      </Heading>
      <Button colorScheme="teal" mb={4} onClick={handleNewOrder}>
        Nuevo Pedido
      </Button>
      <OrderList refresh={refresh} onEdit={handleEdit} />
      <OrderForm order={selectedOrder} onSuccess={handleSuccess} onCancel={handleCancel} />
      <SupplierList />
    </Box>
  );
};