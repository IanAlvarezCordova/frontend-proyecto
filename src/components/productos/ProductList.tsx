// src/components/productos/ProductList.tsx
import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Table, TableCaption, TableHeader, TableBody, TableRow, TableCell, TableColumnHeader } from "@chakra-ui/react";
import { getProductos, deleteProducto } from "../../services/producto.service";
import { Producto } from "../../types/types";

interface ProductListProps {
  refresh: boolean;
  onEdit: (product: Producto) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ refresh, onEdit }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const toast = useToast();

  const fetchData = async () => {
    try {
      const productosData = await getProductos();
      setProductos(productosData);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await deleteProducto(id);
        setProductos((prev) => prev.filter((p) => p.id_producto !== id));
        toast({
          title: "Producto eliminado",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo eliminar el producto.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box mt={6} borderWidth={1} borderRadius="md" p={4}>
      <Table.Root size="sm" striped colorScheme="gray">
        <TableCaption>Lista de Productos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>ID</TableColumnHeader>
            <TableColumnHeader>Nombre</TableColumnHeader>
            <TableColumnHeader>Código</TableColumnHeader>
            <TableColumnHeader>Categoría</TableColumnHeader>
            <TableColumnHeader>Precio Venta</TableColumnHeader>
            <TableColumnHeader>Acciones</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productos.map((product) => (
            <TableRow key={product.id_producto}>
              <TableCell>{product.id_producto}</TableCell>
              <TableCell>{product.nombre}</TableCell>
              <TableCell>{product.codigo_barras}</TableCell>
              <TableCell>{product.id_categoria?.nombre || product.id_categoria?.id_categoria || "-"}</TableCell>
              <TableCell>{product.precio_venta}</TableCell>
              <TableCell>
                <Button size="sm" colorScheme="cyan" onClick={() => onEdit(product)}>
                  Editar
                </Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDelete(product.id_producto)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table.Root>
    </Box>
  );
};