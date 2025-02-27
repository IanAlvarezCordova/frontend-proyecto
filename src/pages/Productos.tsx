// src/pages/Productos.tsx
import { useState } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { ProductList } from "../components/productos/ProductList";
import { ProductForm } from "../components/productos/ProductForm";
import { Producto } from "../types/types";

export const Productos: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);

  const handleSuccess = () => {
    setRefresh((prev) => !prev);
    setSelectedProduct(null);
  };

  const handleEdit = (product: Producto) => {
    setSelectedProduct(product);
  };

  const handleCancel = () => {
    setSelectedProduct(null);
  };

  const handleNewProduct = () => {
    setSelectedProduct(null);
  };

  return (
    <Box ml="250px" mt="60px" p={6}>
      <Heading size="lg" mb={6}>
        Gestión de Productos
      </Heading>
      <Button colorScheme="teal" mb={4} onClick={handleNewProduct}>
        Nuevo Producto
      </Button>
      <ProductList refresh={refresh} onEdit={handleEdit} />
      <ProductForm product={selectedProduct} onSuccess={handleSuccess} onCancel={handleCancel} />
    </Box>
  );
};