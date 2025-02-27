// src/components/layout/Sidebar.tsx
import { Box, Button, Heading } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/layout";
import { useNavigate, useLocation } from "react-router-dom";

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/" },
    { label: "Usuarios", path: "/usuarios" },
    { label: "Productos", path: "/productos" },
    { label: "Inventario", path: "/inventario" },
    { label: "Movimientos", path: "/movimientos" },
  ];

  return (
    <Box
      bg="gray.800"
      color="white"
      w="250px"
      h="100vh"
      position="fixed"
      left={0}
      top={0}
      p={5}
      boxShadow="md"
      overflowY="auto"
    >
      <Heading size="md" mb={6}>
        Menú
      </Heading>
      <VStack align="stretch" spacing="2">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant={location.pathname === item.path ? "subtle" : "solid"}
            colorScheme={location.pathname === item.path ? "dark" : "inherit"}
            justifyContent="flex-start"
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};