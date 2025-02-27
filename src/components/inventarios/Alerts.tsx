// src/components/inventarios/Alerts.tsx
import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { getProductosWithStock } from "../../services/producto.service";
import { Producto } from "../../types/types";

export const Alerts: React.FC = () => {
  const [lowStockProducts, setLowStockProducts] = useState<Producto[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosData = await getProductosWithStock();
        const lowStock = productosData.filter((p) => p.stock_actual! < p.stock_minimo);
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
  }, [toast]);

  return (
    <Box mt={6} borderWidth={1} borderRadius="md" p={4}>
      <Text fontWeight="bold" mb={2}>Alertas de Stock Bajo</Text>
      {lowStockProducts.length > 0 ? (
        lowStockProducts.map((product) => (
          <Text key={product.id_producto} color={product.stock_actual! < 0 ? "red.700" : "red.500"}>
            {product.nombre} - Stock Actual: {product.stock_actual} (Mínimo: {product.stock_minimo})
            {product.stock_actual! < 0 && " (Stock Negativo)"}
          </Text>
        ))
      ) : (
        <Text>No hay productos con stock bajo.</Text>
      )}
    </Box>
  );
};