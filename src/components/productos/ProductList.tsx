// src/components/productos/ProductList.tsx
import { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import { Table } from "@chakra-ui/react";
import { getProductos, deleteProducto } from "../../services/producto.service";
import { getCategorias } from "../../services/categoria.service";
import { Producto, Categoria } from "../../types/types";

interface ProductListProps {
  refresh: boolean;
  onEdit: (product: Producto) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ refresh, onEdit }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const toast = useToast();

  const fetchData = async () => {
    try {
      const productosData = await getProductos();
      const categoriasData = await getCategorias();
      setProductos(productosData);
      setCategorias(categoriasData);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos o categorías.",
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
    <Box mt={6}>
      <Table.Root variant="line" colorScheme="gray">
        <Table.Caption>Lista de Productos</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Nombre</Table.ColumnHeader>
            <Table.ColumnHeader>Categoría</Table.ColumnHeader>
            <Table.ColumnHeader>Precio Venta</Table.ColumnHeader>
            <Table.ColumnHeader>Acciones</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {productos.map((product) => (
            <Table.Row key={product.id_producto}>
              <Table.Cell>{product.id_producto}</Table.Cell>
              <Table.Cell>{product.nombre}</Table.Cell>
              <Table.Cell>{categorias.find(c => c.id_categoria === product.id_categoria)?.nombre || product.id_categoria}</Table.Cell>
              <Table.Cell>{product.precio_venta}</Table.Cell>
              <Table.Cell>
                <Button size="sm" colorScheme="blue" onClick={() => onEdit(product)}>
                  Editar
                </Button>
                <Button size="sm" colorScheme="red" ml={2} onClick={() => handleDelete(product.id_producto)}>
                  Eliminar
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};