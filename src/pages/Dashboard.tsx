import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Icon,
  VStack,
  Text

} from "@chakra-ui/react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/stat";
import { useToast } from "@chakra-ui/toast";

import {
  FaUser,
  FaBox,
  FaWarehouse,
  FaExchangeAlt,
  FaShoppingCart,
  FaChartLine,
} from "react-icons/fa";
import { getUsuarios } from "../services/usuario.service";
import { getProductos } from "../services/producto.service";
import { getInventarios } from "../services/inventario.service";
import { getMovimientos } from "../services/movimiento.service";
import { getPedidos } from "../services/pedido.service";

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    usuarios: 0,
    productos: 0,
    inventarios: 0,
    movimientos: 0,
    pedidos: 0,
    topProducto: "N/A", // Ejemplo de dato adicional
    topUsuario: "N/A",  // Ejemplo de dato adicional
  });
  const toast = useToast();

  const fetchData = async () => {
    try {
      const [usuarios, productos, inventarios, movimientos, pedidos] = await Promise.all([
        getUsuarios(),
        getProductos(),
        getInventarios(),
        getMovimientos(),
        getPedidos(),
      ]);

      // Ejemplo de lógica para datos adicionales (esto depende de tus servicios)
      const topProducto = productos.length > 0 ? productos[0].nombre : "N/A"; // Suponiendo que el primer producto es el más vendido
      const topUsuario = usuarios.length > 0 ? usuarios[0].nombre_completo : "N/A";   // Suponiendo que el primer usuario es el más activo

      setStats({
        usuarios: usuarios.length,
        productos: productos.length,
        inventarios: inventarios.length,
        movimientos: movimientos.length,
        pedidos: pedidos.length,
        topProducto,
        topUsuario,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los datos del dashboard.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box ml="250px" mt="60px" p={6}>
      <Heading size="lg" mb={6}>
        Dashboard Principal
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} gap={6}>
        {/* Estadística: Usuarios */}

        <Stat p={4} boxShadow="md" borderRadius="md" bg="blue.50">
          <StatLabel display="flex" alignItems="center">
            <Icon as={FaUser} mr={2} color="blue.500" />
            Usuarios
          </StatLabel>
          <StatNumber>{stats.usuarios}</StatNumber>
          <StatHelpText>Registrados en el sistema</StatHelpText>
          <Text fontSize="sm" mt={2} color="gray.600">
            Más activo: {stats.topUsuario}
          </Text>
        </Stat>

        {/* Estadística: Productos */}
        <Stat p={4} boxShadow="md" borderRadius="md" bg="green.50">
          <StatLabel display="flex" alignItems="center">
            <Icon as={FaBox} mr={2} color="green.500" />
            Productos
          </StatLabel>
          <StatNumber>{stats.productos}</StatNumber>
          <StatHelpText>Disponibles en catálogo</StatHelpText>
          <Text fontSize="sm" mt={2} color="gray.600">
            Top: {stats.topProducto}
          </Text>
        </Stat>

        {/* Estadística: Inventarios */}
        <Stat p={4} boxShadow="md" borderRadius="md" bg="purple.50">
          <StatLabel display="flex" alignItems="center">
            <Icon as={FaWarehouse} mr={2} color="purple.500" />
            Inventarios
          </StatLabel>
          <StatNumber>{stats.inventarios}</StatNumber>
          <StatHelpText>Inventarios gestionados</StatHelpText>
        </Stat>

        {/* Estadística: Movimientos */}
        <Stat p={4} boxShadow="md" borderRadius="md" bg="orange.50">
          <StatLabel display="flex" alignItems="center">
            <Icon as={FaExchangeAlt} mr={2} color="orange.500" />
            Movimientos
          </StatLabel>
          <StatNumber>{stats.movimientos}</StatNumber>
          <StatHelpText>Registrados recientemente</StatHelpText>
        </Stat>

        {/* Estadística: Pedidos */}
        <Stat p={4} boxShadow="md" borderRadius="md" bg="red.50">
          <StatLabel display="flex" alignItems="center">
            <Icon as={FaShoppingCart} mr={2} color="red.500" />
            Pedidos
          </StatLabel>
          <StatNumber>{stats.pedidos}</StatNumber>
          <StatHelpText>En proceso actualmente</StatHelpText>
        </Stat>
      </SimpleGrid>

      {/* Sección adicional: Resumen */}
      <VStack mt={10} align="start" gap={4} p={6} bg="gray.50" borderRadius="md" boxShadow="md">
        <Heading size="md" display="flex" alignItems="center">
          <Icon as={FaChartLine} mr={2} color="teal.500" />
          Resumen Rápido
        </Heading>
        <Text>Usuarios activos: {stats.usuarios}</Text>
        <Text>Producto estrella: {stats.topProducto}</Text>
        <Text>Total movimientos: {stats.movimientos}</Text>
      </VStack>
    </Box>
  );
};