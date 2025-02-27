// src/components/inventarios/Alerts.tsx
import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { getProductos } from "../../services/producto.service";
import { Producto } from "../../types/types";

export const Alerts: React.FC = () => {
  const [lowStockProducts, setLowStockProducts] = useState<Producto[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosData = await getProductos();
        const lowStock = productosData.filter((p) => p.stock_minimo && p.stock_minimo > 0 && p.stock_minimo > p.stock_maximo);
        setLowStockProducts(lowStock);
        if (lowStock.length > 0) {
          toast({
            title: "Alerta de Stock",
            description: `Hay ${lowStock.length} productos con stock bajo.`,
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los productos para alertas.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    fetchData();
  }, []);

  return (
    <Box mt={6} borderWidth={1} borderRadius="md" p={4}>
      <Text fontWeight="bold" mb={2}>Alertas de Stock Bajo</Text>
      {lowStockProducts.length > 0 ? (
        lowStockProducts.map((product) => (
          <Text key={product.id_producto} color="red.500">
            {product.nombre} - Stock: {product.stock_maximo} (Mínimo: {product.stock_minimo})
          </Text>
        ))
      ) : (
        <Text>No hay productos con stock bajo.</Text>
      )}
    </Box>
  );
};