// src/pages/Inventario.tsx
import { useState } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/modal";
import { InventoryList } from "../components/inventarios/InventoryList";
import { InventoryForm } from "../components/inventarios/InventoryForm";

export const Inventario: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const toast = useToast();

  const handleSuccess = () => {
    setRefresh((prev) => !prev);
    setIsOpen(false);
    toast({
      title: "Éxito",
      description: "Inventario creado correctamente.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box ml="250px" mt="60px" p={6}>
      <Heading size="lg" mb={6}>
        Gestión de Inventario
      </Heading>
      <Button colorScheme="teal" mb={4} onClick={() => setIsOpen(true)}>
        Crear Inventario
      </Button>
      <InventoryList />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear Inventario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InventoryForm onSuccess={handleSuccess} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};