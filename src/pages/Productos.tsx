// src/pages/Productos.tsx
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";
import { Box, Heading, Button } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/modal";
import { ProductList } from "../components/productos/ProductList";
import { ProductForm } from "../components/productos/ProductForm";
import { Producto } from "../types/types";

export const Productos: React.FC = () => {
  const [refresh, setRefresh] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const toast = useToast();

  const handleSuccess = () => {
    setRefresh((prev) => !prev);
    setIsOpen(false);
    setSelectedProduct(null);
    toast({
      title: "Éxito",
      description: "Producto guardado correctamente.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleEdit = (product: Producto) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  return (
    <Box ml="250px" mt="60px" p={6}>
      <Heading size="lg" mb={6}>
        Gestión de Productos
      </Heading>
      <Button colorScheme="teal" mb={4} onClick={() => { setSelectedProduct(null); setIsOpen(true); }}>
        Agregar Producto
      </Button>
      <ProductList refresh={refresh} onEdit={handleEdit} />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedProduct ? "Editar Producto" : "Agregar Producto"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProductForm product={selectedProduct ?? undefined} onSuccess={handleSuccess} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};