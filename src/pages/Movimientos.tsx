// src/pages/Movimientos.tsx
import { useState } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody } from "@chakra-ui/modal";
import { MovementList } from "../components/movimientos/MovementList";
import { MovementForm } from "../components/movimientos/MovementForm";

export const Movimientos: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const toast = useToast();

  const handleSuccess = () => {
    setRefresh((prev) => !prev);
    setIsOpen(false);
    toast({
      title: "Éxito",
      description: "Movimiento creado correctamente.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box ml="250px" mt="60px" p={6}>
      <Heading size="lg" mb={6}>
        Movimientos de Inventario
      </Heading>
      <Button colorScheme="teal" mb={4} onClick={() => setIsOpen(true)}>
        Crear Movimiento
      </Button>
      <MovementList />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear Movimiento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MovementForm onSuccess={handleSuccess} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};