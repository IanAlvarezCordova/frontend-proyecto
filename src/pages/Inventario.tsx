// src/pages/Inventario.tsx
import { useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { InventoryTable } from "../components/inventarios/InventoryTable";
import { InventoryUpdate } from "../components/inventarios/InventoryUpdate";
import { Alerts } from "../components/inventarios/Alerts";
import { Producto } from "../types/types";

export const Inventario: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [refresh, setRefresh] = useState(false);

  const handleSuccess = () => {
    setRefresh((prev) => !prev);
    setSelectedProduct(null); // Limpiamos la selección tras éxito
  };

  const handleUpdate = (product: Producto) => {
    setSelectedProduct(product);
  };

  return (
    <Box ml="250px" mt="60px" p={6}>
      <Heading size="lg" mb={6}>
        Gestión de Inventarios
      </Heading>
      <InventoryTable onUpdate={handleUpdate} refresh={refresh} />
      {selectedProduct && <InventoryUpdate product={selectedProduct} onSuccess={handleSuccess} />}
      <Alerts />
    </Box>
  );
};