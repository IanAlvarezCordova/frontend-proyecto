// src/components/layout/Navbar.tsx
import { Box, Flex, Heading, Button, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box bg="teal.500" px={6} py={4} color="white" position="fixed" top={0} width="100%" zIndex={10}>
      <Flex align="center" justify="space-between" maxW="container.xl" mx="auto">
        <Heading size="md">Sistema de Inventarios</Heading>
        <HStack gap={4}>
          <Button variant="outline" colorScheme="whiteAlpha" onClick={() => navigate("/")}>
            Dashboard
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};